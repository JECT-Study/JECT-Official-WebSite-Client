/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

/**
 *
 * - 토큰 데이터(json)를 zod를 통해 type-safe하게 파싱하는 로직입니다
 * - Figma의 collection별로 schema가 존재하고, schema validation -> transform을 통해 데이터를 반환합니다
 *   - tokens: 원본 flat 데이터
 *   - cssVariables: CSS 변수 형태로 정리된 값 (--key: value)
 *   - nested: 중첩 객체 구조로 변환된 값 (var(--key) 참조)
 * - textStyles의 경우 Figma variables로 존재하지 않습니다
 * - nested 생성은 helper 함수들에서 처리합니다.
 */

/* ------------------ 공통 스키마 ------------------ */
const hexColorSchema = z.string().regex(/^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/);
const tokenValueSchema = z.union([z.number(), z.string()]);

/* ------------------ 중첩 객체를 파싱하기 위한 helper function ------------------ */
export interface NestedObject {
  [key: string]: string | NestedObject;
}

function setNestedValue(obj: NestedObject, pathArray: string[], value: any): void {
  let current: NestedObject = obj;
  pathArray.forEach((key, index) => {
    if (index === pathArray.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) {
        current[key] = {};
      }
      const next = current[key];
      if (typeof next === "object") {
        current = next;
      }
    }
  });
}

// px이 필요한 CSS 속성 목록
const pxProperties = [
  "font-size",
  "letter-spacing",
  "paragraph-spacing",
  "paragraph-indent",
  "border-radius",
  "radius",
  "stroke-weight",
  "spacing",
  "width",
  "height",
  "padding",
  "margin",
];

// ms이 필요한 CSS 속성 목록
const msProperties = ["duration"];

function needsPxUnit(propertyName: string): boolean {
  return pxProperties.some(prop => propertyName.includes(prop));
}

function needsMsUnit(propertyName: string): boolean {
  return msProperties.some(prop => propertyName.includes(prop));
}
//Figma의 모든 토큰 type이 number이기 때문에, 이를 하드코딩해서 맞는 prefix를 붙여줘야 함
function addUnitIfNeeded(propertyName: string, value: string | number): string {
  const strValue = String(value);
  // 이미 단위가 있거나, var() 함수이거나, 숫자가 아니면 그대로 반환
  if (
    strValue.includes("px") ||
    strValue.includes("ms") ||
    strValue.includes("var(") ||
    strValue.includes("%") ||
    isNaN(Number(value))
  ) {
    return strValue;
  }
  // px이 필요한 속성이고 숫자값이면 px 추가
  if (needsPxUnit(propertyName) && !isNaN(Number(value))) {
    return `${value}px`;
  }
  // ms이 필요한 속성이고 숫자값이면 ms 추가
  if (needsMsUnit(propertyName) && !isNaN(Number(value))) {
    return `${value}ms`;
  }
  return strValue;
}

// 하위 호환성을 위한 별칭
function addPxIfNeeded(propertyName: string, value: string | number): string {
  return addUnitIfNeeded(propertyName, value);
}

function toCssPropertyCamelCase(tokenName: string): string {
  return tokenName
    .replace(/line-height/g, "lineHeight")
    .replace(/letter-spacing/g, "letterSpacing")
    .replace(/font-size/g, "fontSize")
    .replace(/font-weight/g, "fontWeight")
    .replace(/font-family/g, "fontFamily")
    .replace(/border-radius/g, "borderRadius")
    .replace(/stroke-weight/g, "strokeWeight")
    .replace(/paragraph-spacing/g, "paragraphSpacing")
    .replace(/paragraph-indent/g, "paragraphIndent");
}

function toCssVariableKebabCase(tokenName: string): string {
  return tokenName
    .replace(/lineHeight/g, "line-height")
    .replace(/letterSpacing/g, "letter-spacing")
    .replace(/fontSize/g, "font-size")
    .replace(/fontWeight/g, "font-weight")
    .replace(/fontFamily/g, "font-family")
    .replace(/borderRadius/g, "border-radius")
    .replace(/strokeWeight/g, "stroke-weight")
    .replace(/paragraphSpacing/g, "paragraph-spacing")
    .replace(/paragraphIndent/g, "paragraph-indent");
}

function convertSimpleToNested(tokens: Record<string, string | number>): NestedObject {
  const result: NestedObject = {};
  Object.keys(tokens).forEach(tokenName => {
    const convertedName = toCssPropertyCamelCase(tokenName);
    const pathArray = convertedName.split("-");
    setNestedValue(result, pathArray, `var(--${tokenName})`);
  });
  return result;
}

function convertThemeToNested(
  tokens: Record<string, Record<string, string>>,
): Record<string, NestedObject> {
  const result: Record<string, NestedObject> = {};
  Object.keys(tokens).forEach(theme => {
    result[theme] = {};
    const themeTokens = tokens[theme];
    Object.keys(themeTokens).forEach(tokenName => {
      const convertedName = toCssPropertyCamelCase(tokenName);
      const pathArray = convertedName.split("-");
      setNestedValue(result[theme], pathArray, `var(--${tokenName})`);
    });
  });
  return result;
}

function convertResponsiveToNested(
  tokens: Record<string, Record<string, string | number>>,
): Record<string, NestedObject> {
  const result: Record<string, NestedObject> = {};
  Object.keys(tokens).forEach(device => {
    result[device] = {};
    const deviceTokens = tokens[device];
    Object.keys(deviceTokens).forEach(tokenName => {
      const convertedName = toCssPropertyCamelCase(tokenName);
      const pathArray = convertedName.split("-");
      setNestedValue(result[device], pathArray, `var(--${tokenName})`);
    });
  });
  return result;
}

/* ------------------ collection별 schema ------------------ */

/**
 * textStyle Property 스키마
 * fontSize, lineHeight 등 각 속성의 구조
 */
const textStylePropertySchema = z.object({
  value: z.union([z.string(), z.number()]),
  token: z
    .object({
      name: z.string(),
      value: z.union([z.string(), z.number()]),
    })
    .nullable(),
});

/**
 * textStyle: 배열 형태의 textStyle 토큰
 * [
 *   {
 *     name: "semantic/textStyle/hero/4",
 *     properties: { fontSize: {...}, lineHeight: {...}, ... }
 *   },
 *   ...
 * ]
 *
 * 반환:
 *  - tokens: 원본 배열 데이터
 *  - cssVariables: CSS 변수 형태로 변환된 값
 *  - nested: 중첩 객체 구조로 변환된 값
 */
export const textStyleSchema = z
  .array(
    z.object({
      name: z.string(),
      id: z.string().optional(),
      properties: z.object({
        fontSize: textStylePropertySchema,
        lineHeight: textStylePropertySchema,
        fontFamily: textStylePropertySchema,
        fontWeight: textStylePropertySchema,
        letterSpacing: textStylePropertySchema,
        paragraphSpacing: textStylePropertySchema,
        paragraphIndent: textStylePropertySchema,
      }),
    }),
  )
  .transform(data => {
    const tokens = data;

    // globalStyles용 CSS 객체 생성 (kebab-case 속성명)
    const cssStyleObjects: Record<string, Record<string, string>> = {};
    data.forEach(textStyle => {
      const name = textStyle.name.replaceAll("/", "-");
      cssStyleObjects[name] = {
        "font-size": textStyle.properties.fontSize.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.fontSize.token.name.replaceAll("/", "-"))})`
          : addPxIfNeeded("font-size", textStyle.properties.fontSize.value),
        "line-height": textStyle.properties.lineHeight.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.lineHeight.token.name.replaceAll("/", "-"))})`
          : String(textStyle.properties.lineHeight.value),
        "font-family": textStyle.properties.fontFamily.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.fontFamily.token.name.replaceAll("/", "-"))})`
          : String(textStyle.properties.fontFamily.value),
        "font-weight": textStyle.properties.fontWeight.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.fontWeight.token.name.replaceAll("/", "-"))})`
          : String(textStyle.properties.fontWeight.value),
        "letter-spacing": textStyle.properties.letterSpacing.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.letterSpacing.token.name.replaceAll("/", "-"))})`
          : addPxIfNeeded("letter-spacing", textStyle.properties.letterSpacing.value),
        "paragraph-spacing": textStyle.properties.paragraphSpacing.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.paragraphSpacing.token.name.replaceAll("/", "-"))})`
          : addPxIfNeeded("paragraph-spacing", textStyle.properties.paragraphSpacing.value) || "0",
        "paragraph-indent": textStyle.properties.paragraphIndent.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.paragraphIndent.token.name.replaceAll("/", "-"))})`
          : addPxIfNeeded("paragraph-indent", textStyle.properties.paragraphIndent.value) || "0",
      };
    });

    // theme용 JS 객체 생성 (camelCase 속성명)
    const themeStyleObjects: Record<string, Record<string, string>> = {};
    data.forEach(textStyle => {
      const name = textStyle.name.replaceAll("/", "-");
      themeStyleObjects[name] = {
        fontSize: textStyle.properties.fontSize.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.fontSize.token.name.replaceAll("/", "-"))})`
          : addPxIfNeeded("font-size", textStyle.properties.fontSize.value),
        lineHeight: textStyle.properties.lineHeight.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.lineHeight.token.name.replaceAll("/", "-"))})`
          : String(textStyle.properties.lineHeight.value),
        fontFamily: textStyle.properties.fontFamily.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.fontFamily.token.name.replaceAll("/", "-"))})`
          : String(textStyle.properties.fontFamily.value),
        fontWeight: textStyle.properties.fontWeight.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.fontWeight.token.name.replaceAll("/", "-"))})`
          : String(textStyle.properties.fontWeight.value),
        letterSpacing: textStyle.properties.letterSpacing.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.letterSpacing.token.name.replaceAll("/", "-"))})`
          : addPxIfNeeded("letter-spacing", textStyle.properties.letterSpacing.value),
        paragraphSpacing: textStyle.properties.paragraphSpacing.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.paragraphSpacing.token.name.replaceAll("/", "-"))})`
          : addPxIfNeeded("paragraph-spacing", textStyle.properties.paragraphSpacing.value),
        paragraphIndent: textStyle.properties.paragraphIndent.token
          ? `var(--${toCssVariableKebabCase(textStyle.properties.paragraphIndent.token.name.replaceAll("/", "-"))})`
          : addPxIfNeeded("paragraph-indent", textStyle.properties.paragraphIndent.value),
      };
    });

    // cssVariables: globalStyles용 (kebab-case)
    const cssVariables = cssStyleObjects;

    // nested: theme용 (camelCase)
    const nested = themeStyleObjects;

    return { tokens, cssVariables, nested };
  });

/**
 * colorPrimitive: { value: { "<token-name>": "#rrggbb", ... } }
 * 반환: { tokens, cssVariables, nested }
 */
const colorPrimitiveSchema = z
  .object({
    value: z.record(z.string(), hexColorSchema),
  })
  .transform(data => {
    const tokens = data.value;
    // tokens: 원본 flat 데이터 { "primitive-flow-20": "#faf8ff" }
    // cssVariables: CSS 변수 형태 { "--primitive-flow-20": "#faf8ff" }
    // nested: 중첩 객체 + CSS var 참조 { primitive: { flow: { 20: "var(--primitive-flow-20)" } } }
    const cssVariables = Object.fromEntries(
      Object.entries(tokens).map(([key, value]) => [`--${key}`, value]),
    );
    const nested = convertSimpleToNested(tokens);
    return { tokens, cssVariables, nested };
  });

/**
 * deviceTokensSchema: 반응형 토큰 구조
 * {
 *   desktop: { "<token>": value, ... },
 *   tablet:  { ... },
 *   mobile:  { ... }
 * }
 *
 * 반환:
 *  - tokens: 원본 device별 데이터
 *  - cssVariables: { "--token": { desktop: v, tablet: v, mobile: v } }
 *  - nested: { desktop: nestedObj, tablet: nestedObj, mobile: nestedObj }
 */
const deviceTokensSchema = z
  .object({
    desktop: z.record(z.string(), tokenValueSchema),
    tablet: z.record(z.string(), tokenValueSchema),
    mobile: z.record(z.string(), tokenValueSchema),
  })
  .transform(data => {
    // tokens: 디바이스별 원본 데이터
    // cssVariables: 토큰별로 디바이스 값 그룹핑 { "--semantic-spacing-1": { desktop: 1, tablet: 1, mobile: 1 } }
    // nested: 디바이스별 중첩 객체 { desktop: { semantic: { spacing: { 1: "var(--semantic-spacing-1)" } } }, ... }
    const cssVars: Record<string, Record<string, string | number>> = {};
    Object.entries(data).forEach(([device, tokens]) => {
      Object.entries(tokens).forEach(([key, value]) => {
        const cssKey = `--${key}`;
        if (!cssVars[cssKey]) cssVars[cssKey] = {};
        cssVars[cssKey][device] = addPxIfNeeded(key, value);
      });
    });
    const nested = convertResponsiveToNested(data);
    return { tokens: data, cssVariables: cssVars, nested };
  });

/**
 * colorSemantic: theme 기반 (light/dark)
 * {
 *   light: { "<token>": "#fff", ...},
 *   dark:  { "<token>": "#000", ...}
 * }
 *
 * 반환:
 *  - tokens: 원본 테마별 토큰
 *  - cssVariables: { light: { "--token": value }, dark: { "--token": value } }
 *  - nested: 테마별 nested 구조
 */
const colorSemanticSchema = z
  .object({
    light: z.record(z.string(), z.string()),
    dark: z.record(z.string(), z.string()),
  })
  .transform(data => {
    // tokens: 테마별 원본 데이터
    // cssVariables: 테마별 CSS 변수 { light: { "--semantic-bg-primary": "#fff" }, dark: {...} }
    // nested: 테마별 중첩 객체 { light: { semantic: { bg: { primary: "var(--semantic-bg-primary)" } } }, dark: {...} }
    const cssVariables = Object.fromEntries(
      Object.entries(data).map(([theme, tokens]) => [
        theme,
        Object.fromEntries(Object.entries(tokens).map(([key, value]) => [`--${key}`, value])),
      ]),
    );
    const nested = convertThemeToNested(data);
    return { tokens: data, cssVariables, nested };
  });

/**
 * environment: { value: { "<token>": value, ... } }
 * (colorPrimitive와 유사)
 */
const environmentSchema = z
  .object({
    value: z.record(z.string(), tokenValueSchema),
  })
  .transform(data => {
    // tokens: 원본 flat 데이터 { "env-padding-base": 16 }
    // cssVariables: CSS 변수 형태 { "--env-padding-base": 16 }
    // nested: 중첩 객체 + CSS var 참조 { env: { padding: { base: "var(--env-padding-base)" } } }
    const tokens = data.value;
    const cssVariables = Object.fromEntries(
      Object.entries(tokens).map(([key, value]) => [`--${key}`, addUnitIfNeeded(key, value)]),
    );
    const nested = convertSimpleToNested(tokens);
    return { tokens, cssVariables, nested };
  });

/* ------------------ 최종 토큰 스키마------------------ */
export const tokenSchema = z.object({
  "color-primitive": colorPrimitiveSchema,
  scheme: deviceTokensSchema,
  "color-semantic": colorSemanticSchema,
  typography: deviceTokensSchema,
  environment: environmentSchema,
});

export type TokenSchemaParsed = z.infer<typeof tokenSchema>;

export type TokenKey = keyof TokenSchemaParsed;

export default tokenSchema;
