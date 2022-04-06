import { useState, useEffect } from 'react';
import './CipherForm.css';
import TextField from './TextField';
import Button from './Button';
import { encryptPasswordRequest } from './api';

const CipherForm = () => {
  const [password, setPassword] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedPassword, setEncryptedPassword] = useState(null);
  const [encryptionRequestFailed, setEncryptionRequestFailed] = useState(false);
  const [passwordValidationError, setPasswordValidationError] = useState(null);
  const [encryptionKeyValidationError, setEncryptionKeyValidationError] = useState(null);
  const [wasFormSubmitted, setWasFormSubmitted] = useState(false);

  const validateForm = () => {
    if (!wasFormSubmitted) return;

    if (password === '') {
      setPasswordValidationError('Please enter password');
    } else {
      setPasswordValidationError(null);
    }

    if (encryptionKey === '') {
      setEncryptionKeyValidationError('Please enter encryption key');
    } else {
      setEncryptionKeyValidationError(null);
    }
  };

  useEffect(() => {
    validateForm();
  }, [password, encryptionKey, wasFormSubmitted]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEcnryptionKeyChange = (event) => {
    setEncryptionKey(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEncryptionRequestFailed(false);
    try {
      const response = await encryptPasswordRequest(password, encryptionKey)
      setEncryptedPassword(response);
    } catch (error) {
      setEncryptionRequestFailed(true);
    }

    setWasFormSubmitted(true);
  };

  return (
    <form aria-label="password encryption form" className="cipher-form" onSubmit={handleSubmit}>
      <TextField
        label="Password"
        placeholder="Password"
        onChange={handlePasswordChange}
        value={password}
        error={passwordValidationError}
      />
      <TextField
        label="Encryption Key"
        placeholder="Encryption key"
        onChange={handleEcnryptionKeyChange}
        value={encryptionKey}
        error={encryptionKeyValidationError}
      />
      <Button type="submit">Encrypt</Button>
      {encryptedPassword && (
        <>
          <h2>Encrypted Password</h2>
          <div>{encryptedPassword}</div>
        </>
      )}
    </form>
  );
};

export default CipherForm;
