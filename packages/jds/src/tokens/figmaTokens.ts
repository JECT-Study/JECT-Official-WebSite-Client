import fs from "fs";
import { join } from "path";

type TokenValue = string | number;

interface DtcgColorValue {
  colorSpace: string;
  components: number[];
  alpha: number;
  hex: string;
}

interface DtcgToken {
  $type: string;
  $value: TokenValue | DtcgColorValue;
}

interface DtcgGroup {
  [key: string]: unknown;
}

interface DtcgModeFile extends DtcgGroup {
  $extensions?: { "com.figma.modeName"?: string };
}

type ModeTokens = Record<string, Record<string, TokenValue>>;

/**
 * Figma 컬렉션 폴더명과 `tokenSchema` 키의 대응
 *
 * @remarks
 * 폴더명은 Figma 컬렉션 이름을 따릅니다. 컬렉션이 추가되면 이 표와 `tokenSchema`를 함께 갱신해야 합니다.
 */
const COLLECTION_DIRECTORIES = {
  "color-primitive": "colorPrimitive",
  scheme: "scheme",
  "color-semantic": "colorSemantic",
  typography: "typography",
  environment: "environment",
} as const;

const ALIAS_PATTERN = /^\{(.+)\}$/;
const HEX_RGB_PATTERN = /^#[0-9a-fA-F]{6}$/;
const TOKEN_NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function isDtcgToken(node: unknown): node is DtcgToken {
  return typeof node === "object" && node !== null && "$type" in node && "$value" in node;
}

function collectTokens(group: DtcgGroup, path: string[], tokens: Map<string, DtcgToken>): void {
  for (const [key, node] of Object.entries(group)) {
    if (key.startsWith("$")) continue;

    const nextPath = [...path, key];

    if (isDtcgToken(node)) {
      tokens.set(nextPath.join("."), node);
    } else if (typeof node === "object" && node !== null) {
      collectTokens(node as DtcgGroup, nextPath, tokens);
    }
  }
}

/**
 * 같은 모드 파일 안의 `{group.token}` 참조를 따라가 최종 값을 찾습니다.
 *
 * @throws 참조 대상이 파일 안에 없거나 참조가 순환하는 경우
 */
function resolveAlias(
  token: DtcgToken,
  tokens: Map<string, DtcgToken>,
  visited: Set<string> = new Set(),
): DtcgToken["$value"] {
  const alias = typeof token.$value === "string" ? ALIAS_PATTERN.exec(token.$value) : null;

  if (!alias) return token.$value;

  const targetPath = alias[1];
  const target = tokens.get(targetPath);

  if (!target) {
    throw new Error(`참조 대상 토큰을 찾을 수 없습니다: {${targetPath}}`);
  }

  if (visited.has(targetPath)) {
    throw new Error(`토큰 참조가 순환합니다: {${targetPath}}`);
  }

  visited.add(targetPath);
  return resolveAlias(target, tokens, visited);
}

/**
 * DTCG 색상 값을 소문자 hex로 바꿉니다. 불투명하지 않으면 alpha를 8자리 hex 뒤 2자리로 붙입니다.
 *
 * @remarks
 * alpha는 내림으로 변환합니다. 이전 Figma 플러그인 export와 같은 규칙이라 기존 CSS 값을 유지합니다.
 * @throws sRGB가 아니거나 `hex`가 6자리가 아닌 경우
 */
function toHexColor({ colorSpace, hex, alpha }: DtcgColorValue): string {
  if (colorSpace !== "srgb") {
    throw new Error(`sRGB가 아닌 색 공간은 지원하지 않습니다: ${colorSpace} (${hex})`);
  }

  if (!HEX_RGB_PATTERN.test(hex)) {
    throw new Error(`6자리 hex가 아닙니다: ${hex}`);
  }

  const rgb = hex.toLowerCase();

  if (alpha >= 1) return rgb;

  const alphaHex = Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, "0");

  return `${rgb}${alphaHex}`;
}

function toTokenValue(value: DtcgToken["$value"]): TokenValue {
  if (typeof value === "object") return toHexColor(value);
  return value;
}

/**
 * 경로 세그먼트를 kebab-case로 이어 토큰 이름을 만듭니다.
 *
 * @remarks
 * Figma 변수명의 camelCase(`lineHeight`, `staticInverse`)를 kebab-case로 바꿉니다.
 * CSS 변수명과 `tokenSchema`의 단위 판별(`line-height`, `letter-spacing`)이 이 형식을 전제로 합니다.
 */
function toTokenName(path: string): string {
  return path
    .split(".")
    .map(segment => segment.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase())
    .join("-");
}

/**
 * 모드 파일 하나를 `{ 토큰 이름: 값 }`으로 읽습니다.
 *
 * @throws 모드 이름이 없거나, kebab-case 변환 뒤 토큰 이름이 CSS 변수명 형식이 아니거나 겹치는 경우
 */
function readModeFile(filePath: string): { modeName: string; tokens: Record<string, TokenValue> } {
  const modeFile = JSON.parse(fs.readFileSync(filePath, "utf8")) as DtcgModeFile;
  const modeName = modeFile.$extensions?.["com.figma.modeName"];

  if (!modeName) {
    throw new Error(`모드 이름(com.figma.modeName)이 없습니다: ${filePath}`);
  }

  const dtcgTokens = new Map<string, DtcgToken>();
  collectTokens(modeFile, [], dtcgTokens);

  const tokens: Record<string, TokenValue> = {};
  const sourcePaths = new Map<string, string>();

  for (const [path, token] of dtcgTokens) {
    const tokenName = toTokenName(path);

    if (!TOKEN_NAME_PATTERN.test(tokenName)) {
      throw new Error(
        `CSS 변수명으로 사용할 수 없는 토큰 이름입니다: ${tokenName} (${path}) — ${filePath}`,
      );
    }

    const duplicatedPath = sourcePaths.get(tokenName);

    if (duplicatedPath) {
      throw new Error(
        `토큰 이름이 겹칩니다: ${tokenName} (${duplicatedPath}, ${path}) — ${filePath}`,
      );
    }

    sourcePaths.set(tokenName, path);
    tokens[tokenName] = toTokenValue(resolveAlias(token, dtcgTokens));
  }

  return { modeName, tokens };
}

function listModeFiles(collectionDirectory: string): string[] {
  return fs
    .readdirSync(collectionDirectory)
    .filter(fileName => fileName.endsWith(".tokens.json"))
    .sort();
}

function stripExtensions(group: DtcgGroup): DtcgGroup {
  const result: DtcgGroup = {};

  for (const [key, node] of Object.entries(group)) {
    if (key === "$extensions") continue;

    if (isDtcgToken(node)) {
      result[key] = Object.fromEntries(
        Object.entries(node).filter(([field]) => field !== "$extensions"),
      );
    } else if (typeof node === "object" && node !== null) {
      result[key] = stripExtensions(node as DtcgGroup);
    } else {
      result[key] = node;
    }
  }

  return result;
}

/**
 * @description 입력 파일을 저장소 표준 형식으로 정리하고, 바뀐 파일 경로를 돌려줍니다.
 *
 * @remarks
 * 표준 형식은 Figma 기본 export에서 토큰별 `$extensions`를 뺀 형식으로, 토큰 동기화 플러그인의 출력과 같습니다.
 * 기본 export를 그대로 넣어도 이 형식으로 바뀌므로, 입력 경로와 관계없이 저장소에는 같은 파일이 남습니다.
 * @param inputDirectory 컬렉션 폴더들이 있는 디렉터리
 * @throws 모드 이름(`com.figma.modeName`)이 없는 경우
 */
export function normalizeFigmaTokenFiles(inputDirectory: string): string[] {
  const changedPaths: string[] = [];

  for (const collectionName of Object.values(COLLECTION_DIRECTORIES)) {
    const collectionDirectory = join(inputDirectory, collectionName);

    for (const fileName of listModeFiles(collectionDirectory)) {
      const filePath = join(collectionDirectory, fileName);
      const previousContent = fs.readFileSync(filePath, "utf8");
      const modeFile = JSON.parse(previousContent) as DtcgModeFile;
      const modeName = modeFile.$extensions?.["com.figma.modeName"];

      if (!modeName) {
        throw new Error(`모드 이름(com.figma.modeName)이 없습니다: ${filePath}`);
      }

      const content = `${JSON.stringify(
        { ...stripExtensions(modeFile), $extensions: { "com.figma.modeName": modeName } },
        null,
        2,
      )}\n`;

      if (content !== previousContent) {
        fs.writeFileSync(filePath, content);
        changedPaths.push(filePath);
      }
    }
  }

  return changedPaths;
}

function readCollection(collectionDirectory: string): ModeTokens {
  const modeFiles = listModeFiles(collectionDirectory);

  if (modeFiles.length === 0) {
    throw new Error(`모드 파일(*.tokens.json)이 없습니다: ${collectionDirectory}`);
  }

  const collection: ModeTokens = {};

  for (const fileName of modeFiles) {
    const { modeName, tokens } = readModeFile(join(collectionDirectory, fileName));

    if (collection[modeName]) {
      throw new Error(`같은 모드가 두 번 export되었습니다: ${modeName} (${collectionDirectory})`);
    }

    collection[modeName] = tokens;
  }

  return collection;
}

/**
 * Figma 기본 variable export(DTCG) 결과를 `tokenSchema`가 받는 형태로 읽어 옵니다.
 *
 * @remarks
 * 컬렉션마다 폴더 하나, 모드마다 `*.tokens.json` 하나를 둡니다. 모드는 파일명이 아니라 파일 안의 `com.figma.modeName`으로 구분합니다.
 * 다른 컬렉션을 참조하는 alias는 Figma가 export할 때 값으로 풀어 주므로, 같은 파일 안의 참조만 해석합니다.
 * @param inputDirectory 컬렉션 폴더들이 있는 디렉터리
 * @returns 컬렉션 키별 `{ 모드 이름: { 토큰 이름: 값 } }`
 */
export function readFigmaTokens(
  inputDirectory: string,
): Record<keyof typeof COLLECTION_DIRECTORIES, ModeTokens> {
  return {
    "color-primitive": readCollection(
      join(inputDirectory, COLLECTION_DIRECTORIES["color-primitive"]),
    ),
    scheme: readCollection(join(inputDirectory, COLLECTION_DIRECTORIES.scheme)),
    "color-semantic": readCollection(
      join(inputDirectory, COLLECTION_DIRECTORIES["color-semantic"]),
    ),
    typography: readCollection(join(inputDirectory, COLLECTION_DIRECTORIES.typography)),
    environment: readCollection(join(inputDirectory, COLLECTION_DIRECTORIES.environment)),
  };
}
