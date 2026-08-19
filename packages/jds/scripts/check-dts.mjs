import { globSync, readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const shouldBeExternal = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
  "csstype",
];

const leaked = [];

for (const file of globSync("dist/**/*.d.ts")) {
  const content = readFileSync(file, "utf8");
  for (const name of shouldBeExternal) {
    if (content.includes(`//#region ../../node_modules/${name}/`)) leaked.push(`${file}: ${name}`);
  }
}

if (leaked.length > 0) {
  console.error("소비처가 설치하는 패키지의 타입이 선언 파일에 포함되었습니다. external 설정을 확인하세요.");
  for (const entry of leaked) console.error(`  ${entry}`);
  process.exit(1);
}
