import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; // ⚠️ Move to .env in production

export const encryptToken = (token) => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

export const decryptToken = (encryptedToken) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const saveToken = (token) => {
  const encrypted = encryptToken(token);
  sessionStorage.setItem("token", encrypted);
};

export const getToken = () => {
  const encrypted = sessionStorage.getItem("token");
  if (!encrypted) return null;
  return decryptToken(encrypted);
};

export const removeToken = () => {
  sessionStorage.removeItem("token");
};

export const getRole = () => {
  return sessionStorage.getItem("role");
};

export const isAdmin = () => {
  return sessionStorage.getItem("role") === "admin";
};

export const isUser = () => {
  return sessionStorage.getItem("role") === "user";
};