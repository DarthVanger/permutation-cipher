import { useState, useEffect, useMemo } from 'react';
import './CipherForm.css';
import TextField from './TextField';
import Button from './Button';
import { encryptPasswordRequest } from './api';
import useCipherFormValidation from './useCipherFormValidation';

const CipherForm = () => {
  const [password, setPassword] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedPassword, setEncryptedPassword] = useState(null);
  const [encryptionRequestFailed, setEncryptionRequestFailed] = useState(false);
  const [wasFormSubmitted, setWasFormSubmitted] = useState(false);

  const { passwordValidationError, encryptionKeyValidationError } = useCipherFormValidation({
    password,
    encryptionKey,
  });

  const isFormValid = !passwordValidationError && !encryptionKeyValidationError;

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEcnryptionKeyChange = (event) => {
    setEncryptionKey(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWasFormSubmitted(true);
    setEncryptionRequestFailed(false);

    if (!isFormValid) return;

    try {
      const response = await encryptPasswordRequest(password, encryptionKey)
      setEncryptedPassword(response);
    } catch (error) {
      setEncryptionRequestFailed(true);
    }
  };

  return (
    <form aria-label="password encryption form" className="cipher-form" onSubmit={handleSubmit}>
      <TextField
        label="Password"
        placeholder="Password"
        onChange={handlePasswordChange}
        value={password}
        error={wasFormSubmitted && passwordValidationError}
      />
      <TextField
        label="Encryption Key"
        placeholder="Encryption key"
        onChange={handleEcnryptionKeyChange}
        value={encryptionKey}
        error={wasFormSubmitted && encryptionKeyValidationError}
      />
      <Button type="submit">Encrypt</Button>
      {encryptionRequestFailed && (
        <div role="alert" className="request-failed-message">Request failed. Please try again later.</div>
      )}
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
