import { useState, useEffect, useMemo } from 'react';
import TextField from './TextField';
import Button from './Button';
import { encryptPasswordRequest } from './api';
import { validatePassword, validateEncryptionKey } from './cipherFormValidators';
import { saveCipherFormState, loadCipherFormState } from './cipherFormLocalStorage';
import './CipherForm.css';

const CipherForm = () => {
  const [password, setPassword] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedPassword, setEncryptedPassword] = useState(null);
  const [encryptionRequestFailed, setEncryptionRequestFailed] = useState(false);
  const [wasFormSubmitted, setWasFormSubmitted] = useState(false);

  const saveStateToLocalStorage = () => {
    saveCipherFormState({
      password,
      encryptionKey,
      encryptedPassword,
    });
  };

  const loadStateFromLocalStorage = () => {
    const state = loadCipherFormState();
    if (!state) return;
    setPassword(state.password);
    setEncryptionKey(state.encryptionKey);
    setEncryptedPassword(state.encryptedPassword);
  };

  useEffect(() => {
    loadStateFromLocalStorage();
  }, []);

  useEffect(() => {
    saveStateToLocalStorage();
  }, [encryptedPassword]);

  const passwordValidationError = useMemo(
    () => validatePassword(password),
    [password],
  );

  const encryptionKeyValidationError = useMemo(
    () => validateEncryptionKey(encryptionKey),
    [encryptionKey],
  );

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
        <div className="encrypted-password-block">
          <h2>Encrypted Password</h2>
          <div className="encrypted-password">{encryptedPassword}</div>
        </div>
      )}
    </form>
  );
};

export default CipherForm;
