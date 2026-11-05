import { readFileSync, rmSync, writeFileSync } from "node:fs";

const SCRIPT_PLACEHOLDER = "/* UI_SCRIPT */";

const template = readFileSync("src/ui/ui.html", "utf8");
const script = readFileSync("dist/ui.iife.js", "utf8");

if (!template.includes(SCRIPT_PLACEHOLDER)) {
  throw new Error(`src/ui/ui.html에 ${SCRIPT_PLACEHOLDER} 자리가 없습니다.`);
}

writeFileSync(
  "dist/ui.html",
  template.replace(SCRIPT_PLACEHOLDER, () => script),
);
rmSync("dist/ui.iife.js");
