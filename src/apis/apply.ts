import { API_ENDPOINT } from '@/constants/apiEndpoint';
import {
  Email,
  EmailAuthPayload,
  EmailExistsResponse,
  MemberProfileInitialPayload,
  MemberProfileInitialResponse,
  MemberProfileInitialStatusResponse,
  PinLoginPayload,
  PinLoginResponse,
  RegisterMemberPayload,
  RegisterMemberResponse,
  ResetPinPayload,
  ResetPinResponse,
  VerificationEmailCodePayload,
  VerificationEmailCodeQueryParams,
  VerificationEmailCodeResponse,
} from '@/types/apis/apply';
import { requestHandler } from '@/utils/httpClient';

export const checkEmailExists = async ({ email }: Email) => {
  const params = new URLSearchParams({ email });
  const url = `${API_ENDPOINT.checkEmailExists}?${params.toString()}`;
  return await requestHandler<EmailExistsResponse>('get', url);
};

export const postEmailAuthCode = async ({ email, template }: EmailAuthPayload) => {
  const params = new URLSearchParams({ email, template });
  const url = `${API_ENDPOINT.sendEmailAuthCode}?${params.toString()}`;
  return await requestHandler<null>('post', url);
};

export const postVerificationEmailCode = async (
  data: VerificationEmailCodePayload,
  queryParams: VerificationEmailCodeQueryParams,
) => {
  const params = new URLSearchParams({
    template: queryParams.template,
  });
  const url = `${API_ENDPOINT.verifyEmailCode}?${params.toString()}`;
  return await requestHandler<VerificationEmailCodeResponse, VerificationEmailCodePayload>(
    'post',
    url,
    data,
  );
};

export const postPinLogin = async (data: PinLoginPayload) => {
  return await requestHandler<PinLoginResponse, PinLoginPayload>(
    'post',
    API_ENDPOINT.pinLogin,
    data,
  );
};

export const putMemberProfileInitial = async (data: MemberProfileInitialPayload) => {
  return await requestHandler<MemberProfileInitialResponse, MemberProfileInitialPayload>(
    'put',
    API_ENDPOINT.memberProfileInitial,
    data,
  );
};

export const getMemberProfileInitialStatus = async () => {
  return await requestHandler<MemberProfileInitialStatusResponse>(
    'get',
    API_ENDPOINT.memberProfileInitialStatus,
  );
};

export const postRegisterMember = async (data: RegisterMemberPayload) => {
  return await requestHandler<RegisterMemberResponse, RegisterMemberPayload>(
    'post',
    API_ENDPOINT.registerMember,
    data,
  );
};

export const putResetPin = async (data: ResetPinPayload) => {
  return await requestHandler<ResetPinResponse, ResetPinPayload>(
    'put',
    API_ENDPOINT.resetPin,
    data,
  );
};
