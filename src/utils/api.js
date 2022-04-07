const serverUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

export const makeRequest = async (url, options) => {
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
