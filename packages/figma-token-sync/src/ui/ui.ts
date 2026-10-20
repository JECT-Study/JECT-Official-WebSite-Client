import { formatError, getMessages, resolveLocale } from "../shared/i18n";
import type { TextSettingKey } from "../shared/i18n";
import type { PluginMessage, SyncSettings, UiMessage } from "../shared/messages";

const TEXT_SETTING_KEYS: TextSettingKey[] = [
  "owner",
  "repo",
  "baseBranch",
  "directory",
  "syncBranch",
  "commitMessage",
];

const locale = resolveLocale(navigator.language);
const messages = getMessages(locale);

const TEMPLATE = `
  <form id="sync-form">
    <fieldset>
      <legend>${messages.legends.repository}</legend>
      <div id="text-fields"></div>
    </fieldset>
    <fieldset>
      <legend>${messages.legends.collections}</legend>
      <div id="collections"></div>
    </fieldset>
    <fieldset>
      <legend>${messages.legends.token}</legend>
      <div class="row">
        <label>
          <span class="hint" id="token-state"></span>
          <input type="password" id="token" autocomplete="off" />
        </label>
        <button type="button" id="save-token">${messages.saveToken}</button>
      </div>
    </fieldset>
    <button type="submit" id="sync">${messages.sync}</button>
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

  for (const key of TEXT_SETTING_KEYS) {
    const { label, hint } = messages.fields[key];
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
    container.textContent = messages.noCollections;
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
  getElement("token-state").textContent = hasToken ? messages.tokenSaved : messages.tokenMissing;
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
    link.textContent = messages.openPullRequest;
    status.append(link);
  }

  getElement<HTMLButtonElement>("sync").disabled = state === "progress";
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
    setStatus("progress", messages.starting);
    postToPlugin({ type: "sync", settings: readSettings(form), locale });
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
    lastProgress = messages.progress[message.step];
    setStatus("progress", lastProgress);
  }

  if (message.type === "synced") {
    lastProgress = "";
    setStatus("synced", messages.result(message.result), message.result.pullRequestUrl);
  }

  if (message.type === "failed") {
    const text = formatError(locale, message.error);

    setStatus("failed", lastProgress ? messages.failedAt(text, lastProgress) : text);
    lastProgress = "";
  }
}

document.documentElement.lang = locale;
getElement("app").innerHTML = TEMPLATE;
bindEvents();

window.addEventListener("message", (event: MessageEvent<{ pluginMessage?: PluginMessage }>) => {
  if (event.data.pluginMessage) handlePluginMessage(event.data.pluginMessage);
});
