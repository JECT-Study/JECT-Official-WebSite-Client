import { toTokenFiles } from "./dtcg";
import { PluginError } from "./errors";
import { syncTokenFiles } from "./github";
import { loadSettings, loadToken, saveSettings, saveToken } from "./settings";
import { readLocalVariables } from "./snapshot";
import { getMessages } from "../shared/i18n";
import type {
  Locale,
  PluginErrorPayload,
  PluginMessage,
  SyncSettings,
  UiMessage,
} from "../shared/messages";

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
 * 실패 원인을 UI로 보낼 값으로 바꿉니다.
 *
 * @remarks
 * {@link PluginError}가 아닌 실패는 원문을 그대로 보여 줍니다. Figma가 제공하는 API는 `Error`가 아닌 객체로 실패할 수 있어, `message`가 없으면 객체 내용을 보여 줍니다.
 */
function toErrorPayload(error: unknown): PluginErrorPayload {
  if (error instanceof PluginError) return { code: error.code, params: error.params };

  if (error instanceof Error) return { code: "unexpected", params: { message: error.message } };

  if (typeof error === "object" && error !== null) {
    const { message } = error as { message?: unknown };

    return {
      code: "unexpected",
      params: { message: typeof message === "string" ? message : JSON.stringify(error) },
    };
  }

  return { code: "unexpected", params: { message: String(error) } };
}

function reportFailure(error: unknown): void {
  console.error(error);
  postToUi({ type: "failed", error: toErrorPayload(error) });
}

function validateSettings(settings: SyncSettings): void {
  const missing = REQUIRED_SETTINGS.filter(key => !String(settings[key]).trim());

  if (missing.length > 0) {
    throw new PluginError("missingSettings", { fields: missing.join(",") });
  }

  if (settings.collections.length === 0) {
    throw new PluginError("noCollections");
  }

  if (settings.syncBranch.trim() === settings.baseBranch.trim()) {
    throw new PluginError("syncBranchSameAsBase");
  }
}

function toPullRequestBody(settings: SyncSettings, locale: Locale): string {
  return getMessages(locale).pullRequestBody(
    figma.root.name,
    settings.collections.join(", "),
    settings.directory,
  );
}

async function sync(settings: SyncSettings, locale: Locale): Promise<void> {
  validateSettings(settings);
  saveSettings(settings);

  const token = await loadToken();

  if (!token) {
    throw new PluginError("noToken");
  }

  postToUi({ type: "progress", step: "readingVariables" });

  const files = toTokenFiles(await readLocalVariables(), settings.collections);
  const result = await syncTokenFiles(
    { ...settings, token, pullRequestBody: toPullRequestBody(settings, locale) },
    files,
    step => postToUi({ type: "progress", step }),
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
      await sync(message.settings, message.locale);
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
