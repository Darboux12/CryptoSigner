import axios from 'axios';

// Konfiguracja globalna axios
const api = axios.create({
  baseURL: 'http://server:8080/signer'
});

// Funkcja generująca klucze
export const generateKeys = async (ApiKeyGenerationRequest) => {
  try {
    const response = await api.post('/key/generate', ApiKeyGenerationRequest);
    return response.data;
  } catch (error) {
    console.error('Error generating keys:', error.response);
    throw error;
  }
};

// Funkcja wyszukująca klucz po aliasie
export const getKeyByAlias = async (alias) => {
  try {
    const response = await api.get('/key/find', { params: { alias } });
    return response.data;
  } catch (error) {
    console.error('Error fetching key by alias:', error.response);
    throw error;
  }
};

// Funkcja wyszukująca klucz po ID
export const getKeyById = async (id) => {
  try {
    const response = await api.get('/key/find/id', { params: { id } });
    return response.data;
  } catch (error) {
    console.error('Error fetching key by ID:', error.response);
    throw error;
  }
};

// Podpisywanie danych
export const signData = async (ApiSignatureGenerationRequest) => {
  try {
    const response = await api.post('/signature/sign', ApiSignatureGenerationRequest);
    return response.data;
  } catch (error) {
    console.error('Error signing data:', error.response);
    throw error;
  }
};

// Podpisywanie danych jako tekst
export const signText = async (ApiSignatureGenerationRequestText) => {
  try {
    const response = await api.post('/signature/sign/text', ApiSignatureGenerationRequestText);
    return response.data;
  } catch (error) {
    console.error('Error signing text:', error.response);
    throw error;
  }
};

// Weryfikacja podpisu danych
export const verifySignature = async (ApiSignatureVerificationRequest) => {
  try {
    const response = await api.post('/signature/verify', ApiSignatureVerificationRequest);
    return response.data;
  } catch (error) {
    console.error('Error verifying signature:', error.response);
    throw error;
  }
};

// Weryfikacja podpisu danych jako tekst
export const verifyTextSignature = async (ApiSignatureVerificationRequestText) => {
  try {
    const response = await api.post('/signature/verify/text', ApiSignatureVerificationRequestText);
    return response.data;
  } catch (error) {
    console.error('Error verifying text signature:', error.response);
    throw error;
  }
};
