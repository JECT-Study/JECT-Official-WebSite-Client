import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { build } from "tsdown";

const pkg = JSON.parse(await readFile("package.json", "utf8"));
const directory = await mkdtemp(join(tmpdir(), "jds-tree-shaking-"));
const externalPackages = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)];
// ESM 소비처의 파일 단위 제거를 검증한다. CJS 실행 호환성은 별도 검사 대상이다.
const entrypoint = pkg.exports["."].import.default;

try {
  const input = join(directory, "consumer.mjs");
  await writeFile(input, `export { Divider } from ${JSON.stringify(resolve(entrypoint))};\n`);

  const bundles = await build({
    config: false,
    entry: [input],
    outDir: join(directory, "dist"),
    write: false,
    format: ["es"],
    dts: false,
    minify: true,
    logLevel: "silent",
    // 소비처 번들에서 지시어가 무시되는 경고만 제외한다.
    suppressWarnings: [/MODULE_LEVEL_DIRECTIVE/],
    deps: { neverBundle: externalPackages },
  });

  try {
    const chunks = bundles.flatMap(bundle => bundle.chunks).filter(chunk => chunk.type === "chunk");
    const code = chunks.map(chunk => chunk.code).join("\n");
    const modules = chunks.flatMap(chunk =>
      Object.entries(chunk.modules)
        .filter(([, info]) => info.renderedLength > 0)
        .map(([id]) => id.replaceAll("\\", "/")),
    );
    const unrelatedComponents = modules.filter(
      id => id.includes("/components/") && !id.includes("/components/Divider/"),
    );

    assert(
      chunks.some(chunk => chunk.exports.includes("Divider")),
      `${entrypoint}: Divider export 누락`,
    );
    assert(!code.includes("data:image/png"), `${entrypoint}: 미사용 PNG 포함`);
    assert.deepEqual(unrelatedComponents, [], `${entrypoint}: 미사용 컴포넌트 포함`);
  } finally {
    for (const bundle of bundles) await bundle[Symbol.asyncDispose]();
  }
} finally {
  await rm(directory, { recursive: true, force: true });
}
