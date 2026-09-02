/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/naming-convention */
import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { tokenSchema, textStyleSchema, type NestedObject } from "./schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type ContractShape = { [key: string]: null | ContractShape };
type DeviceResponsiveCssVariables = Record<string, Record<string, string | number>>;
type TextStyleProperty = {
  value: string | number;
  token: {
    name: string;
    value: string | number;
  } | null;
};

type CanonicalTextStyle = {
  name: string;
  id?: string;
  properties: {
    fontSize: TextStyleProperty;
    lineHeight: TextStyleProperty;
    fontFamily: TextStyleProperty;
    fontWeight: TextStyleProperty;
    letterSpacing: TextStyleProperty;
    paragraphSpacing: TextStyleProperty;
    paragraphIndent: TextStyleProperty;
  };
};

type ExtractedTextStyle = {
  token: string;
  fontFamily: string;
  fontWeight: string;
  fontSize: string | number;
  lineHeight?: string | number;
  letterSpacing?:
    | string
    | number
    | {
        unit: string;
        value: number;
      };
};

type ParsedTextStyleToken = {
  name: string;
  category: string;
  size: string;
  weight?: string;
};

function toContractShape(nestedObject: NestedObject): ContractShape {
  const result: ContractShape = {};

  for (const [key, value] of Object.entries(nestedObject)) {
    result[key] = typeof value === "string" ? null : toContractShape(value);
  }

  return result;
}

function extractDeviceFlatMap(
  responsiveCssVariables: DeviceResponsiveCssVariables,
  device: "desktop" | "tablet" | "mobile",
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(responsiveCssVariables)
      .filter(([, deviceValues]) => device in deviceValues)
      .map(([cssVariableName, deviceValues]) => [cssVariableName, String(deviceValues[device])]),
  );
}

function hasTypographyToken(tokens: Record<string, string | number>, tokenName: string): boolean {
  const normalizedTokenName = tokenName
    .replaceAll("/", "-")
    .replaceAll("lineHeight", "line-height")
    .replaceAll("letterSpacing", "letter-spacing");

  return normalizedTokenName in tokens;
}

function getTextStyleProperty(
  tokens: Record<string, string | number>,
  tokenName: string,
  fallbackValue: string | number,
): TextStyleProperty {
  if (!hasTypographyToken(tokens, tokenName)) {
    return {
      value: fallbackValue,
      token: null,
    };
  }

  return {
    value: fallbackValue,
    token: {
      name: tokenName,
      value: fallbackValue,
    },
  };
}

function getTextStyleWeightTokenPath(
  category: string,
  semanticWeight: string | undefined,
  fontWeight: string,
): string {
  if (category === "title") {
    return fontWeight === "Bold" || fontWeight === "700"
      ? "primitive/font/weight/title/bold"
      : "primitive/font/weight/title/normal";
  }

  if (category === "label") {
    return `primitive/font/weight/label/${semanticWeight}`;
  }

  if (category === "body") {
    return `primitive/font/weight/body/${semanticWeight}`;
  }

  return "primitive/font/weight/syntax/normal";
}

function parseTextStyleToken(token: string): ParsedTextStyleToken {
  const [, textStyleSegment, category, size, weight] = token.split("-");

  if (textStyleSegment !== "textstyle" || !category || !size) {
    throw new Error(`Invalid text style token: ${token}`);
  }

  return {
    name: token.replace("textstyle", "textStyle"),
    category,
    size,
    weight,
  };
}

function toCssLength(value: string | number, unit = "px"): string {
  return typeof value === "number" ? `${value}${unit}` : value;
}

function percentToEm(value: number): string {
  return `${Number((value / 100).toFixed(5))}em`;
}

function toLetterSpacingValue(letterSpacing: ExtractedTextStyle["letterSpacing"]): string {
  if (letterSpacing === undefined) {
    return "0px";
  }

  if (typeof letterSpacing === "string") {
    const percent = Number.parseFloat(letterSpacing);

    return letterSpacing.trim().endsWith("%") && !Number.isNaN(percent)
      ? percentToEm(percent)
      : letterSpacing;
  }

  if (typeof letterSpacing === "number") {
    return `${letterSpacing}px`;
  }

  return letterSpacing.unit === "PERCENT"
    ? percentToEm(letterSpacing.value)
    : `${letterSpacing.value}px`;
}

function normalizeExtractedTextStyles(
  textStyleData: unknown,
  typographyTokens: Record<string, string | number>,
): unknown {
  if (
    !textStyleData ||
    typeof textStyleData !== "object" ||
    !("textStyles" in textStyleData) ||
    !Array.isArray(textStyleData.textStyles)
  ) {
    return textStyleData;
  }

  return textStyleData.textStyles.map((textStyle: ExtractedTextStyle): CanonicalTextStyle => {
    const { name, category, size, weight } = parseTextStyleToken(textStyle.token);
    const fontSizeTokenName = `primitive/font/size/${category}/${size}`;
    const lineHeightTokenName = `primitive/font/lineHeight/${category}/${size}`;
    const typefaceTokenName = `primitive/typeface/${category}`;
    const letterSpacingTokenName = `primitive/font/letterSpacing/${category}/${size}`;
    const lineHeightValue =
      textStyle.lineHeight === undefined ? "normal" : toCssLength(textStyle.lineHeight);
    const letterSpacingValue = toLetterSpacingValue(textStyle.letterSpacing);

    return {
      name,
      properties: {
        fontSize: getTextStyleProperty(
          typographyTokens,
          fontSizeTokenName,
          toCssLength(textStyle.fontSize),
        ),
        lineHeight: getTextStyleProperty(typographyTokens, lineHeightTokenName, lineHeightValue),
        fontFamily: getTextStyleProperty(typographyTokens, typefaceTokenName, textStyle.fontFamily),
        fontWeight: getTextStyleProperty(
          typographyTokens,
          getTextStyleWeightTokenPath(category, weight, textStyle.fontWeight),
          textStyle.fontWeight,
        ),
        letterSpacing: getTextStyleProperty(
          typographyTokens,
          letterSpacingTokenName,
          letterSpacingValue,
        ),
        paragraphSpacing: {
          value: 0,
          token: null,
        },
        paragraphIndent: {
          value: 0,
          token: null,
        },
      },
    };
  });
}

/**
 * NestedObject를 재귀 순회해 `[vars.path.to.leaf]: "actualValue"` 형식의 할당 라인을 lines 배열에 수집
 *
 * @param nestedObject   - 순회할 중첩 객체 (leaf = "var(--xxx)" 형식 문자열)
 * @param varAccessPath  - 현재까지 누적된 vars 접근 경로 (예: "vars.colorPrimitive.primitive.flow")
 * @param cssVariableMap - CSS 변수명 → 실제 값 매핑 (예: "--primitive-flow-20" → "#faf8ff")
 * @param lines          - 생성된 라인을 추가할 배열
 */
function collectVarsAssignment(
  nestedObject: NestedObject,
  varAccessPath: string,
  cssVariableMap: Record<string, string>,
  lines: string[],
): void {
  for (const [key, value] of Object.entries(nestedObject)) {
    const accessor = /^\d/.test(key) ? `["${key}"]` : `.${key}`;
    const nextPath = `${varAccessPath}${accessor}`;

    if (typeof value === "string") {
      const cssVariableName = value.slice(4, -1);
      const actualValue = cssVariableMap[cssVariableName];

      if (actualValue !== undefined) {
        lines.push(`    [${nextPath}]: ${JSON.stringify(actualValue)},`);
      }
    } else {
      collectVarsAssignment(value, nextPath, cssVariableMap, lines);
    }
  }
}

// ===== 메인 실행 로직 =====
const tokenFilePath = join(__dirname, "input/token.json");
const outputDir = __dirname;
const outputFile = join(outputDir, "tokens.ts");

if (!fs.existsSync(tokenFilePath)) {
  console.error(`❌ 파일을 찾을 수 없습니다: ${tokenFilePath}`);
  console.log("💡 다음 중 하나를 확인해주세요:");
  console.log("   1. 파일이 현재 폴더에 있는지 확인");
  console.log("   2. 파일 경로가 맞는지 확인");
  console.log("   3. 파일명이 정확한지 확인");
  process.exit(1);
}

console.log(`✅ 파일을 찾았습니다: ${tokenFilePath}`);

const rawData = fs.readFileSync(tokenFilePath, "utf8");
console.log("📖 파일 읽기 완료, 파싱 중...");

let tokens: unknown;
try {
  const jsonString = JSON.parse(rawData);
  console.log("🔄 첫 번째 파싱 완료");

  tokens = JSON.parse(jsonString);
  console.log("✅ 두 번째 파싱 완료 - 토큰 데이터 로드됨");
} catch (error) {
  console.error("❌ JSON 파싱 실패:", error);
  console.log("💡 파일 형식을 확인해주세요");
  process.exit(1);
}

const parsedTokens = tokenSchema.parse(tokens);

// textStyles.json 읽기 및 처리
const textStyleFilePath = join(__dirname, "input/textStyles.json");
const textStyleData = JSON.parse(fs.readFileSync(textStyleFilePath, "utf8"));
const normalizedTextStyleData = normalizeExtractedTextStyles(
  textStyleData,
  parsedTokens.typography.tokens.desktop,
);

const parsedTextStyle = textStyleSchema.parse(normalizedTextStyleData);

const cssVariables = {
  colorPrimitive: parsedTokens["color-primitive"].cssVariables,
  colorSemantic: parsedTokens["color-semantic"].cssVariables,
  scheme: parsedTokens.scheme.cssVariables,
  typography: parsedTokens.typography.cssVariables,
  environment: parsedTokens.environment.cssVariables,
};

const processedTokens = {
  colorPrimitive: parsedTokens["color-primitive"].nested,
  colorSemantic: parsedTokens["color-semantic"].nested,
  scheme: parsedTokens.scheme.nested,
  typography: parsedTokens.typography.nested,
  environment: parsedTokens.environment.nested,
  textStyle: parsedTextStyle.nested,
};

const tsContent = `// 자동 생성된 디자인 토큰 - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}

export const designTokens = ${JSON.stringify(processedTokens, null, 2)} as const;
`;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFile, tsContent);
console.log(`\n✅ tokens 파일이 생성되었습니다: ${outputFile}`);

// ===== 합성 environment 토큰 (shadow, zIndex) 주입 =====
const radiusVar = (step: number): string => `var(--scheme-semantic-radius-${step})`;
const shadeVar = (step: number): string => `var(--colorPrimitive-primitive-shade-${step})`;

const shadowCssValues: Record<string, string> = {
  embossed: `0 0 ${radiusVar(2)} 0 ${shadeVar(2)}, 0 2px ${radiusVar(4)} 0 ${shadeVar(4)}`,
  raised: `0 0 ${radiusVar(2)} 0 ${shadeVar(6)}, 0 3px ${radiusVar(6)} 0 ${shadeVar(12)}`,
  floated: `0 0 ${radiusVar(2)} 0 ${shadeVar(4)}, 0 3px ${radiusVar(4)} 0 ${shadeVar(8)}, 0 4px ${radiusVar(8)} 0 ${shadeVar(12)}`,
  overlay: `0 0 ${radiusVar(4)} 0 ${shadeVar(8)}, 0 3px ${radiusVar(8)} 0 ${shadeVar(12)}, 0 8px ${radiusVar(16)} 0 ${shadeVar(16)}`,
};

const zIndexCssValues: Record<string, string> = {
  standard: "auto",
  embossed: "100",
  raised: "200",
  floated: "300",
  overlay: "400",
};

const environmentSemantic = processedTokens.environment["semantic"] as NestedObject;
environmentSemantic["shadow"] = Object.fromEntries(
  Object.keys(shadowCssValues).map(key => [key, `var(--semantic-shadow-${key})`]),
);
environmentSemantic["zIndex"] = Object.fromEntries(
  Object.keys(zIndexCssValues).map(key => [key, `var(--semantic-zIndex-${key})`]),
);

Object.entries(shadowCssValues).forEach(([key, value]) => {
  cssVariables.environment[`--semantic-shadow-${key}`] = value;
});
Object.entries(zIndexCssValues).forEach(([key, value]) => {
  cssVariables.environment[`--semantic-zIndex-${key}`] = value;
});

// ===== VE vars.css.ts 생성 =====

const contractShape: ContractShape = {
  colorPrimitive: toContractShape(processedTokens.colorPrimitive),
  color: toContractShape(processedTokens.colorSemantic["light"]),
  scheme: toContractShape(processedTokens.scheme["desktop"]),
  environment: toContractShape(processedTokens.environment),
  typo: toContractShape(processedTokens.typography["desktop"]),
};

const varsCssFileContent = `// 자동 생성된 VE 토큰 계약 - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}
import { createGlobalThemeContract } from "@vanilla-extract/css";

export const vars = createGlobalThemeContract(
  ${JSON.stringify(contractShape, null, 2)},
  (_, path) => \`--\${path.join("-")}\`
);
`;

const varsCssFilePath = join(outputDir, "vars.css.ts");
fs.writeFileSync(varsCssFilePath, varsCssFileContent);
console.log(`✅ vars.css.ts 파일이 생성되었습니다: ${varsCssFilePath}`);

// ===== VE globalTokens.css.ts 생성 =====

const desktopSchemeFlatMap: Record<string, string> = extractDeviceFlatMap(
  cssVariables.scheme,
  "desktop",
);

const desktopTypographyFlatMap: Record<string, string> = extractDeviceFlatMap(
  cssVariables.typography,
  "desktop",
);

const tabletSchemeFlatMap: Record<string, string> = extractDeviceFlatMap(
  cssVariables.scheme,
  "tablet",
);

const tabletTypographyFlatMap: Record<string, string> = extractDeviceFlatMap(
  cssVariables.typography,
  "tablet",
);

const mobileSchemeFlatMap: Record<string, string> = extractDeviceFlatMap(
  cssVariables.scheme,
  "mobile",
);

const mobileTypographyFlatMap: Record<string, string> = extractDeviceFlatMap(
  cssVariables.typography,
  "mobile",
);

// :root 기본값 라인 수집 (light + desktop 기준)
const rootAssignmentLines: string[] = [];
collectVarsAssignment(
  processedTokens.colorPrimitive,
  "vars.colorPrimitive",
  cssVariables.colorPrimitive,
  rootAssignmentLines,
);

collectVarsAssignment(
  processedTokens.colorSemantic["light"],
  "vars.color",
  cssVariables.colorSemantic["light"],
  rootAssignmentLines,
);

collectVarsAssignment(
  processedTokens.scheme["desktop"],
  "vars.scheme",
  desktopSchemeFlatMap,
  rootAssignmentLines,
);

collectVarsAssignment(
  processedTokens.typography["desktop"],
  "vars.typo",
  desktopTypographyFlatMap,
  rootAssignmentLines,
);

collectVarsAssignment(
  processedTokens.environment,
  "vars.environment",
  cssVariables.environment,
  rootAssignmentLines,
);

// 다크 테마 라인 수집
const darkAssignmentLines: string[] = [];
collectVarsAssignment(
  processedTokens.colorSemantic["dark"],
  "vars.color",
  cssVariables.colorSemantic["dark"],
  darkAssignmentLines,
);

// 태블릿 반응형 라인 수집
const tabletAssignmentLines: string[] = [];
collectVarsAssignment(
  processedTokens.scheme["tablet"],
  "vars.scheme",
  tabletSchemeFlatMap,
  tabletAssignmentLines,
);

collectVarsAssignment(
  processedTokens.typography["tablet"],
  "vars.typo",
  tabletTypographyFlatMap,
  tabletAssignmentLines,
);

// 모바일 반응형 라인 수집
const mobileAssignmentLines: string[] = [];
collectVarsAssignment(
  processedTokens.scheme["mobile"],
  "vars.scheme",
  mobileSchemeFlatMap,
  mobileAssignmentLines,
);

collectVarsAssignment(
  processedTokens.typography["mobile"],
  "vars.typo",
  mobileTypographyFlatMap,
  mobileAssignmentLines,
);

const desktopMinBreakpoint = Number(
  parsedTokens.scheme.tokens["desktop"]["semantic-breakpoint-min"],
);
const desktopMaxBreakpoint = Number(
  parsedTokens.scheme.tokens["desktop"]["semantic-breakpoint-max"],
);
const tabletMinBreakpoint = Number(parsedTokens.scheme.tokens["tablet"]["semantic-breakpoint-min"]);
const tabletMaxBreakpoint = Number(parsedTokens.scheme.tokens["tablet"]["semantic-breakpoint-max"]);
const mobileMinBreakpoint = Number(parsedTokens.scheme.tokens["mobile"]["semantic-breakpoint-min"]);
const mobileMaxBreakpoint = Number(parsedTokens.scheme.tokens["mobile"]["semantic-breakpoint-max"]);

const globalTokensCssFileContent = `// 자동 생성된 VE 전역 토큰 스타일 - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}
import { globalStyle } from "@vanilla-extract/css";

import { vars } from "./vars.css";

globalStyle(":root", {
  vars: {
${rootAssignmentLines.join("\n")}
  },
  "@media": {
    "screen and (min-width: ${tabletMinBreakpoint}px) and (max-width: ${tabletMaxBreakpoint}px)": {
      vars: {
${tabletAssignmentLines.join("\n")}
      },
    },
    "screen and (min-width: ${mobileMinBreakpoint}px) and (max-width: ${mobileMaxBreakpoint}px)": {
      vars: {
${mobileAssignmentLines.join("\n")}
      },
    },
  },
});

globalStyle('[data-theme="dark"]', {
  vars: {
${darkAssignmentLines.join("\n")}
  },
});
`;

const globalTokensCssFilePath = join(outputDir, "globalTokens.css.ts");
fs.writeFileSync(globalTokensCssFilePath, globalTokensCssFileContent);
console.log(`✅ globalTokens.css.ts 파일이 생성되었습니다: ${globalTokensCssFilePath}`);

// ===== textStyles.ts 생성 =====

const textStyleEntries = Object.entries(parsedTextStyle.nested).map(([name, props]) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { paragraphSpacing, paragraphIndent, ...cssProps } = props;
  return [name, cssProps] as const;
});

// 토큰명(semantic-textStyle-label-md-bold)을 세그먼트로 쪼개 중첩 객체로 만든다.
// 사용처가 문자열 키 대신 textStyles.label.md.bold로 접근하게 하기 위함이다.
//
// 한 토큰명이 다른 토큰명의 접두사가 되면(body-md와 body-md-bold가 함께 존재) 같은 자리에
// CSS 속성과 하위 그룹이 섞인다. 지금 토큰에는 그런 쌍이 없고, 생기면 아래에서 즉시 실패한다.
const createTextStyleGroup = () => Object.create(null) as Record<string, unknown>;
const hasOwnSegment = (group: Record<string, unknown>, segment: string) =>
  Object.hasOwn(group, segment);

const nestedTextStyles = createTextStyleGroup();
const leafPaths = new Set<string>();

for (const [name, cssProps] of textStyleEntries) {
  const segments = name.replace(/^semantic-textStyle-/, "").split("-");
  let cursor = nestedTextStyles;

  segments.forEach((segment, index) => {
    const path = segments.slice(0, index + 1).join(".");

    if (index === segments.length - 1) {
      if (hasOwnSegment(cursor, segment)) {
        throw new Error(`textStyle 이름 충돌: ${name} — ${path}에 이미 하위 그룹이 있습니다`);
      }
      cursor[segment] = cssProps;
      leafPaths.add(path);
      return;
    }

    if (leafPaths.has(path)) {
      throw new Error(`textStyle 이름 충돌: ${name} — ${path}가 이미 스타일 값입니다`);
    }
    if (!hasOwnSegment(cursor, segment)) {
      cursor[segment] = createTextStyleGroup();
    }
    cursor = cursor[segment] as Record<string, unknown>;
  });
}

const textStylesFileContent = `// 자동 생성된 textStyles - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}
import type { StyleRule } from "@vanilla-extract/css";

type TextStyleGroup = Record<string, StyleRule | Record<string, StyleRule>>;

export const textStyles = ${JSON.stringify(nestedTextStyles, null, 2)} satisfies Record<
  string,
  TextStyleGroup
>;
`;

const textStylesFilePath = join(outputDir, "textStyles.ts");
fs.writeFileSync(textStylesFilePath, textStylesFileContent);
console.log(`✅ textStyles.ts 파일이 생성되었습니다: ${textStylesFilePath}`);

// ===== breakpoints.ts 생성 =====

const breakpointsFileContent = `// 자동 생성된 브레이크포인트 - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}

export const breakpoints = {
  desktop: { min: ${desktopMinBreakpoint}, max: ${desktopMaxBreakpoint} },
  tablet: { min: ${tabletMinBreakpoint}, max: ${tabletMaxBreakpoint} },
  mobile: { min: ${mobileMinBreakpoint}, max: ${mobileMaxBreakpoint} },
} as const;
`;

const breakpointsFilePath = join(outputDir, "breakpoints.ts");
fs.writeFileSync(breakpointsFilePath, breakpointsFileContent);
console.log(`✅ breakpoints.ts 파일이 생성되었습니다: ${breakpointsFilePath}`);

console.log("\n🚀 토큰 변환 완료!");
