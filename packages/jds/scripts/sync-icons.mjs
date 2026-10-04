import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FILE_KEY = "VGdi9AdcpTxkzK1Kqxcd3D";
// Iconography 페이지
const PAGE_ID = "23135:316232";
const SET_PREFIX = "Iconography/";
// 여러 색을 쓰는 그래픽이라 currentColor 아이콘으로 다루지 않음
const IGNORED_SETS = ["Iconography/Colored graphic"];
// .svgrrc.json의 replaceAttrValues와 같아야 currentColor로 치환됨
const ICON_COLORS = ["#1B1C21", "#191B24"];

const ICONS_DIR = "src/assets/icons";
const ICON_MAP_PATH = "src/components/Icon/IconMap.ts";

const token = process.env.FIGMA_TOKEN;
if (!token) {
  console.error("FIGMA_TOKEN이 없습니다. packages/jds/.env에 FIGMA_TOKEN=... 을 넣어주세요.");
  process.exit(1);
}

const figma = async path => {
  const res = await fetch(`https://api.figma.com/v1/${path}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) throw new Error(`Figma API ${res.status}: ${await res.text()}`);
  return res.json();
};

// 컴포넌트 이름은 세트에 따라 `name=bold` 또는 `variant=bold` 형태
const toIconName = componentName => componentName.replace(/^(name|variant)=/, "");

const collectIcons = (node, icons = []) => {
  if (node.name.startsWith(SET_PREFIX)) {
    if (IGNORED_SETS.includes(node.name)) return icons;
    for (const child of node.children ?? []) {
      if (child.type === "COMPONENT") icons.push({ id: child.id, name: toIconName(child.name) });
    }
    return icons;
  }
  for (const child of node.children ?? []) collectIcons(child, icons);
  return icons;
};

const page = await figma(`files/${FILE_KEY}/nodes?ids=${PAGE_ID}`);
const icons = collectIcons(page.nodes[PAGE_ID].document);

const problems = [];
const seen = new Set();
for (const { name } of icons) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(name)) problems.push(`${name}: kebab-case가 아님`);
  if (seen.has(name)) problems.push(`${name}: 같은 이름의 아이콘이 둘 이상`);
  seen.add(name);
}

const { images } = await figma(
  `images/${FILE_KEY}?ids=${icons.map(icon => icon.id).join(",")}&format=svg`,
);

const added = [];
const changed = [];
const pending = [];
await Promise.all(
  icons.map(async ({ id, name }) => {
    const res = await fetch(images[id]);
    if (!res.ok) {
      problems.push(`${name}: SVG를 받지 못함 (${res.status})`);
      return;
    }
    const svg = await res.text();
    if (!svg.startsWith('<svg width="24" height="24" viewBox="0 0 24 24"')) {
      problems.push(`${name}: 24x24가 아님`);
    }
    const strayColors = [...new Set(svg.match(/#[0-9A-Fa-f]{6}\b/g))].filter(
      color => !ICON_COLORS.includes(color.toUpperCase()),
    );
    if (strayColors.length > 0)
      problems.push(`${name}: 아이콘 색이 아닌 값 ${strayColors.join(", ")}`);
    pending.push({ name, svg });
  }),
);

if (problems.length > 0) {
  console.error(
    `피그마 아이콘이 규칙과 맞지 않아 중단합니다.\n${problems.map(p => `  - ${p}`).join("\n")}`,
  );
  process.exit(1);
}

for (const { name, svg } of pending) {
  const path = join(ICONS_DIR, `${name}.svg`);
  if (!existsSync(path)) added.push(name);
  else if (readFileSync(path, "utf8") !== svg) changed.push(name);
  else continue;
  writeFileSync(path, svg);
}

// 피그마에 없는 아이콘은 지우지 않음. 이름 변경과 삭제는 소비처가 깨지는 변경이라 사람이 판단
const localNames = readdirSync(ICONS_DIR)
  .filter(file => file.endsWith(".svg"))
  .map(file => file.replace(/\.svg$/, ""))
  .sort();
const onlyLocal = localNames.filter(name => !seen.has(name));

execSync("npm run build:icons", { stdio: ["ignore", "ignore", "inherit"] });

const toComponentName = name =>
  name.replace(/(^|-)([a-z0-9])/g, (_, __, char) => char.toUpperCase());
const toKey = name => (/^[a-z][a-z0-9]*$/.test(name) ? name : `"${name}"`);
const entries = localNames.map(name => `  ${toKey(name)}: Icons.${toComponentName(name)},`);
const iconMapSource = readFileSync(ICON_MAP_PATH, "utf8");
const iconMapBlock = /export const iconMap = \{\n[\s\S]*?\n\} as const;/;
if (!iconMapBlock.test(iconMapSource))
  throw new Error(`${ICON_MAP_PATH}에서 iconMap을 찾지 못했습니다.`);
writeFileSync(
  ICON_MAP_PATH,
  iconMapSource.replace(
    iconMapBlock,
    `export const iconMap = {\n${entries.join("\n")}\n} as const;`,
  ),
);

const list = names => (names.length > 0 ? names.join(", ") : "없음");
console.log(`피그마 아이콘 ${icons.length}개 확인`);
console.log(`추가 ${added.length}: ${list(added)}`);
console.log(`변경 ${changed.length}: ${list(changed)}`);
console.log(`저장소에만 있음 ${onlyLocal.length}: ${list(onlyLocal)}`);
