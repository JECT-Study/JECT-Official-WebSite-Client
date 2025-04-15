export interface Email {
  email: string;
}

export type EmailExistsResponse = boolean;

export interface EmailAuthPayload extends Email {
  template: 'AUTH_CODE' | 'PIN_RESET';
}

export interface VerificationEmailCodePayload {
  email: string;
  authCode: string;
}

export interface VerificationEmailCodeQueryParams {
  template: 'AUTH_CODE' | 'PIN_RESET';
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

export interface RegisterMemberResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ResetPinPayload {
  pin: string;
}

export type ResetPinResponse = null;
