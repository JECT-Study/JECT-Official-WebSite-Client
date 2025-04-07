export interface Email {
  email: string;
}

export type EmailExistsResponse = boolean;

export interface EmailAuthPayload extends Email {
  template: 'CERTIFICATE' | 'PIN_RESET';
}

export interface VerificationEmailCodePayload {
  email: string;
  authCode: string;
}

export interface VerificationEmailCodeQueryParams {
  template: 'CERTIFICATE' | 'PIN_RESET';
}

export interface VerificationEmailCodeResponse {
  token: string;
}

export interface PinLoginPayload {
  email: string;
  pin: string;
}

export interface PinLoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface MemberProfileInitialPayload {
  name: string;
  phoneNumber: string;
}

export type MemberProfileInitialResponse = null;

export interface RegisterMemberPayload {
  pin: string;
}

export interface RegisterMemberResponseData {
  accessToken: string;
  refreshToken: string;
}
