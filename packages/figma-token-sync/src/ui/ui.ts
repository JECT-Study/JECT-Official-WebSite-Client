import type { PluginMessage, SyncResult, SyncSettings, UiMessage } from "../shared/messages";

type TextSettingKey = Exclude<keyof SyncSettings, "collections">;

const TEXT_FIELDS: { key: TextSettingKey; label: string; hint?: string }[] = [
  { key: "owner", label: "저장소 소유자", hint: "예: my-org" },
  { key: "repo", label: "저장소 이름" },
  { key: "baseBranch", label: "base 브랜치" },
  { key: "directory", label: "토큰 디렉터리", hint: "저장소 루트 기준 경로" },
  { key: "syncBranch", label: "동기화 브랜치" },
  { key: "commitMessage", label: "커밋 메시지, PR 제목" },
];

const TEMPLATE = `
  <form id="sync-form">
    <fieldset>
      <legend>저장소</legend>
      <div id="text-fields"></div>
    </fieldset>
    <fieldset>
      <legend>컬렉션</legend>
      <div id="collections"></div>
    </fieldset>
    <fieldset>
      <legend>GitHub 토큰</legend>
      <div class="row">
        <label>
          <span class="hint" id="token-state"></span>
          <input type="password" id="token" autocomplete="off" />
        </label>
        <button type="button" id="save-token">저장</button>
      </div>
    </fieldset>
    <button type="submit" id="sync">Sync</button>
    <p class="status" id="status" role="status"></p>
  </form>
`;

function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`UI 요소를 찾을 수 없습니다: #${id}`);
  }

  return element as T;
}

function postToPlugin(message: UiMessage): void {
  parent.postMessage({ pluginMessage: message }, "*");
}

function renderTextFields(settings: SyncSettings): void {
  const container = getElement("text-fields");

  for (const { key, label, hint } of TEXT_FIELDS) {
    const field = document.createElement("label");
    const title = document.createElement("span");
    const input = document.createElement("input");

    title.textContent = hint ? `${label} (${hint})` : label;
    input.type = "text";
    input.name = key;
    input.value = settings[key];
    field.append(title, input);
    container.append(field);
  }
}

function renderCollections(collectionNames: string[], selected: string[]): void {
  const container = getElement("collections");

  if (collectionNames.length === 0) {
    container.textContent = "이 파일에 로컬 변수 컬렉션이 없습니다.";
    return;
  }

  for (const name of collectionNames) {
    const field = document.createElement("label");
    const checkbox = document.createElement("input");

    field.className = "checkbox";
    checkbox.type = "checkbox";
    checkbox.name = "collections";
    checkbox.value = name;
    checkbox.checked = selected.includes(name);
    field.append(checkbox, name);
    container.append(field);
  }
}

function renderTokenState(hasToken: boolean): void {
  getElement("token-state").textContent = hasToken
    ? "저장된 토큰이 있습니다. 바꾸려면 새로 입력해 저장하세요."
    : "토큰이 없습니다. 입력 후 저장하세요.";
}

function setStatus(state: "progress" | "synced" | "failed", text: string, linkUrl?: string): void {
  const status = getElement("status");

  status.dataset.state = state;
  status.textContent = text;

  if (linkUrl) {
    const link = document.createElement("a");

    link.href = linkUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = " Pull Request 열기";
    status.append(link);
  }

  getElement<HTMLButtonElement>("sync").disabled = state === "progress";
}

function describeResult(result: SyncResult): string {
  if (result.status === "unchanged") return "저장소와 내용이 같아 커밋하지 않았습니다.";
  if (result.status === "updated") return `열린 PR에 파일 ${result.fileCount}개를 커밋했습니다.`;
  return `파일 ${result.fileCount}개를 커밋하고 PR을 만들었습니다.`;
}

function readSettings(form: HTMLFormElement): SyncSettings {
  const data = new FormData(form);
  const text = (key: TextSettingKey) => {
    const value = data.get(key);

    return typeof value === "string" ? value.trim() : "";
  };

  return {
    owner: text("owner"),
    repo: text("repo"),
    baseBranch: text("baseBranch"),
    directory: text("directory"),
    syncBranch: text("syncBranch"),
    commitMessage: text("commitMessage"),
    collections: data.getAll("collections").map(String),
  };
}

function bindEvents(): void {
  const form = getElement<HTMLFormElement>("sync-form");
  const tokenInput = getElement<HTMLInputElement>("token");

  getElement("save-token").addEventListener("click", () => {
    const token = tokenInput.value.trim();

    if (!token) return;

    postToPlugin({ type: "save-token", token });
    tokenInput.value = "";
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    setStatus("progress", "동기화를 시작합니다.");
    postToPlugin({ type: "sync", settings: readSettings(form) });
  });
}

/** 실패했을 때 어느 단계였는지 함께 보여 주기 위한 마지막 진행 문구 */
let lastProgress = "";

function handlePluginMessage(message: PluginMessage): void {
  if (message.type === "init") {
    renderTextFields(message.settings);
    renderCollections(message.collectionNames, message.settings.collections);
    renderTokenState(message.hasToken);
  }

  if (message.type === "token-saved") renderTokenState(true);

  if (message.type === "progress") {
    lastProgress = message.message;
    setStatus("progress", message.message);
  }

  if (message.type === "synced") {
    lastProgress = "";
    setStatus("synced", describeResult(message.result), message.result.pullRequestUrl);
  }

  if (message.type === "failed") {
    setStatus(
      "failed",
      lastProgress ? `${message.message} (진행 단계: ${lastProgress})` : message.message,
    );
    lastProgress = "";
  }
}

getElement("app").innerHTML = TEMPLATE;
bindEvents();

window.addEventListener("message", (event: MessageEvent<{ pluginMessage?: PluginMessage }>) => {
  if (event.data.pluginMessage) handlePluginMessage(event.data.pluginMessage);
});
