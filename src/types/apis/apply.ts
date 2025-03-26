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
  verificationToken: string;
}
