import CryptoJS from 'crypto-js';

export const encryptData = (data: object) => {
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, import.meta.env.VITE_SECRET_KEY).toString();
};

export const decryptData = <T>(cipherText: string): T => {
  const bytes = CryptoJS.AES.decrypt(cipherText, import.meta.env.VITE_SECRET_KEY);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedText) as T;
};
