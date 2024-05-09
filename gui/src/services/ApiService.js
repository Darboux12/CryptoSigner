import axios from 'axios';

const API_BASE_URL = 'http://server:8080/signer';

// Generowanie kluczy
export const generateKeys = (ApiKeyGenerationRequest) => {
  return axios.post(`${API_BASE_URL}/key/generate`, ApiKeyGenerationRequest);
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

// Podpisywanie danych jako bajty
export const signData = (ApiSignatureGenerationRequest) => {
  return axios.post(`${API_BASE_URL}/signature/sign`, ApiSignatureGenerationRequest);
};

// Podpisywanie danych jako tekst
export const signText = (ApiSignatureGenerationRequestText) => {
  return axios.post(`${API_BASE_URL}/signature/sign/text`, ApiSignatureGenerationRequestText);
};

// Weryfikacja podpisu danych jako bajty
export const verifySignature = (ApiSignatureVerificationRequest) => {
  return axios.post(`${API_BASE_URL}/signature/verify`, ApiSignatureVerificationRequest);
};

// Weryfikacja podpisu danych jako tekst
export const verifyTextSignature = (ApiSignatureVerificationRequestText) => {
  return axios.post(`${API_BASE_URL}/signature/verify/text`, ApiSignatureVerificationRequestText);
};

// Pobieranie podpisu po aliasie
export const getSignatureByAlias = (alias) => {
  return axios.get(`${API_BASE_URL}/signature/find`, { params: { alias } });
};

// Pobieranie podpisu po ID
export const getSignatureById = (id) => {
  return axios.get(`${API_BASE_URL}/signature/find/id`, { params: { id } });
};

// Pobieranie stanu generacji podpisu przez ID
export const getSignatureGenerationStateById = (id) => {
  return axios.get(`${API_BASE_URL}/signature/generate/state/id`, { params: { id } });
};

// Pobieranie stanu generacji podpisu przez alias
export const getSignatureGenerationStateByAlias = (alias) => {
  return axios.get(`${API_BASE_URL}/signature/generate/state`, { params: { alias } });
};
