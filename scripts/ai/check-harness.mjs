import assert from "node:assert/strict";
import { readFile, readdir, realpath, lstat, readlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// File wiring only. This does not execute skills or judge component quality.
const root = await realpath(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.."));
const manifest = JSON.parse(await readFile(path.join(root, "scripts/ai/manifest.json"), "utf8"));
const files = new Set(["AGENTS.md", "CLAUDE.md"]);
const roleContract = ".claude/skills/ject-jds-workflow/references/roles.md";

async function insideRoot(target) {
  const resolved = await realpath(target);
  const relative = path.relative(root, resolved);
  assert(
    relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative),
    `Outside repository: ${target}`,
  );
  return resolved;
}

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    await insideRoot(target);
    if (entry.isDirectory()) await collect(target);
    else if (entry.name.endsWith(".md")) files.add(path.relative(root, target));
  }
}

await collect(path.join(root, "docs/ai"));

for (const key of ["skills", "roles"]) {
  assert(Array.isArray(manifest[key]) && manifest[key].length, `Missing ${key}`);
  assert.equal(new Set(manifest[key]).size, manifest[key].length, `Duplicate ${key}`);
  for (const name of manifest[key])
    assert(/^ject-jds-[a-z-]+$/.test(name), `Invalid name: ${name}`);
}

for (const name of manifest.skills) {
  const source = path.join(root, ".claude/skills", name);
  await insideRoot(source);
  const entrypoint = path.join(source, "SKILL.md");
  const text = await readFile(entrypoint, "utf8");
  const metadata = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
  assert(metadata, `Missing frontmatter: ${name}`);
  assert.equal(metadata.match(/^name:\s*(\S+)\s*$/m)?.[1], name, `Skill name mismatch: ${name}`);
  assert(metadata.match(/^description:\s*\S.+$/m), `Missing description: ${name}`);
  const alias = path.join(root, ".agents/skills", name);
  assert((await lstat(alias)).isSymbolicLink(), `Expected repository-relative skill link: ${name}`);
  assert(!path.isAbsolute(await readlink(alias)), `Absolute skill link: ${name}`);
  assert.equal(await insideRoot(alias), await insideRoot(source), `Alias mismatch: ${name}`);
  await collect(source);
}

for (const name of manifest.roles) {
  const claude = `.claude/agents/${name}.md`;
  const codex = `.codex/agents/${name}.toml`;
  const claudeText = await readFile(path.join(root, claude), "utf8");
  assert(claudeText.includes(`name: ${name}\n`), `Claude role name mismatch: ${name}`);
  assert(claudeText.includes("disallowedTools: Write, Edit"), `Missing review boundary: ${name}`);
  const codexText = await readFile(path.join(root, codex), "utf8");
  for (const field of ["name", "description", "developer_instructions"]) {
    const value = codexText.match(new RegExp(`^${field} = (.+)$`, "m"))?.[1];
    // These adapters deliberately use single-line quoted strings, a TOML subset.
    assert(
      value && typeof JSON.parse(value) === "string" && JSON.parse(value).trim(),
      `Invalid ${field}: ${codex}`,
    );
  }
  assert.equal(JSON.parse(codexText.match(/^name = (.+)$/m)[1]), name);
  assert(
    claudeText.includes(roleContract) && codexText.includes(roleContract),
    `Missing shared role contract: ${name}`,
  );
  files.add(claude);
  files.add(codex);
}

for (const relative of files) {
  const file = path.join(root, relative);
  await insideRoot(file);
  const text = await readFile(file, "utf8");
  assert(
    !/(?:\/Users\/|\/home\/|[A-Z]:\\Users\\|~\/\.agents\/|~\/\.codex\/)/.test(text),
    `Personal path: ${relative}`,
  );
  const prose = text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, "");
  for (const match of prose.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const link = match[1].replace(/^<|>$/g, "");
    if (/^(?:https?:|mailto:|#)/.test(link)) continue;
    const location = decodeURIComponent(link.split("#")[0]);
    if (!location) continue;
    assert(!path.isAbsolute(location), `Absolute local link: ${relative}: ${link}`);
    await insideRoot(path.resolve(path.dirname(file), location));
  }
}

console.log(
  `Checked ${manifest.skills.length} shared skills, ${manifest.roles.length} roles in each runtime, and ${files.size} instruction files.`,
);
console.log(
  "Repository-local links and limited metadata checks passed. Runtime discovery, tool permissions and product quality were not tested.",
);
