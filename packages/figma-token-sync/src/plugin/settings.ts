import type { SyncSettings } from "../shared/messages";

const PLUGIN_DATA_NAMESPACE = "token_sync";
const SETTINGS_KEY = "settings";
const TOKEN_KEY = "githubToken";

const DEFAULT_SETTINGS: SyncSettings = {
  owner: "",
  repo: "",
  baseBranch: "main",
  directory: "tokens",
  syncBranch: "figma-token-sync",
  commitMessage: "chore(tokens): Figma 변수 동기화",
  collections: [],
};

/** 문서에 저장된 설정을 읽습니다. 저장된 적이 없으면 기본값을 돌려줍니다. */
export function loadSettings(): SyncSettings {
  const saved = figma.root.getSharedPluginData(PLUGIN_DATA_NAMESPACE, SETTINGS_KEY);

  if (!saved) return DEFAULT_SETTINGS;

  return { ...DEFAULT_SETTINGS, ...(JSON.parse(saved) as Partial<SyncSettings>) };
}

/**
 * 설정을 문서에 저장합니다.
 *
 * @remarks
 * 문서를 수정하므로 편집 권한이 있어야 합니다. 같은 파일을 여는 다른 사람도 이 설정을 그대로 사용합니다.
 */
export function saveSettings(settings: SyncSettings): void {
  figma.root.setSharedPluginData(PLUGIN_DATA_NAMESPACE, SETTINGS_KEY, JSON.stringify(settings));
}

/**
 * GitHub 토큰을 읽습니다.
 *
 * @remarks
 * 토큰은 문서가 아니라 실행한 사람의 Figma 클라이언트에만 저장되어, 다른 사람에게 공유되지 않습니다.
 */
export async function loadToken(): Promise<string | undefined> {
  return (await figma.clientStorage.getAsync(TOKEN_KEY)) as string | undefined;
}

export async function saveToken(token: string): Promise<void> {
  await figma.clientStorage.setAsync(TOKEN_KEY, token);
}
