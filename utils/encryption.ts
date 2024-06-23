import { ENV } from "@/constants";
import CryptoJS from "crypto-js";

const keyPromise = CryptoJS.enc.Utf8.parse(ENV.ENCRYPTION_KEY);

export const AESEncrypt = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), keyPromise, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

export const AESDecrypt = (data: string) => {
  return JSON.parse(
    CryptoJS.AES.decrypt(data, keyPromise, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8)
  );
};
