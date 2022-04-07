const localStorageKey = 'cipherFormState';

export const saveCipherFormState = (state) => {
  return localStorage.setItem(localStorageKey, JSON.stringify(state));
};

export const loadCipherFormState = () => {
  const stateString = localStorage.getItem(localStorageKey);
  if (!stateString) return null;
  return JSON.parse(stateString);
};
