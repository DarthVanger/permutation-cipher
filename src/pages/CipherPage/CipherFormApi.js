import { makeRequest } from '../../utils/api';

export const encryptPasswordRequest = async (password, encryptionKey) => {
  const url = '/encrypt-password';
  const response = await makeRequest(url, {
    method: 'POST',
    body: JSON.stringify({ password, encryptionKey }),
  });
  return response;
};
