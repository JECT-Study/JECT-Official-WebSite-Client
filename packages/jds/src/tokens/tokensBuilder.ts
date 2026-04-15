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

// textStyle.json 읽기 및 처리
const textStyleFilePath = join(__dirname, "input/textStyle.json");
const textStyleData = JSON.parse(fs.readFileSync(textStyleFilePath, "utf8"));
const parsedTextStyle = textStyleSchema.parse(textStyleData);

const cssVariables = {
  colorPrimitive: parsedTokens["color-primitive"].cssVariables,
  colorSemantic: parsedTokens["color-semantic"].cssVariables,
  scheme: parsedTokens.scheme.cssVariables,
  typography: parsedTokens.typography.cssVariables,
  environment: parsedTokens.environment.cssVariables,
  textStyle: parsedTextStyle.cssVariables,
};

const processedTokens = {
  colorPrimitive: parsedTokens["color-primitive"].nested,
  colorSemantic: parsedTokens["color-semantic"].nested,
  scheme: parsedTokens.scheme.nested,
  typography: parsedTokens.typography.nested,
  environment: parsedTokens.environment.nested,
  textStyle: parsedTextStyle.nested,
};

// globalStyles 형식으로 변환
const globalStyles = {
  ":root": {
    ...cssVariables.colorPrimitive,
    ...cssVariables.environment,
    ...cssVariables.colorSemantic.light,
    // scheme desktop 기본값
    ...Object.fromEntries(
      Object.entries(cssVariables.scheme).map(([key, values]) => [key, values.desktop]),
    ),
    // typography desktop 기본값
    ...Object.fromEntries(
      Object.entries(cssVariables.typography).map(([key, values]) => [key, values.desktop]),
    ),
  },
  // textStyle 클래스들 - CSS-in-JS용이므로 camelCase 사용
  ...parsedTextStyle.nested,
  '[data-theme="dark"]': cssVariables.colorSemantic.dark,
  [`@media (min-width: ${parsedTokens.scheme.tokens.tablet["semantic-breakpoint-min"]}px) and (max-width: ${parsedTokens.scheme.tokens.tablet["semantic-breakpoint-max"]}px)`]:
    {
      ":root": {
        // scheme tablet
        ...Object.fromEntries(
          Object.entries(cssVariables.scheme).map(([key, values]) => [key, values.tablet]),
        ),
        // typography tablet
        ...Object.fromEntries(
          Object.entries(cssVariables.typography).map(([key, values]) => [key, values.tablet]),
        ),
      },
    },
  [`@media (min-width: ${parsedTokens.scheme.tokens.mobile["semantic-breakpoint-min"]}px) and (max-width: ${parsedTokens.scheme.tokens.mobile["semantic-breakpoint-max"]}px)`]:
    {
      ":root": {
        // scheme mobile
        ...Object.fromEntries(
          Object.entries(cssVariables.scheme).map(([key, values]) => [key, values.mobile]),
        ),
        // typography mobile
        ...Object.fromEntries(
          Object.entries(cssVariables.typography).map(([key, values]) => [key, values.mobile]),
        ),
      },
    },
};

// theme 객체 생성
// 미디어쿼리는 CSS 변수가 자동 처리하기 때문에 default(light,desktop)로 설정
const theme = {
  colorPrimitive: processedTokens.colorPrimitive,
  color: processedTokens.colorSemantic.light,
  scheme: processedTokens.scheme.desktop,
  environment: processedTokens.environment,
  typo: processedTokens.typography.desktop,
  textStyle: processedTokens.textStyle,
  breakPoint: {
    desktop: `@media (min-width: ${parsedTokens.scheme.tokens.desktop["semantic-breakpoint-min"]}px) and (max-width: ${parsedTokens.scheme.tokens.desktop["semantic-breakpoint-max"]}px)`,
    tablet: `@media (min-width: ${parsedTokens.scheme.tokens.tablet["semantic-breakpoint-min"]}px) and (max-width: ${parsedTokens.scheme.tokens.tablet["semantic-breakpoint-max"]}px)`,
    mobile: `@media (min-width: ${parsedTokens.scheme.tokens.mobile["semantic-breakpoint-min"]}px) and (max-width: ${parsedTokens.scheme.tokens.mobile["semantic-breakpoint-max"]}px)`,
  },
};

// TODO(Emotion 제거): globalStyles 생성 블록 전체 삭제 (globalStyles.ts 파일도 함께 삭제)
// globalStyles 파일 생성
const globalStylesContent = `// 자동 생성된 globalStyles - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}

export const globalStyles = ${JSON.stringify(globalStyles, null, 2)} as const;
`;

const globalStylesPath = join(outputDir, "globalStyles.ts");

// TODO(Emotion 제거): theme 생성 블록 전체 삭제 (theme.ts 파일도 함께 삭제)
// theme 파일 생성
const themeContent = `// 자동 생성된 theme - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}

export const theme = ${JSON.stringify(theme, null, 2)} as const;
`;

const themePath = join(outputDir, "theme.ts");

const tsContent = `// 자동 생성된 디자인 토큰 - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}

export const designTokens = ${JSON.stringify(processedTokens, null, 2)} as const;
`;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(globalStylesPath, globalStylesContent); // TODO(Emotion 제거): 이 줄 삭제
fs.writeFileSync(themePath, themeContent); // TODO(Emotion 제거): 이 줄 삭제
fs.writeFileSync(outputFile, tsContent);
console.log(`\n✅ globalStyles 파일이 생성되었습니다: ${globalStylesPath}`); // TODO(Emotion 제거): 이 줄 삭제
console.log(`✅ theme 파일이 생성되었습니다: ${themePath}`); // TODO(Emotion 제거): 이 줄 삭제
console.log(`✅ tokens 파일이 생성되었습니다: ${outputFile}`);

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

console.log("\n🚀 토큰 변환 완료!");
