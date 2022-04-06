import './CipherForm.css';
import TextField from './TextField';
import Button from './Button';

const CipherForm = () => {
  const handlePasswordChange = () => {
  };

  const handleKeyChange = () => {
  };

  const handleSubmit = () => {
  };

  return (
    <form aria-label="password encryption form" className="cipher-form" onSubmit={handleSubmit}>
      <TextField label="Password" placeholder="Password" onChange={handlePasswordChange} />
      <TextField label="Encryption Key" placeholder="Encryption key" onChange={handleKeyChange} />
      <Button type="submit">Encrypt</Button>
    </form>
  );
};

export default CipherForm;
