import { toTokenFiles } from "./dtcg";
import { syncTokenFiles } from "./github";
import { loadSettings, loadToken, saveSettings, saveToken } from "./settings";
import { readLocalVariables } from "./snapshot";
import type { PluginMessage, SyncSettings, UiMessage } from "../shared/messages";

const REQUIRED_SETTINGS: (keyof SyncSettings)[] = [
  "owner",
  "repo",
  "baseBranch",
  "directory",
  "syncBranch",
  "commitMessage",
];

function postToUi(message: PluginMessage): void {
  figma.ui.postMessage(message);
}

/**
 * 실패 원인을 사용자에게 보여 줄 문구로 바꿉니다.
 *
 * @remarks
 * Figma가 제공하는 API는 `Error`가 아닌 객체로 실패할 수 있어, `message`가 없으면 객체 내용을 그대로 보여 줍니다.
 */
function toErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;

  if (typeof error === "object" && error !== null) {
    const { message } = error as { message?: unknown };

    return typeof message === "string" ? message : JSON.stringify(error);
  }

  return String(error);
}

function reportFailure(error: unknown): void {
  console.error(error);
  postToUi({ type: "failed", message: toErrorMessage(error) });
}

function validateSettings(settings: SyncSettings): void {
  const missing = REQUIRED_SETTINGS.filter(key => !String(settings[key]).trim());

  if (missing.length > 0) {
    throw new Error(`설정을 입력해 주세요: ${missing.join(", ")}`);
  }

  if (settings.collections.length === 0) {
    throw new Error("내보낼 컬렉션을 하나 이상 선택해 주세요.");
  }
}

function toPullRequestBody(settings: SyncSettings): string {
  return [
    `Figma 파일 \`${figma.root.name}\`의 변수를 동기화합니다.`,
    "",
    `- 컬렉션: ${settings.collections.join(", ")}`,
    `- 디렉터리: \`${settings.directory}\``,
    "",
    "Token Sync for GitHub 플러그인이 만든 PR입니다.",
  ].join("\n");
}

async function sync(settings: SyncSettings): Promise<void> {
  validateSettings(settings);
  saveSettings(settings);

  const token = await loadToken();

  if (!token) {
    throw new Error("GitHub 토큰을 먼저 저장해 주세요.");
  }

  postToUi({ type: "progress", message: "Figma 변수를 읽고 있습니다." });

  const files = toTokenFiles(await readLocalVariables(), settings.collections);
  const result = await syncTokenFiles(
    { ...settings, token, pullRequestBody: toPullRequestBody(settings) },
    files,
    message => postToUi({ type: "progress", message }),
  );

  postToUi({ type: "synced", result });
}

/**
 * 저장된 설정과 선택할 수 있는 컬렉션을 UI에 보냅니다.
 *
 * @remarks
 * publish에서 숨긴 컬렉션은 라이브러리 밖으로 나가지 않는 작업용 컬렉션으로 보고 목록에서 뺍니다.
 */
async function init(): Promise<void> {
  const [collections, token] = await Promise.all([
    figma.variables.getLocalVariableCollectionsAsync(),
    loadToken(),
  ]);

  postToUi({
    type: "init",
    settings: loadSettings(),
    collectionNames: collections
      .filter(({ hiddenFromPublishing }) => !hiddenFromPublishing)
      .map(({ name }) => name),
    hasToken: Boolean(token),
  });
}

async function handleUiMessage(message: UiMessage): Promise<void> {
  try {
    if (message.type === "save-token") {
      await saveToken(message.token);
      postToUi({ type: "token-saved" });
    }

    if (message.type === "sync") {
      await sync(message.settings);
    }
  } catch (error) {
    reportFailure(error);
  }
}

figma.showUI(__html__, { width: 400, height: 600, themeColors: true });

figma.ui.onmessage = (message: UiMessage) => {
  void handleUiMessage(message);
};

void init().catch(reportFailure);
