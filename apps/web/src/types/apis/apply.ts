import type { ProfileData } from "@/types/funnel";

export type { ApplicationStatusResponseSchema as ApplicationStatusResponse } from "@/apis/apply/schemas";

export interface Email {
  email: string;
}

export type EmailExistsResponse = boolean;

export interface EmailExistsParams extends Email {
  recruitId: number;
}

export interface EmailAuthPayload extends Email {
  sendGroupCode: "AUTH_CODE" | "PIN_RESET";
}

export interface VerificationEmailCodePayload {
  email: string;
  authCode: string;
  recruitId: number;
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
  recruitId: number;
}

export interface PinLoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterMemberPayload {
  pin: string;
  recruitId: number;
}

export type RegisterMemberResponse = boolean;

export interface ResetPinPayload {
  pin: string;
}

export type ResetPinResponse = null;

export type MemberProfileResponse = ProfileData;

export type MemberProfilePayload = ProfileData & {
  jobFamily: string;
};
