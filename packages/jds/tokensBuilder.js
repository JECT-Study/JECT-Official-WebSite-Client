import fs from 'fs';

/**
 * <디자인 토큰 JSON 파일 변환 스크립트 사용법 >
 *
 * 1. jds 최상위 경로에 피그마에서 받은 JSON 파일 추가 (JSON 파일은 github에 push X)
 * 2. jds의 tokensBuilder 스크립트 내 tokenFilePath 변수에 변환할 JSON 파일명 작성 ex) jds_tokens_250817.json
 * 3. jds의 npm run build:tokens 명령어로 tokensBuilder 스크립트 실행
 * 4. src/tokens/token.ts 경로에 토큰 파일 생성 완료
 *
 * */
const tokenFilePath = 'jds_tokens_251003.json';
const outputDir = 'src/tokens';
const outputFile = `${outputDir}/tokens.ts`;

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

let tokens;
try {
  const jsonString = JSON.parse(rawData);
  console.log('🔄 첫 번째 파싱 완료');

  tokens = JSON.parse(jsonString);
  console.log('✅ 두 번째 파싱 완료 - 토큰 데이터 로드됨');
} catch (error) {
  console.error('❌ JSON 파싱 실패:', error.message);
  console.log('💡 파일 형식을 확인해주세요');
  process.exit(1);
}

function categorizeTokens(tokenData) {
  const categories = {
    colorPrimitive: {},
    colorSemantic: {},
    scheme: {},
    typography: {},
    environment: {},
  };

  Object.keys(tokenData).forEach(categoryKey => {
    const categoryData = tokenData[categoryKey];

    console.log(`🔍 처리 중: ${categoryKey}`);

    if (categoryData && typeof categoryData === 'object' && categoryData.value) {
      const values = categoryData.value;

      if (categoryKey === 'color-primitive') {
        categories.colorPrimitive = values;
      } else if (categoryKey === 'color-semantic') {
        categories.colorSemantic = values;
      } else if (categoryKey === 'scheme') {
        categories.scheme = values;
      } else if (categoryKey === 'typography') {
        categories.typography = values;
      } else if (categoryKey === 'environment') {
        categories.environment = values;
      }
    } else if (categoryData && typeof categoryData === 'object') {
      if (categoryKey === 'color-primitive') {
        categories.colorPrimitive = categoryData;
      } else if (categoryKey === 'color-semantic') {
        categories.colorSemantic = categoryData;
      } else if (categoryKey === 'scheme') {
        categories.scheme = categoryData;
      } else if (categoryKey === 'typography') {
        categories.typography = categoryData;
      } else if (categoryKey === 'environment') {
        categories.environment = categoryData;
      }
    }
  });

  return categories;
}

function setNestedValue(obj, pathArray, value) {
  let current = obj;
  pathArray.forEach((key, index) => {
    if (index === pathArray.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
  });
}

function convertTokensToNestedStructure(tokens, category) {
  const result = {};

  if (category === 'colorPrimitive' || category === 'environment') {
    Object.keys(tokens).forEach(tokenName => {
      const tokenValue = tokens[tokenName];
      const pathArray = tokenName.split('-');
      setNestedValue(result, pathArray, tokenValue);
    });
  } else if (category === 'colorSemantic' || category === 'scheme' || category === 'typography') {
    Object.keys(tokens).forEach(themeOrDevice => {
      result[themeOrDevice] = {};

      const themeTokens = tokens[themeOrDevice];
      Object.keys(themeTokens).forEach(tokenName => {
        const tokenValue = themeTokens[tokenName];
        const pathArray = tokenName.split('-');
        setNestedValue(result[themeOrDevice], pathArray, tokenValue);
      });
    });
  } else {
    Object.keys(tokens).forEach(tokenName => {
      const tokenValue = tokens[tokenName];
      const pathArray = tokenName.split('-');
      setNestedValue(result[themeOrDevice], pathArray, tokenValue);
    });
  }

  return result;
}

console.log('🔄 토큰 분류 중...');
const categorizedTokens = categorizeTokens(tokens);

const processedTokens = {};
Object.keys(categorizedTokens).forEach(category => {
  if (Object.keys(categorizedTokens[category]).length > 0) {
    processedTokens[category] = convertTokensToNestedStructure(
      categorizedTokens[category],
      category,
    );
    console.log(
      `✅ ${category} 토큰 처리 완료 (${Object.keys(categorizedTokens[category]).length}개)`,
    );
  }
});

const tsContent = `// 자동 생성된 디자인 토큰 - 수정 금지
// 생성 시간: ${new Date().toLocaleString()}

export const designTokens = ${JSON.stringify(processedTokens, null, 2)} as const;
`;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFile, tsContent);

console.log(`\n✅ TypeScript 토큰 파일이 ${outputFile}에 생성되었습니다!`);
console.log('📁 파일 크기:', Math.round(fs.statSync(outputFile).size / 1024), 'KB');

console.log('\n📋 생성된 토큰 구조:');
Object.keys(processedTokens).forEach(category => {
  const categoryTokens = processedTokens[category];
  if (Object.keys(categoryTokens).length > 0) {
    console.log(`\n🎨 ${category.toUpperCase()}:`);

    Object.keys(categoryTokens)
      .slice(0, 5)
      .forEach((key, index, arr) => {
        const isLast = index === arr.length - 1 && arr.length <= 5;
        const subKeys = Object.keys(categoryTokens[key] || {});
        console.log(`   ${isLast ? '└──' : '├──'} ${key} (${subKeys.length}개)`);
      });

    if (Object.keys(categoryTokens).length > 5) {
      console.log(`   └── ... (총 ${Object.keys(categoryTokens).length}개 그룹)`);
    }
  }
});

console.log('\n🚀 토큰 변환 완료!');
console.log(`📖 사용법: import { designTokens } from './${outputFile.replace('.ts', '')}'`);
