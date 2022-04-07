import './TextField.css';

const TextField = (props) => {
  const { label, error, ...rest } = props;
  return (
    <div className="text-field">
      <label className="text-field-label">{label}
        <input type="text" {...rest} />
      </label>

      {error && (
        <div role="alert" className="validation-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default TextField;
