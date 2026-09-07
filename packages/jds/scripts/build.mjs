import { spawn } from "node:child_process";
import { globSync, renameSync } from "node:fs";
import { rm } from "node:fs/promises";
import { basename, join } from "node:path";

const DTS_OUT_DIR = "dist-types";

const run = args =>
  new Promise((resolve, reject) => {
    const child = spawn("tsdown", args, { stdio: "inherit", shell: process.platform === "win32" });
    child.on("error", reject);
    child.on("exit", code =>
      code === 0 ? resolve() : reject(new Error(`tsdown ${args.join(" ")} exited with ${code}`)),
    );
  });

const results = await Promise.allSettled([
  run(["--config", "tsdown.config.ts"]),
  run(["--config", "tsdown.dts.config.ts"]),
]);

const failed = results.filter(result => result.status === "rejected");

if (failed.length > 0) {
  for (const { reason } of failed) console.error(reason.message);
  process.exit(1);
}

for (const file of globSync(`${DTS_OUT_DIR}/*.d.{ts,cts}{,.map}`)) {
  renameSync(file, join("dist", basename(file)));
}

await rm(DTS_OUT_DIR, { recursive: true, force: true });

await import("./check-dts.mjs");
await import("./check-package.mjs");
