import { useState, useEffect } from 'react';

const useCipherFormValidation = ({ password, encryptionKey }) => {
  const [passwordValidationError, setPasswordValidationError] = useState('');
  const [encryptionKeyValidationError, setEncryptionKeyValidationError] = useState('');

  const validateForm = () => {
    setPasswordValidationError(validatePassword(password));
    setEncryptionKeyValidationError(validateEncryptionKey(encryptionKey));
  };

  useEffect(() => {
    validateForm();
  }, [password, encryptionKey]);

  const validatePassword = (password) => {
    if (password === '') {
      return 'Please enter password';
    }
    if (!/^[a-zA-Z]+$/.test(password)) {
      return 'Password should contain only letters of the alphabet';
    }
  };

  const validateEncryptionKey = (encryptionKey) => {
    const NUMBER_OF_ALPHABET_LETTERS = 26;

    if (encryptionKey === '') {
      return 'Please enter encryption key';
    }
    if (!/^[a-zA-Z]+$/.test(encryptionKey)) {
      return 'Encryption key should contain only letters of the alphabet';
    }
    if (encryptionKey.length !== NUMBER_OF_ALPHABET_LETTERS) {
      return `Encryption key should have exactly ${NUMBER_OF_ALPHABET_LETTERS} letters`;
    }

    const uniqueLetters = [...new Set(Array.from(encryptionKey))];

    if (uniqueLetters.length !== encryptionKey.length) {
      return 'Encryption key should contain only unique letters';
    }
  };

  return { passwordValidationError, encryptionKeyValidationError };

};

export default useCipherFormValidation;
