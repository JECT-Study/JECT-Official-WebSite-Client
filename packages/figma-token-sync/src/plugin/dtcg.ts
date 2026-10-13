import type { CollectionSnapshot, VariableSnapshot, VariablesSnapshot } from "./snapshot";

/** 저장소에 쓸 파일 하나. `path`는 내보내기 디렉터리 기준 상대 경로입니다. */
export interface TokenFile {
  path: string;
  content: string;
}

interface DtcgColor {
  colorSpace: "srgb";
  components: [number, number, number];
  alpha: number;
  hex: string;
}

type DtcgValue = string | number | boolean | DtcgColor;

interface DtcgToken {
  $type: string;
  $value: DtcgValue;
  $description?: string;
}

interface DtcgGroup {
  [key: string]: DtcgGroup | DtcgToken;
}

const DTCG_TYPES: Partial<Record<VariableResolvedDataType, string>> = {
  COLOR: "color",
  FLOAT: "number",
  STRING: "string",
  BOOLEAN: "boolean",
};

function isAlias(value: VariableValue): value is VariableAlias {
  return typeof value === "object" && "type" in value && value.type === "VARIABLE_ALIAS";
}

function isColor(value: VariableValue): value is RGB | RGBA {
  return typeof value === "object" && "r" in value && "g" in value && "b" in value;
}

function isComposedColor(value: VariableValue): value is VariableComposedColor {
  return typeof value === "object" && "color" in value && "opacity" in value;
}

function toHexChannel(channel: number): string {
  return Math.round(channel * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
}

function toDtcgColor(color: RGB | RGBA): DtcgColor {
  const { r, g, b } = color;

  return {
    colorSpace: "srgb",
    components: [r, g, b],
    alpha: "a" in color ? color.a : 1,
    hex: `#${toHexChannel(r)}${toHexChannel(g)}${toHexChannel(b)}`,
  };
}

function toAliasReference(variable: VariableSnapshot): string {
  return `{${variable.name.split("/").join(".")}}`;
}

/** 변환 중에 id로 컬렉션과 변수를 찾기 위한 색인 */
interface SnapshotIndex {
  collectionsById: Map<string, CollectionSnapshot>;
  variablesById: Map<string, VariableSnapshot>;
}

/** 값을 읽는 기준이 되는 컬렉션과 모드 */
interface ModeContext {
  collectionId: string;
  modeId: string;
}

function getVariable(index: SnapshotIndex, variableId: string): VariableSnapshot {
  const variable = index.variablesById.get(variableId);

  if (!variable) {
    throw new Error(`로컬 변수가 아닌 참조는 지원하지 않습니다: ${variableId}`);
  }

  return variable;
}

function getCollection(index: SnapshotIndex, collectionId: string): CollectionSnapshot {
  const collection = index.collectionsById.get(collectionId);

  if (!collection) {
    throw new Error(`컬렉션을 찾을 수 없습니다: ${collectionId}`);
  }

  return collection;
}

function toDtcgType(variable: VariableSnapshot): string {
  const dtcgType = DTCG_TYPES[variable.resolvedType];

  if (!dtcgType) {
    throw new Error(`지원하지 않는 변수 타입입니다: ${variable.resolvedType} (${variable.name})`);
  }

  return dtcgType;
}

/**
 * 참조를 끝까지 따라가 참조가 아닌 값을 찾습니다.
 *
 * @remarks
 * 참조한 변수가 현재 컬렉션에 있으면 현재 모드 값을, 다른 컬렉션에 있으면 그 컬렉션의 기본 모드 값을 읽습니다.
 * @throws 참조가 순환하는 경우
 */
function resolveAlias(
  index: SnapshotIndex,
  alias: VariableAlias,
  context: ModeContext,
  visitedIds: Set<string> = new Set(),
): { variable: VariableSnapshot; value: VariableValue; context: ModeContext } {
  const target = getVariable(index, alias.id);

  if (visitedIds.has(target.id)) {
    throw new Error(`변수 참조가 순환합니다: ${target.name}`);
  }

  visitedIds.add(target.id);

  const targetContext: ModeContext = {
    collectionId: target.variableCollectionId,
    modeId:
      target.variableCollectionId === context.collectionId
        ? context.modeId
        : getCollection(index, target.variableCollectionId).defaultModeId,
  };
  const value = target.valuesByMode[targetContext.modeId];

  if (isAlias(value)) {
    return resolveAlias(index, value, targetContext, visitedIds);
  }

  return { variable: target, value, context: targetContext };
}

/**
 * 색상 참조와 불투명도를 합친 색상을 DTCG 색상으로 바꿉니다.
 *
 * @remarks
 * alpha는 `Math.fround(불투명도 / 100)`입니다. Figma 기본 export와 같은 값을 내기 위한 규칙입니다.
 * @throws 불투명도가 변수 참조이거나, 참조한 색상이 불투명하지 않은 경우
 */
function toComposedColor(
  index: SnapshotIndex,
  variable: VariableSnapshot,
  value: VariableComposedColor,
  context: ModeContext,
): DtcgColor {
  if (typeof value.opacity !== "number") {
    throw new Error(`불투명도를 변수로 참조하는 합성 색상은 지원하지 않습니다: ${variable.name}`);
  }

  const color = isAlias(value.color)
    ? resolveAlias(index, value.color, context).value
    : value.color;

  if (!isColor(color) || ("a" in color && color.a !== 1)) {
    throw new Error(
      `불투명한 색상을 참조하지 않는 합성 색상은 지원하지 않습니다: ${variable.name}`,
    );
  }

  return { ...toDtcgColor(color), alpha: Math.fround(value.opacity / 100) };
}

/**
 * 변수 값을 DTCG `$value`로 바꿉니다.
 *
 * @remarks
 * 같은 컬렉션 안의 참조는 `{group.token}`으로 남기고, 다른 컬렉션 참조는 값으로 풉니다.
 * Figma 기본 variable export와 같은 규칙이라, 빌더는 어느 쪽 출력이든 같은 방식으로 읽습니다.
 * @throws 로컬이 아닌 변수를 참조하거나, 참조가 순환하거나, 지원하지 않는 값인 경우
 */
function toDtcgValue(
  index: SnapshotIndex,
  variable: VariableSnapshot,
  value: VariableValue,
  context: ModeContext,
): DtcgValue {
  if (isAlias(value)) {
    const target = getVariable(index, value.id);

    if (target.variableCollectionId === context.collectionId) {
      return toAliasReference(target);
    }

    const resolved = resolveAlias(index, value, context);

    return toDtcgValue(index, resolved.variable, resolved.value, resolved.context);
  }

  if (isComposedColor(value)) return toComposedColor(index, variable, value, context);

  if (isColor(value)) return toDtcgColor(value);

  if (typeof value === "object") {
    throw new Error(`지원하지 않는 변수 값입니다: ${variable.name}`);
  }

  return value;
}

/**
 * 경로를 따라 그룹을 만들며 토큰을 넣습니다.
 *
 * @throws 토큰과 그룹의 경로가 겹치는 경우 (`a/b`와 `a/b/c`가 함께 있을 때)
 */
function setToken(root: DtcgGroup, path: string[], token: DtcgToken): void {
  const tokenKey = path[path.length - 1];
  let group = root;

  for (const segment of path.slice(0, -1)) {
    const child = group[segment];

    if (child && "$value" in child) {
      throw new Error(`토큰과 그룹의 경로가 겹칩니다: ${path.join("/")}`);
    }

    group = (child as DtcgGroup | undefined) ?? (group[segment] = {});
  }

  if (group[tokenKey]) {
    throw new Error(`토큰과 그룹의 경로가 겹칩니다: ${path.join("/")}`);
  }

  group[tokenKey] = token;
}

/**
 * 그룹마다 토큰을 하위 그룹보다 앞에 둡니다.
 *
 * @remarks
 * Figma 기본 export와 같은 순서입니다. 플러그인과 기본 export를 오가도 입력 파일과 생성물의 순서가 바뀌지 않습니다.
 */
function placeTokensBeforeGroups(group: DtcgGroup): DtcgGroup {
  const entries = Object.entries(group);
  const tokens = entries.filter(([, node]) => "$value" in node);
  const groups = entries
    .filter(([, node]) => !("$value" in node))
    .map(([key, node]) => [key, placeTokensBeforeGroups(node as DtcgGroup)] as const);

  return Object.fromEntries([...tokens, ...groups]);
}

function toModeFile(
  index: SnapshotIndex,
  collection: CollectionSnapshot,
  mode: CollectionSnapshot["modes"][number],
): TokenFile {
  const root: DtcgGroup = {};

  for (const variableId of collection.variableIds) {
    const variable = getVariable(index, variableId);
    const token: DtcgToken = {
      $type: toDtcgType(variable),
      $value: toDtcgValue(index, variable, variable.valuesByMode[mode.modeId], {
        collectionId: collection.id,
        modeId: mode.modeId,
      }),
    };

    if (variable.description) {
      token.$description = variable.description;
    }

    setToken(root, variable.name.split("/"), token);
  }

  const content = {
    ...placeTokensBeforeGroups(root),
    $extensions: { "com.figma.modeName": mode.name },
  };

  return {
    path: `${collection.name}/${mode.name}.tokens.json`,
    content: `${JSON.stringify(content, null, 2)}\n`,
  };
}

/**
 * 선택한 컬렉션을 모드마다 DTCG 파일 하나로 바꿉니다.
 *
 * @remarks
 * 파일 경로는 `{컬렉션 이름}/{모드 이름}.tokens.json`이고, 모드 이름은 파일 안의 `com.figma.modeName`에도 남깁니다.
 * @param collectionNames 내보낼 컬렉션 이름. 이 순서대로 파일을 만듭니다.
 * @throws 컬렉션이 없거나, 지원하지 않는 타입이나 참조가 있는 경우
 */
export function toTokenFiles(snapshot: VariablesSnapshot, collectionNames: string[]): TokenFile[] {
  const index: SnapshotIndex = {
    collectionsById: new Map(snapshot.collections.map(collection => [collection.id, collection])),
    variablesById: new Map(snapshot.variables.map(variable => [variable.id, variable])),
  };

  return collectionNames.flatMap(collectionName => {
    const collection = snapshot.collections.find(({ name }) => name === collectionName);

    if (!collection) {
      throw new Error(`컬렉션을 찾을 수 없습니다: ${collectionName}`);
    }

    return collection.modes.map(mode => toModeFile(index, collection, mode));
  });
}
