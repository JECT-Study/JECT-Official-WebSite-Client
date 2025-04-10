import { API_ENDPOINT } from '@/constants/apiEndpoint';
import {
  Email,
  EmailAuthPayload,
  EmailExistsResponse,
  MemberProfileInitialPayload,
  MemberProfileInitialResponse,
  PinLoginPayload,
  PinLoginResponse,
  RegisterMemberPayload,
  RegisterMemberResponse,
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

export const postRegisterMember = async (
  data: RegisterMemberPayload,
  options?: { headers: { Authorization: string } },
) => {
  return await requestHandler<RegisterMemberResponse, RegisterMemberPayload>(
    'post',
    API_ENDPOINT.registerMember,
    data,
    options,
  );
};
