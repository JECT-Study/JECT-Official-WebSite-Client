import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import * as attw from "@arethetypeswrong/core";
import { publint } from "publint";
import { formatMessage } from "publint/utils";

// `exports`를 읽지 않는 해석 방식이라 하위 경로를 찾지 못함
const IGNORED_RESOLUTIONS = ["node10"];
// CSS 파일이라 타입 선언이 없음
const IGNORED_ENTRYPOINTS = ["./styles"];

const packDir = mkdtempSync(join(tmpdir(), "jds-pack-"));
const [{ filename }] = JSON.parse(
  execFileSync("npm", ["pack", "--json", "--pack-destination", packDir], { encoding: "utf8" }),
);
const tarball = readFileSync(join(packDir, filename));

rmSync(packDir, { recursive: true, force: true });

const problems = [];
const suggestions = [];

const { messages, pkg } = await publint({ pack: { tarball: tarball.buffer } });

for (const message of messages) {
  const formatted = formatMessage(message, pkg);
  if (message.type === "suggestion") suggestions.push(formatted);
  else problems.push(formatted);
}

const result = await attw.checkPackage(attw.createPackageFromTarballData(new Uint8Array(tarball)));

if (!result.types) problems.push("타입 선언이 포함되지 않았습니다.");

for (const problem of result.problems ?? []) {
  if (IGNORED_RESOLUTIONS.includes(problem.resolutionKind)) continue;
  if (IGNORED_ENTRYPOINTS.includes(problem.entrypoint)) continue;

  const entrypoint = problem.entrypoint ? ` ${problem.entrypoint}` : "";
  const resolution = problem.resolutionKind ? ` (${problem.resolutionKind})` : "";
  problems.push(`${problem.kind}${entrypoint}${resolution}`);
}

if (suggestions.length > 0) {
  console.info("배포 패키지 검사에서 다음 제안이 있습니다.");
  for (const suggestion of suggestions) console.info(`  ${suggestion}`);
}

if (problems.length > 0) {
  console.error("배포 패키지 검사에서 문제가 발견되었습니다. exports와 산출물을 확인하세요.");
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
