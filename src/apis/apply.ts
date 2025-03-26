import { API_ENDPOINT } from '@/constants/apiEndpoint';
import {
  Email,
  PinLoginPayload,
  PinLoginResponseData,
  VerificationEmailCodePayload,
  VerificationEmailCodeResponseData,
} from '@/types/apis/apply';
import { requestHandler } from '@/utils/httpClient';

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
