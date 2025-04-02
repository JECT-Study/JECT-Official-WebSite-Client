export interface Email {
  email: string;
}

export interface VerificationEmailCodePayload {
  email: string;
  verificationEmailCode: string;
}

export interface VerificationEmailCodeResponseData {
  verificationToken: string;
}

export interface PinLoginPayload {
  email: string;
  pin: string;
}

export interface PinLoginResponseData {
  accessToken: string;
  refreshToken: string;
}

export type EmailExistsResponse = boolean;

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
