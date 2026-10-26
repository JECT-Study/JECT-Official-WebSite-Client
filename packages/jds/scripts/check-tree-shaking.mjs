import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";

import { build } from "tsdown";

const pkg = JSON.parse(await readFile("package.json", "utf8"));
const directory = await mkdtemp(join(tmpdir(), "jds-tree-shaking-"));
const externalPackages = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.peerDependencies)];
// ESM 소비처의 파일 단위 제거를 검증한다. CJS 실행 호환성은 별도 검사 대상이다.
const entrypoint = pkg.exports["."].import.default;
const distDirectory = dirname(resolve(entrypoint));

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
        .map(([id]) => relative(distDirectory, id).replaceAll("\\", "/")),
    );
    const componentModules = modules.filter(id => id.startsWith("components/"));
    const unrelatedComponents = componentModules.filter(
      id => !id.startsWith("components/Divider/"),
    );

    const problems = [];

    if (!chunks.some(chunk => chunk.exports.includes("Divider"))) {
      problems.push(`${entrypoint}: Divider export가 없습니다. 공개 진입점의 export를 확인하세요.`);
    }
    if (code.includes("data:image/png")) {
      problems.push(
        `${entrypoint}: 미사용 PNG가 포함되어 있습니다. 미사용 모듈의 import 경로를 확인하세요.`,
      );
    }
    if (!componentModules.includes("components/Divider/Divider.js")) {
      problems.push(
        `${entrypoint}: 분리된 Divider 구현 모듈이 없습니다. JS 빌드의 모듈 분리 설정을 확인하세요.`,
      );
    }
    if (unrelatedComponents.length > 0) {
      problems.push(
        `${entrypoint}: 미사용 컴포넌트가 포함되어 있습니다. 모듈 분리와 sideEffects 설정을 확인하세요.`,
      );
      for (const module of unrelatedComponents) problems.push(`  ${module}`);
    }

    if (problems.length > 0) {
      console.error("ESM 트리 셰이킹 검사에서 문제가 발견되었습니다. 아래 안내를 확인하세요.");
      for (const problem of problems) console.error(`  ${problem}`);
      // 즉시 종료하지 않아 아래 finally에서 번들과 임시 디렉터리를 정리할 수 있다.
      process.exitCode = 1;
    }
  } finally {
    for (const bundle of bundles) await bundle[Symbol.asyncDispose]();
  }
} finally {
  await rm(directory, { recursive: true, force: true });
}
