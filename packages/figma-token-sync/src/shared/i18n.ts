import type {
  Locale,
  PluginErrorCode,
  PluginErrorPayload,
  ProgressStep,
  SyncResult,
  SyncSettings,
} from "./messages";

/** 화면에서 입력받는 텍스트 설정 */
export type TextSettingKey = Exclude<keyof SyncSettings, "collections">;

type Params = Record<string, string>;

interface Messages {
  fields: Record<TextSettingKey, { label: string; hint?: string }>;
  legends: { repository: string; collections: string; token: string };
  saveToken: string;
  sync: string;
  noCollections: string;
  tokenSaved: string;
  tokenMissing: string;
  openPullRequest: string;
  starting: string;
  progress: Record<ProgressStep, string>;
  result: (result: SyncResult) => string;
  errors: Record<PluginErrorCode, (params: Params, fieldLabels: string) => string>;
  permissionHints: Record<string, string>;
  failedAt: (message: string, step: string) => string;
  pullRequestBody: (fileName: string, collections: string, directory: string) => string;
}

const MESSAGES: Record<Locale, Messages> = {
  ko: {
    fields: {
      owner: { label: "저장소 소유자", hint: "예: my-org" },
      repo: { label: "저장소 이름" },
      baseBranch: { label: "base 브랜치" },
      directory: { label: "토큰 디렉터리", hint: "저장소 루트 기준 경로" },
      syncBranch: { label: "동기화 브랜치" },
      commitMessage: { label: "커밋 메시지, PR 제목" },
    },
    legends: { repository: "저장소", collections: "컬렉션", token: "GitHub 토큰" },
    saveToken: "저장",
    sync: "Sync",
    noCollections: "이 파일에 로컬 변수 컬렉션이 없습니다.",
    tokenSaved: "저장된 토큰이 있습니다. 바꾸려면 새로 입력해 저장하세요.",
    tokenMissing: "토큰이 없습니다. 입력 후 저장하세요.",
    openPullRequest: " Pull Request 열기",
    starting: "동기화를 시작합니다.",
    progress: {
      readingVariables: "Figma 변수를 읽고 있습니다.",
      checkingRepository: "저장소 상태를 확인하고 있습니다.",
      comparingChanges: "변경 사항을 비교하고 있습니다.",
      creatingCommit: "커밋을 만들고 있습니다.",
      creatingPullRequest: "Pull Request를 만들고 있습니다.",
    },
    result: result => {
      if (result.status === "unchanged") return "저장소와 내용이 같아 커밋하지 않았습니다.";
      if (result.status === "updated")
        return `열린 PR에 파일 ${result.fileCount}개를 커밋했습니다.`;
      return `파일 ${result.fileCount}개를 커밋하고 PR을 만들었습니다.`;
    },
    errors: {
      missingSettings: (_, fieldLabels) => `설정을 입력해 주세요: ${fieldLabels}`,
      noCollections: () => "내보낼 컬렉션을 하나 이상 선택해 주세요.",
      noToken: () => "GitHub 토큰을 먼저 저장해 주세요.",
      nonLocalReference: ({ id }) => `로컬 변수가 아닌 참조는 지원하지 않습니다: ${id}`,
      collectionNotFound: ({ name }) => `컬렉션을 찾을 수 없습니다: ${name}`,
      unsupportedType: ({ type, name }) => `지원하지 않는 변수 타입입니다: ${type} (${name})`,
      aliasCycle: ({ name }) => `변수 참조가 순환합니다: ${name}`,
      composedOpacityAlias: ({ name }) =>
        `불투명도를 변수로 참조하는 합성 색상은 지원하지 않습니다: ${name}`,
      composedNonOpaque: ({ name }) =>
        `불투명한 색상을 참조하지 않는 합성 색상은 지원하지 않습니다: ${name}`,
      unsupportedValue: ({ name }) => `지원하지 않는 변수 값입니다: ${name}`,
      pathConflict: ({ path }) => `토큰과 그룹의 경로가 겹칩니다: ${path}`,
      repositoryNotFound: ({ repository }) =>
        `저장소를 찾을 수 없습니다: ${repository}. 저장소 소유자와 이름, 토큰의 저장소 접근 범위를 확인해 주세요.`,
      baseBranchNotFound: ({ branch }) => `base 브랜치를 찾을 수 없습니다: ${branch}`,
      syncBranchSameAsBase: () => "동기화 브랜치는 base 브랜치와 다른 이름이어야 합니다.",
      syncBranchNotOwned: ({ branch }) =>
        `동기화 PR을 연 적이 없는 브랜치라 덮어쓰지 않았습니다: ${branch}. 동기화 브랜치 이름을 바꾸거나 기존 브랜치를 지워 주세요.`,
      githubRequestFailed: ({ status, method, path, detail }) =>
        `GitHub 요청이 실패했습니다 (${status} ${method} ${path}): ${detail}`,
      unexpected: ({ message }) => message,
    },
    permissionHints: {
      unauthorized: "토큰이 만료되었거나 올바르지 않습니다. 토큰을 새로 저장해 주세요.",
      forbidden:
        "토큰의 저장소 접근 범위에 이 저장소가 있는지, Contents와 Pull requests 권한이 Read and write인지 확인해 주세요.",
    },
    failedAt: (message, step) => `${message} (진행 단계: ${step})`,
    pullRequestBody: (fileName, collections, directory) =>
      [
        `Figma 파일 \`${fileName}\`의 변수를 동기화합니다.`,
        "",
        `- 컬렉션: ${collections}`,
        `- 디렉터리: \`${directory}\``,
        "",
        "Variables to GitHub 플러그인이 만든 PR입니다.",
      ].join("\n"),
  },
  en: {
    fields: {
      owner: { label: "Repository owner", hint: "e.g. my-org" },
      repo: { label: "Repository name" },
      baseBranch: { label: "Base branch" },
      directory: { label: "Token directory", hint: "path from the repository root" },
      syncBranch: { label: "Sync branch" },
      commitMessage: { label: "Commit message and PR title" },
    },
    legends: { repository: "Repository", collections: "Collections", token: "GitHub token" },
    saveToken: "Save",
    sync: "Sync",
    noCollections: "This file has no local variable collections.",
    tokenSaved: "A token is saved. Enter a new one and save to replace it.",
    tokenMissing: "No token saved. Enter one and save it.",
    openPullRequest: " Open pull request",
    starting: "Starting sync.",
    progress: {
      readingVariables: "Reading Figma variables.",
      checkingRepository: "Checking the repository.",
      comparingChanges: "Comparing changes.",
      creatingCommit: "Creating a commit.",
      creatingPullRequest: "Creating a pull request.",
    },
    result: result => {
      if (result.status === "unchanged") {
        return "Nothing to commit. The repository is already up to date.";
      }
      if (result.status === "updated") {
        return `Committed ${result.fileCount} files to the open pull request.`;
      }
      return `Committed ${result.fileCount} files and opened a pull request.`;
    },
    errors: {
      missingSettings: (_, fieldLabels) => `Fill in these settings: ${fieldLabels}`,
      noCollections: () => "Select at least one collection to export.",
      noToken: () => "Save a GitHub token first.",
      nonLocalReference: ({ id }) => `References to non-local variables are not supported: ${id}`,
      collectionNotFound: ({ name }) => `Collection not found: ${name}`,
      unsupportedType: ({ type, name }) => `Unsupported variable type: ${type} (${name})`,
      aliasCycle: ({ name }) => `Variable references form a cycle: ${name}`,
      composedOpacityAlias: ({ name }) =>
        `Composed colors with an opacity variable are not supported: ${name}`,
      composedNonOpaque: ({ name }) => `Composed colors must reference an opaque color: ${name}`,
      unsupportedValue: ({ name }) => `Unsupported variable value: ${name}`,
      pathConflict: ({ path }) => `A token and a group share the same path: ${path}`,
      repositoryNotFound: ({ repository }) =>
        `Repository not found: ${repository}. Check the repository owner and name, and that the token can access this repository.`,
      baseBranchNotFound: ({ branch }) => `Base branch not found: ${branch}`,
      syncBranchSameAsBase: () => "The sync branch must differ from the base branch.",
      syncBranchNotOwned: ({ branch }) =>
        `The branch was not overwritten because no sync pull request was ever opened from it: ${branch}. Rename the sync branch or delete the existing branch.`,
      githubRequestFailed: ({ status, method, path, detail }) =>
        `GitHub request failed (${status} ${method} ${path}): ${detail}`,
      unexpected: ({ message }) => message,
    },
    permissionHints: {
      unauthorized: "The token is expired or invalid. Save a new token.",
      forbidden:
        "Check that the token can access this repository and has Read and write access to Contents and Pull requests.",
    },
    failedAt: (message, step) => `${message} (step: ${step})`,
    pullRequestBody: (fileName, collections, directory) =>
      [
        `Syncs variables from the Figma file \`${fileName}\`.`,
        "",
        `- Collections: ${collections}`,
        `- Directory: \`${directory}\``,
        "",
        "Opened by the Variables to GitHub plugin.",
      ].join("\n"),
  },
};

/** 언어 태그(`ko-KR`, `en-US` 등)를 지원하는 언어로 바꿉니다. 한국어가 아니면 영어입니다. */
export function resolveLocale(language: string): Locale {
  return language.toLowerCase().startsWith("ko") ? "ko" : "en";
}

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale];
}

/**
 * 실패 원인을 화면에 보여 줄 문구로 바꿉니다.
 *
 * @remarks
 * `missingSettings`는 설정 키 대신 화면의 필드 이름을, `githubRequestFailed`는 권한 문제일 때 해결 방법을 함께 보여 줍니다.
 */
export function formatError(locale: Locale, { code, params }: PluginErrorPayload): string {
  const messages = MESSAGES[locale];
  const fieldLabels = (params.fields ?? "")
    .split(",")
    .filter(Boolean)
    .map(key => messages.fields[key as TextSettingKey]?.label ?? key)
    .join(", ");
  const message = messages.errors[code](params, fieldLabels);
  const hint = params.hint ? messages.permissionHints[params.hint] : undefined;

  return hint ? `${message}\n${hint}` : message;
}
