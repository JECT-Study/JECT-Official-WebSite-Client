import { globSync, readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const declared = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)];

const SPECIFIER_PATTERN = /(?:from|import\s*\()\s*["']([^"']+)["']/g;

const undeclared = new Set();

for (const file of globSync("dist/**/*.d.{ts,cts}")) {
  const content = readFileSync(file, "utf8");

  for (const [, specifier] of content.matchAll(SPECIFIER_PATTERN)) {
    if (specifier.startsWith(".")) continue;

    const name = specifier.startsWith("@")
      ? specifier.split("/").slice(0, 2).join("/")
      : specifier.split("/")[0];
    if (!declared.includes(name)) undeclared.add(`${file}: ${name}`);
  }
}

if (undeclared.size > 0) {
  console.error(
    "선언 파일이 dependencies에 없는 패키지를 참조합니다. 의존성 선언이나 external 설정을 확인하세요.",
  );
  for (const entry of undeclared) console.error(`  ${entry}`);
  process.exit(1);
}
