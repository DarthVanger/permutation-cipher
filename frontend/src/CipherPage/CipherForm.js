import { useState } from 'react';
import './CipherForm.css';
import TextField from './TextField';
import Button from './Button';
import { encryptPasswordRequest } from './api';

const CipherForm = () => {
  const [password, setPassword] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [encryptedPassword, setEncryptedPassword] = useState(null);
  const [encryptionRequestFailed, setEncryptionRequestFailed] = useState(false);

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
  };

  return (
    <form aria-label="password encryption form" className="cipher-form" onSubmit={handleSubmit}>
      <TextField
        label="Password"
        placeholder="Password"
        onChange={handlePasswordChange}
        value={password}
      />
      <TextField
        label="Encryption Key"
        placeholder="Encryption key"
        onChange={handleEcnryptionKeyChange}
        value={encryptionKey}
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
