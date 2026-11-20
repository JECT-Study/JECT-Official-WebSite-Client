/** 문서에 저장되는 동기화 설정. 파일을 여는 사람 모두가 같은 설정을 사용합니다. */
export interface SyncSettings {
  owner: string;
  repo: string;
  /** 동기화 PR의 base 브랜치 */
  baseBranch: string;
  /** 토큰 파일을 둘 저장소 안의 디렉터리 */
  directory: string;
  /** 동기화 커밋을 쌓는 브랜치. 열린 PR이 있으면 그 PR에 커밋을 더합니다. */
  syncBranch: string;
  /** 커밋 메시지와 PR 제목 */
  commitMessage: string;
  /** 내보낼 컬렉션 이름 */
  collections: string[];
}

/** 동기화 결과. `unchanged`는 저장소와 내용이 같아 커밋하지 않은 경우입니다. */
export type SyncResult =
  | { status: "unchanged"; pullRequestUrl?: string }
  | { status: "created" | "updated"; pullRequestUrl: string; fileCount: number };

/** 화면 문구와 PR 본문의 언어 */
export type Locale = "ko" | "en";

/** 동기화 진행 단계. UI가 언어에 맞는 문구로 바꿔 보여 줍니다. */
export type ProgressStep =
  | "readingVariables"
  | "checkingRepository"
  | "comparingChanges"
  | "creatingCommit"
  | "creatingPullRequest";

/** 메인 스레드가 보내는 실패 원인. UI가 언어에 맞는 문구로 바꿔 보여 줍니다. */
export type PluginErrorCode =
  | "missingSettings"
  | "noCollections"
  | "noToken"
  | "nonLocalReference"
  | "collectionNotFound"
  | "unsupportedType"
  | "aliasCycle"
  | "composedOpacityAlias"
  | "composedNonOpaque"
  | "unsupportedValue"
  | "pathConflict"
  | "repositoryNotFound"
  | "baseBranchNotFound"
  | "syncBranchSameAsBase"
  | "syncBranchNotOwned"
  | "syncBranchChanged"
  | "githubRequestFailed"
  | "unexpected";

/** 실패 원인과 문구에 넣을 값 */
export interface PluginErrorPayload {
  code: PluginErrorCode;
  params: Record<string, string>;
}

/** UI에서 메인 스레드로 보내는 메시지 */
export type UiMessage =
  | { type: "save-token"; token: string }
  | { type: "sync"; settings: SyncSettings; locale: Locale };

/** 메인 스레드에서 UI로 보내는 메시지 */
export type PluginMessage =
  | { type: "init"; settings: SyncSettings; collectionNames: string[]; hasToken: boolean }
  | { type: "token-saved" }
  | { type: "progress"; step: ProgressStep }
  | { type: "synced"; result: SyncResult }
  | { type: "failed"; error: PluginErrorPayload };
