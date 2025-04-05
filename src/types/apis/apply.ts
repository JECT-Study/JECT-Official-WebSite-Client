export interface Email {
  email: string;
}

export type EmailExistsResponse = boolean;

export interface VerificationEmailCodePayload {
  email: string;
  authCode: string;
}

export interface VerificationEmailCodeQueryParams {
  template: 'CERTIFIACTE' | 'PIN_RESET';
}

export interface VerificationEmailCodeResponse {
  token: string;
}

export interface PinLoginPayload {
  email: string;
  pin: string;
}

export interface PinLoginResponseData {
  accessToken: string;
  refreshToken: string;
}

export interface MemberProfileInitialPayload {
  name: string;
  phoneNumber: string;
}

export type MemberProfileInitialResponseData = null;

export interface RegisterMemberPayload {
  pin: string;
}

export interface RegisterMemberResponseData {
  accessToken: string;
  refreshToken: string;
}
