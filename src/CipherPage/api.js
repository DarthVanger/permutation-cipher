const serverUrl = 'http://localhost:8000';

const makeRequest = async (url, options) => {
  const fullUrl = `${serverUrl}${url}`;
  const response = await fetch(fullUrl, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(responseText);
  }

  return response.json();
};

export const encryptPasswordRequest = async (password, encryptionKey) => {
  const url = '/encrypt-password';
  const response = await makeRequest(url, {
    method: 'POST',
    body: JSON.stringify({ password, encryptionKey }),
  });
  return response;
};
