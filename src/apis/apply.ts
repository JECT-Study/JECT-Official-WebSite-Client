import { API_ENDPOINT } from '@/constants/apiEndpoint';
import {
  Email,
  EmailExistsResponseData,
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

export const checkEmailExists = async (email: string) => {
  const params = new URLSearchParams({ email });
  const url = `${API_ENDPOINT.checkEmailExists}?${params.toString()}`;
  return await requestHandler<EmailExistsResponseData>('get', url);
};

export const postEmailAuthCode = async (data: Email) => {
  const params = new URLSearchParams({ email: data.email });
  const url = `${API_ENDPOINT.sendEmailAuthCode}?${params.toString()}`;
  return await requestHandler<boolean>('post', url);
};

export const postVerificationEmailCode = async (data: VerificationEmailCodePayload) => {
  const payload = { email: data.email, authCode: data.verificationEmailCode };
  return await requestHandler<VerificationEmailCodeResponseData, typeof payload>(
    'post',
    API_ENDPOINT.verifyEmailCode,
    payload,
  );
};

export const postPinLogin = async (data: PinLoginPayload) => {
  const payload = { email: data.email, pin: data.pin };
  return await requestHandler<PinLoginResponseData, typeof payload>(
    'post',
    API_ENDPOINT.pinLogin,
    payload,
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
