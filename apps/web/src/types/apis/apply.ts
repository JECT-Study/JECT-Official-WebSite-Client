import type { ProfileData } from "@/types/funnel";

export type { ApplicationStatusResponseSchema as ApplicationStatusResponse } from "@/apis/apply/schemas";

export interface Email {
  email: string;
}

export type EmailExistsResponse = boolean;

export interface EmailAuthPayload extends Email {
  sendGroupCode: "AUTH_CODE" | "PIN_RESET";
}

export interface VerificationEmailCodePayload {
  email: string;
  authCode: string;
}

export interface VerificationEmailCodeQueryParams {
  template: "AUTH_CODE" | "PIN_RESET";
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

export interface RegisterMemberPayload {
  pin: string;
}

export type RegisterMemberResponse = boolean;

export interface ResetPinPayload {
  pin: string;
}

export type ResetPinResponse = null;

export type MemberProfileResponse = ProfileData;

export type MemberProfilePayload = ProfileData;
