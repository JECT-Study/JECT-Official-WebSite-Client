import { API_ENDPOINT } from '@/constants/apiEndpoint';
import {
  Email,
  EmailExistsResponse,
  MemberProfileInitialPayload,
  MemberProfileInitialResponseData,
  PinLoginPayload,
  PinLoginResponseData,
  RegisterMemberPayload,
  RegisterMemberResponseData,
  VerificationEmailCodePayload,
  VerificationEmailCodeResponseData,
} from '@/types/apis/apply';
import { requestHandler } from '@/utils/httpClient';

export const checkEmailExists = async ({ email }: Email) => {
  const params = new URLSearchParams({ email });
  const url = `${API_ENDPOINT.checkEmailExists}?${params.toString()}`;
  return await requestHandler<EmailExistsResponse>('get', url);
};

export const postEmailAuthCode = async ({ email }: Email) => {
  const params = new URLSearchParams({ email });
  const url = `${API_ENDPOINT.sendEmailAuthCode}?${params.toString()}`;
  return await requestHandler<boolean>('post', url);
};

export const postVerificationEmailCode = async (data: VerificationEmailCodePayload) => {
  return await requestHandler<
    VerificationEmailCodeResponseData,
    { email: string; authCode: string }
  >('post', API_ENDPOINT.verifyEmailCode, {
    email: data.email,
    authCode: data.verificationEmailCode,
  });
};

export const postPinLogin = async (data: PinLoginPayload) => {
  return await requestHandler<PinLoginResponseData, { email: string; pin: string }>(
    'post',
    API_ENDPOINT.pinLogin,
    { email: data.email, pin: data.pin },
  );
};

export const putMemberProfileInitial = async (data: MemberProfileInitialPayload) => {
  return await requestHandler<MemberProfileInitialResponseData, MemberProfileInitialPayload>(
    'put',
    API_ENDPOINT.memberProfileInitial,
    data,
  );
};

export const postRegisterMember = async (
  data: RegisterMemberPayload,
  options?: { headers: { Authorization: string } },
) => {
  return await requestHandler<RegisterMemberResponseData, RegisterMemberPayload>(
    'post',
    API_ENDPOINT.registerMember,
    data,
    options,
  );
};
