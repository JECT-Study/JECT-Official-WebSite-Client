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

/** UI에서 메인 스레드로 보내는 메시지 */
export type UiMessage =
  | { type: "save-token"; token: string }
  | { type: "sync"; settings: SyncSettings };

/** 메인 스레드에서 UI로 보내는 메시지 */
export type PluginMessage =
  | { type: "init"; settings: SyncSettings; collectionNames: string[]; hasToken: boolean }
  | { type: "token-saved" }
  | { type: "progress"; message: string }
  | { type: "synced"; result: SyncResult }
  | { type: "failed"; message: string };
