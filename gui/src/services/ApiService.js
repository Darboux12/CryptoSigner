import axios from 'axios';

const API_BASE_URL = 'http://server:8080/signer';

// Generowanie kluczy
export const generateKeys = (alias, curveType) => {
  return axios.post(`${API_BASE_URL}/key/generate`, { alias, curveType });
};

// Wyszukiwanie klucza po aliasie
export const getKeyByAlias = (alias) => {
  return axios.get(`${API_BASE_URL}/key/find`, { params: { alias } });
};

// Wyszukiwanie klucza po ID
export const getKeyById = (id) => {
  return axios.get(`${API_BASE_URL}/key/find/id`, { params: { id } });
};

// Pobieranie stanu generacji klucza przez ID
export const getGenerateKeyStateById = (id) => {
  return axios.get(`${API_BASE_URL}/key/generate/state/id`, { params: { id } });
};

// Pobieranie stanu generacji klucza przez alias
export const getGenerateKeyStateByAlias = (alias) => {
  return axios.get(`${API_BASE_URL}/key/generate/state`, { params: { alias } });
};

// Podpisywanie danych
export const signData = (data, signatureAlias, privateKey) => {
  return axios.post(`${API_BASE_URL}/signature/sign`, { data, signatureAlias, privateKey });
};

// Podpisywanie tekstu
export const signText = (text, signatureAlias, privateKey) => {
  return axios.post(`${API_BASE_URL}/signature/sign/text`, {
    data: text,
    signatureAlias,
    privateKey
  });
};

// Weryfikacja podpisu danych
export const verifySignature = (data, signature, publicKey) => {
  return axios.post(`${API_BASE_URL}/signature/verify`, {
    data,
    signature,
    publicKey
  });
};

// Weryfikacja podpisu tekstu
export const verifyTextSignature = (text, signature, publicKey) => {
  return axios.post(`${API_BASE_URL}/signature/verify/text`, {
    data: text,
    signature,
    publicKey
  });
};

// Pobieranie podpisu po aliasie
export const getSignatureByAlias = (alias) => {
  return axios.get(`${API_BASE_URL}/signature/find`, { params: { alias } });
};

// Pobieranie podpisu po ID
export const getSignatureById = (id) => {
  return axios.get(`${API_BASE_URL}/signature/find/id`, { params: { id } });
};
