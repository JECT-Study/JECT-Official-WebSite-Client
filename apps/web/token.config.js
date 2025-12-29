import StyleDictionary from "style-dictionary";

/**
 * 새로운 semantic.css 파일 생성
 * 1. 기존 semantic.css 파일을 삭제합니다.
 * 2. json 파일을 src/styles/tokens/에 위치시킵니다
 * 3. node token.config.js 명령어를 입력합니다.
 */

StyleDictionary.registerParser({
  name: "json-parser",
  pattern: /\.json$/,
  parser: ({ filePath, contents }) => {
    const data = contents
      .replace(/\\n/g, "")
      .replace(/\\t/g, "")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, "\\")
      .trim()
      .slice(1, -1);

    const rawData = JSON.parse(data);

    const transformData = data => {
      const result = { color: {} };
      for (const key in data) {
        result.color[key] = {};
        for (const subKey in data[key]) {
          result.color[key][subKey] = {
            value: data[key][subKey],
            type: "color",
          };
        }
      }
      return result;
    };

    return transformData(rawData);
  },
});

StyleDictionary.registerFormat({
  name: "css/custom-variables",
  format: ({ dictionary }) => {
    const { allTokens } = dictionary;
    const cssVariables = allTokens.map(token => `  --${token.name}: ${token.value};`).join("\n");

    return `
@import 'tailwindcss';
      
@theme {\n${cssVariables}\n}`;
  },
});

const styleDictionary = new StyleDictionary({
  source: [`src/styles/tokens/**/*.json`],
  parsers: ["json-parser"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/styles/tokens/",
      files: [
        {
          destination: "semantic.css",
          format: "css/custom-variables",
        },
      ],
    },
  },
  logLevel: "info",
});

await styleDictionary.buildAllPlatforms();
