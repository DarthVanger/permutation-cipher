import './TextField.css';

const TextField = (props) => {
  const { label, ...rest } = props;
  return (
    <label className="text-field">{label}
      <input type="text" {...rest} />
    </label>
  );
};

export default TextField;
