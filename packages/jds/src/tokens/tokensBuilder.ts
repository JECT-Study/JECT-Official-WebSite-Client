/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/naming-convention */
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { tokenSchema, textStyleSchema } from './schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ===== 메인 실행 로직 =====
const tokenFilePath = join(__dirname, 'input/token.json');
const outputDir = __dirname;
const outputFile = join(outputDir, 'tokens.ts');

if (!fs.existsSync(tokenFilePath)) {
  console.error(`❌ 파일을 찾을 수 없습니다: ${tokenFilePath}`);
  console.log('💡 다음 중 하나를 확인해주세요:');
  console.log('   1. 파일이 현재 폴더에 있는지 확인');
  console.log('   2. 파일 경로가 맞는지 확인');
  console.log('   3. 파일명이 정확한지 확인');
  process.exit(1);
}

console.log(`✅ 파일을 찾았습니다: ${tokenFilePath}`);

const rawData = fs.readFileSync(tokenFilePath, 'utf8');
console.log('📖 파일 읽기 완료, 파싱 중...');

let tokens: unknown;
try {
  const jsonString = JSON.parse(rawData);
  console.log('🔄 첫 번째 파싱 완료');

  tokens = JSON.parse(jsonString);
  console.log('✅ 두 번째 파싱 완료 - 토큰 데이터 로드됨');
} catch (error) {
  console.error('❌ JSON 파싱 실패:', error);
  console.log('💡 파일 형식을 확인해주세요');
  process.exit(1);
}

const parsedTokens = tokenSchema.parse(tokens);

// textStyle.json 읽기 및 처리
const textStyleFilePath = join(__dirname, 'input/textStyle.json');
const textStyleData = JSON.parse(fs.readFileSync(textStyleFilePath, 'utf8'));
const parsedTextStyle = textStyleSchema.parse(textStyleData);

const cssVariables = {
  colorPrimitive: parsedTokens['color-primitive'].cssVariables,
  colorSemantic: parsedTokens['color-semantic'].cssVariables,
  scheme: parsedTokens.scheme.cssVariables,
  typography: parsedTokens.typography.cssVariables,
  environment: parsedTokens.environment.cssVariables,
  textStyle: parsedTextStyle.cssVariables,
};

const processedTokens = {
  colorPrimitive: parsedTokens['color-primitive'].nested,
  colorSemantic: parsedTokens['color-semantic'].nested,
  scheme: parsedTokens.scheme.nested,
  typography: parsedTokens.typography.nested,
  environment: parsedTokens.environment.nested,
  textStyle: parsedTextStyle.nested,
};

// globalStyles 형식으로 변환
const globalStyles = {
  ':root': {
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
  [`@media (min-width: ${parsedTokens.scheme.tokens.tablet['semantic-breakpoint-min']}px) and (max-width: ${parsedTokens.scheme.tokens.tablet['semantic-breakpoint-max']}px)`]:
    {
      ':root': {
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
  [`@media (min-width: ${parsedTokens.scheme.tokens.mobile['semantic-breakpoint-min']}px) and (max-width: ${parsedTokens.scheme.tokens.mobile['semantic-breakpoint-max']}px)`]:
    {
      ':root': {
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
    desktop: `@media (min-width: ${parsedTokens.scheme.tokens.desktop['semantic-breakpoint-min']}px) and (max-width: ${parsedTokens.scheme.tokens.desktop['semantic-breakpoint-max']}px)`,
    tablet: `@media (min-width: ${parsedTokens.scheme.tokens.tablet['semantic-breakpoint-min']}px) and (max-width: ${parsedTokens.scheme.tokens.tablet['semantic-breakpoint-max']}px)`,
    mobile: `@media (min-width: ${parsedTokens.scheme.tokens.mobile['semantic-breakpoint-min']}px) and (max-width: ${parsedTokens.scheme.tokens.mobile['semantic-breakpoint-max']}px)`,
  },
};

// globalStyles 파일 생성
const globalStylesContent = `// 자동 생성된 globalStyles - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}

export const globalStyles = ${JSON.stringify(globalStyles, null, 2)} as const;
`;

const globalStylesPath = join(outputDir, 'globalStyles.ts');

// theme 파일 생성
const themeContent = `// 자동 생성된 theme - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}

export const theme = ${JSON.stringify(theme, null, 2)} as const;
`;

const themePath = join(outputDir, 'theme.ts');

const tsContent = `// 자동 생성된 디자인 토큰 - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}

export const designTokens = ${JSON.stringify(processedTokens, null, 2)} as const;
`;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(globalStylesPath, globalStylesContent);
fs.writeFileSync(themePath, themeContent);
fs.writeFileSync(outputFile, tsContent);
console.log(`\n✅ globalStyles 파일이 생성되었습니다: ${globalStylesPath}`);
console.log(`✅ theme 파일이 생성되었습니다: ${themePath}`);
console.log(`✅ tokens 파일이 생성되었습니다: ${outputFile}`);
console.log('\n🚀 토큰 변환 완료!');
