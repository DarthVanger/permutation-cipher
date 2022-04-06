import './TextField.css';

const TextField = (props) => {
  const { label, error, ...rest } = props;
  return (
    <>
      <label className="text-field">{label}
        <input type="text" {...rest} />
      </label>

      {error && (
        <div role="alert" className="validation-error">
          {error}
        </div>
      )}
    </>
  );
};

export default TextField;
