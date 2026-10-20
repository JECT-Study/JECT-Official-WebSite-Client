import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";

const TOKENS_DIR = "packages/jds/src/tokens";
const VARS_FILE = `${TOKENS_DIR}/vars.css.ts`;
const GLOBAL_TOKENS_FILE = `${TOKENS_DIR}/globalTokens.css.ts`;
const TEXT_STYLES_FILE = `${TOKENS_DIR}/textStyles.ts`;
const COMMENT_MARKER = "<!-- token-contract-diff -->";
const IDENTIFIER_PATTERN = /^[A-Za-z_$][\w$]*$/;
const ASSIGNMENT_PATTERN = /^\s+\[vars((?:\.[A-Za-z_$][\w$]*|\["[^"]+"\])+)\]: (.+),$/;
const PATH_SEGMENT_PATTERN = /\.([A-Za-z_$][\w$]*)|\["([^"]+)"\]/g;
const SCOPE_LABELS = {
  ":root": "기본",
  "screen and (min-width: 768px) and (max-width: 1199px)": "tablet",
  "screen and (min-width: 320px) and (max-width: 767px)": "mobile",
  '[data-theme="dark"]': "dark",
};

const { values: args } = parseArgs({
  options: {
    base: { type: "string" },
    changeset: { type: "string" },
    comment: { type: "string" },
    force: { type: "boolean", default: false },
  },
});

if (!args.base || !args.changeset) {
  console.error(
    "사용법: node packages/jds/scripts/token-contract-diff.mjs --base <ref> --changeset <path> [--comment <path>] [--force]",
  );
  process.exit(1);
}

function readAtBase(path) {
  return execFileSync("git", ["show", `${args.base}:${path}`], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

function readAtHead(path) {
  return readFileSync(path, "utf8");
}

function toAccessor(root, segments) {
  return segments.reduce((accessor, segment) => {
    return IDENTIFIER_PATTERN.test(segment)
      ? `${accessor}.${segment}`
      : `${accessor}["${segment}"]`;
  }, root);
}

function sliceObjectLiteral(source, startMarker, endMarker) {
  const start = source.indexOf("{", source.indexOf(startMarker));
  const end = source.lastIndexOf(endMarker);

  if (start === -1 || end === -1) {
    throw new Error(`생성물 형식을 해석할 수 없습니다: ${startMarker}`);
  }

  return JSON.parse(source.slice(start, end + 1));
}

function collectLeafPaths(node, isLeaf, path = [], paths = []) {
  for (const [key, child] of Object.entries(node)) {
    if (isLeaf(child)) {
      paths.push([...path, key]);
    } else {
      collectLeafPaths(child, isLeaf, [...path, key], paths);
    }
  }

  return paths;
}

function readVarsKeys(source) {
  const contract = sliceObjectLiteral(source, "createGlobalThemeContract(", "},\n  (_, path)");

  return new Set(
    collectLeafPaths(contract, child => child === null).map(path => toAccessor("vars", path)),
  );
}

function readTextStyleKeys(source) {
  const textStyles = sliceObjectLiteral(source, "export const textStyles", "} satisfies");

  return new Set(
    collectLeafPaths(textStyles, child => "fontSize" in child).map(path => {
      return toAccessor("textStyles", path);
    }),
  );
}

/** `globalTokens.css.ts`를 `{ 토큰: { 적용 구간: 값 } }`으로 읽습니다. */
function readValues(source) {
  const values = new Map();
  let scope = null;

  for (const line of source.split("\n")) {
    const scopeKey = Object.keys(SCOPE_LABELS).find(key => line.includes(JSON.stringify(key)));
    const darkScope = line.startsWith(`globalStyle('[data-theme="dark"]'`);

    if (darkScope) {
      scope = SCOPE_LABELS['[data-theme="dark"]'];
    } else if (scopeKey) {
      scope = SCOPE_LABELS[scopeKey];
    }

    const match = ASSIGNMENT_PATTERN.exec(line);

    if (!match) continue;

    const segments = [...match[1].matchAll(PATH_SEGMENT_PATTERN)].map(([, name, quoted]) => {
      return name ?? quoted;
    });
    const key = toAccessor("vars", segments);

    if (!values.has(key)) values.set(key, new Map());
    values.get(key).set(scope, JSON.parse(match[2]));
  }

  return values;
}

function difference(left, right) {
  return [...left].filter(key => !right.has(key)).sort();
}

function formatValue(value) {
  return value === undefined ? "없음" : `\`${String(value).replaceAll("|", "\\|")}\``;
}

/** 같은 토큰에서 이전 값과 새 값이 같은 구간을 한 행으로 묶습니다. */
function diffValues(baseValues, headValues, headKeys) {
  const rows = [];

  for (const [key, headScopes] of headValues) {
    if (!headKeys.has(key)) continue;

    const baseScopes = baseValues.get(key);

    if (!baseScopes) continue;

    const scopes = new Set([...baseScopes.keys(), ...headScopes.keys()]);
    const groups = new Map();

    for (const scope of scopes) {
      const before = baseScopes.get(scope);
      const after = headScopes.get(scope);

      if (before === after) continue;

      const groupKey = JSON.stringify([before, after]);

      if (!groups.has(groupKey)) groups.set(groupKey, { before, after, scopes: [] });
      groups.get(groupKey).scopes.push(scope);
    }

    for (const { before, after, scopes: changedScopes } of groups.values()) {
      rows.push({
        key,
        scope: changedScopes.length === scopes.size ? "전체" : changedScopes.join(", "),
        before,
        after,
      });
    }
  }

  return rows;
}

function describeAddedValue(key, headValues) {
  const scopes = headValues.get(key);

  if (!scopes) return `- \`${key}\``;

  const values = [...new Set(scopes.values())];

  if (values.length === 1) return `- \`${key}\` — 값 ${formatValue(values[0])}`;

  const perScope = [...scopes].map(([scope, value]) => `${scope} ${formatValue(value)}`);

  return `- \`${key}\` — 값 ${perScope.join(", ")}`;
}

function toSummary({ changedKeyCount, addedCount, removedCount }) {
  const clauses = [
    changedKeyCount > 0 && [
      `토큰 값 ${changedKeyCount}개가 바뀌고`,
      `토큰 값 ${changedKeyCount}개가 바뀝니다`,
    ],
    addedCount > 0 && [`토큰 ${addedCount}개가 추가되고`, `토큰 ${addedCount}개가 추가됩니다`],
    removedCount > 0 && [
      `토큰 ${removedCount}개가 제거되고`,
      `토큰 ${removedCount}개가 제거됩니다`,
    ],
  ].filter(Boolean);
  const sentence = clauses
    .map(([connected, final], index) => (index === clauses.length - 1 ? final : connected))
    .join(", ");
  const impact =
    removedCount > 0
      ? "제거된 토큰을 참조하는 코드는 수정해야 합니다."
      : "소비처 코드는 수정하지 않아도 됩니다.";

  return `${sentence}. ${impact}`;
}

function toChangeset({ bump, summary, added, removed, rows, headValues }) {
  const sections = [`---\n"@jects/jds": ${bump}\n---`, "**디자인 토큰**", summary];

  if (removed.length > 0) {
    sections.push(
      "**소비처 영향 (코드 수정 필요)**",
      [
        "| AS-IS | TO-BE |",
        "| ----- | ----- |",
        ...removed.map(key => `| \`${key}\` | 제거 |`),
      ].join("\n"),
      ["```diff", ...removed.map(key => `- ${key}`), "```"].join("\n"),
    );
  }

  if (added.length > 0) {
    sections.push("**추가**", added.map(key => describeAddedValue(key, headValues)).join("\n"));
  }

  if (rows.length > 0) {
    sections.push(
      "**동작 변경 (코드 수정 불필요)**",
      [
        "| 토큰 | 적용 구간 | 이전 값 | 새 값 |",
        "| ---- | --------- | ------- | ----- |",
        ...rows.map(({ key, scope, before, after }) => {
          return `| \`${key}\` | ${scope} | ${formatValue(before)} | ${formatValue(after)} |`;
        }),
      ].join("\n"),
    );
  }

  return `${sections.join("\n\n")}\n`;
}

function toComment({ bump, changesetPath, varsAdded, varsRemoved, textAdded, textRemoved, rows }) {
  const removed = [...varsRemoved, ...textRemoved];
  const lines = [COMMENT_MARKER, "## 토큰 계약 변경", ""];

  if (bump === null) {
    lines.push("base 대비 토큰 계약과 값의 변경이 없습니다. 체인지셋을 만들지 않습니다.");
    return `${lines.join("\n")}\n`;
  }

  if (removed.length > 0) {
    lines.push(
      "> [!WARNING]",
      `> 제거된 토큰이 ${removed.length}개 있어 체인지셋을 \`minor\`로 작성했습니다. 소비처 코드가 깨질 수 있으니, 개발자와 논의한 변경인지 확인해 주세요.`,
      "",
    );
  }

  lines.push(
    "| 대상 | 추가 | 제거 | 값 변경 |",
    "| ---- | ---- | ---- | ------- |",
    `| \`vars\` | ${varsAdded.length} | ${varsRemoved.length} | ${new Set(rows.map(({ key }) => key)).size} |`,
    `| \`textStyles\` | ${textAdded.length} | ${textRemoved.length} | - |`,
    "",
    `체인지셋: \`${changesetPath}\` (\`${bump}\`)`,
  );

  if (removed.length > 0) {
    lines.push(
      "",
      "<details><summary>제거된 토큰</summary>",
      "",
      ...removed.map(key => `- \`${key}\``),
      "",
      "</details>",
    );
  }

  return `${lines.join("\n")}\n`;
}

const baseVarsKeys = readVarsKeys(readAtBase(VARS_FILE));
const headVarsKeys = readVarsKeys(readAtHead(VARS_FILE));
const baseTextKeys = readTextStyleKeys(readAtBase(TEXT_STYLES_FILE));
const headTextKeys = readTextStyleKeys(readAtHead(TEXT_STYLES_FILE));
const baseValues = readValues(readAtBase(GLOBAL_TOKENS_FILE));
const headValues = readValues(readAtHead(GLOBAL_TOKENS_FILE));

const varsAdded = difference(headVarsKeys, baseVarsKeys);
const varsRemoved = difference(baseVarsKeys, headVarsKeys);
const textAdded = difference(headTextKeys, baseTextKeys);
const textRemoved = difference(baseTextKeys, headTextKeys);
const rows = diffValues(baseValues, headValues, baseVarsKeys);
const added = [...varsAdded, ...textAdded];
const removed = [...varsRemoved, ...textRemoved];
const hasChanges = added.length + removed.length + rows.length > 0;
const bump = hasChanges ? (removed.length > 0 ? "minor" : "patch") : null;

if (!hasChanges) {
  if (existsSync(args.changeset)) rmSync(args.changeset);
  console.log("토큰 계약과 값의 변경이 없습니다.");
} else if (args.force || !existsSync(args.changeset)) {
  const summary = toSummary({
    changedKeyCount: new Set(rows.map(({ key }) => key)).size,
    addedCount: added.length,
    removedCount: removed.length,
  });

  writeFileSync(args.changeset, toChangeset({ bump, summary, added, removed, rows, headValues }));
  console.log(`체인지셋을 작성했습니다: ${args.changeset} (${bump})`);
} else {
  console.log(`생성물이 바뀌지 않아 기존 체인지셋을 유지합니다: ${args.changeset}`);
}

if (args.comment) {
  writeFileSync(
    args.comment,
    toComment({
      bump,
      changesetPath: args.changeset,
      varsAdded,
      varsRemoved,
      textAdded,
      textRemoved,
      rows,
    }),
  );
}
