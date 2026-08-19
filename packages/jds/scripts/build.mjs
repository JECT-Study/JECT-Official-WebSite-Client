import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";

const run = args =>
  new Promise((resolve, reject) => {
    const child = spawn("tsdown", args, { stdio: "inherit", shell: process.platform === "win32" });
    child.on("error", reject);
    child.on("exit", code =>
      code === 0 ? resolve() : reject(new Error(`tsdown ${args.join(" ")} exited with ${code}`)),
    );
  });

await rm("dist", { recursive: true, force: true });

const results = await Promise.allSettled([
  run(["--config", "tsdown.config.ts"]),
  run(["--config", "tsdown.dts.config.ts"]),
]);

const failed = results.filter(result => result.status === "rejected");

if (failed.length > 0) {
  for (const { reason } of failed) console.error(reason.message);
  process.exit(1);
}

await import("./check-dts.mjs");
