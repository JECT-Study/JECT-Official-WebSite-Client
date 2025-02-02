import StyleDictionary from 'style-dictionary';

StyleDictionary.registerParser({
  name: 'json-parser',
  pattern: /\.json$/,
  parser: ({ filePath, contents }) => {
    const data = contents
      .replace(/\\n/g, '')
      .replace(/\\t/g, '')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .trim()
      .slice(1, -1);

    const rawData = JSON.parse(data);

    const transformData = data => {
      const result = { color: {} };
      for (const key in data) {
        result.color[key] = {};
        for (const subKey in data[key]) {
          result.color[key][subKey] = { value: data[key][subKey], type: 'color' };
        }
      }
      return result;
    };

    return transformData(rawData);
  },
});

StyleDictionary.registerFormat({
  name: 'css/custom-variables',
  format: ({ dictionary }) => {
    const { allTokens } = dictionary;
    const cssVariables = allTokens.map(token => `  --${token.name}: ${token.value};`).join('\n');

    return `
@import 'tailwindcss';
      
@theme {\n${cssVariables}\n}`;
  },
});

const styleDictionary = new StyleDictionary({
  source: [`src/styles/tokens/**/*.json`],
  parsers: ['json-parser'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/tokens/',
      files: [
        {
          destination: 'semantic.css',
          format: 'css/custom-variables',
        },
      ],
    },
  },
  logLevel: 'info',
});

await styleDictionary.buildAllPlatforms();
