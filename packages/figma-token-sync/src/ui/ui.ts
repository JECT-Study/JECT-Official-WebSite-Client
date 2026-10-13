import type { UiMessage } from "../shared/messages";

function postToPlugin(message: UiMessage): void {
  parent.postMessage({ pluginMessage: message }, "*");
}

document.getElementById("close")?.addEventListener("click", () => {
  postToPlugin({ type: "close" });
});
