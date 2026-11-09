import type { PluginErrorCode } from "../shared/messages";

/**
 * @description 사용자에게 원인을 보여 줄 수 있는 실패
 *
 * @remarks
 * 메인 스레드는 화면 언어를 알 수 없어 문구 대신 코드와 값만 담고, UI가 언어에 맞는 문구로 바꿉니다.
 */
export class PluginError extends Error {
  constructor(
    readonly code: PluginErrorCode,
    readonly params: Record<string, string> = {},
  ) {
    super(`${code} ${JSON.stringify(params)}`);
    this.name = "PluginError";
  }
}
