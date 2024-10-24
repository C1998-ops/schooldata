const FormInput = ({
  name,
  id,
  placeholder,
  type,
  label,
  value,
  error,
  change,
}) => {
  return (
    <div className="relative">
      <label htmlFor={id} className="block text-sm text-gray-600 font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value[name]}
        onChange={change}
        className={`block w-full rounded-md border px-4 py-2  focus:ring-offset-1 inset-2 outline-1 focus:outline-blue-300 ${
          error[name] ? "border-red-400" : "border-gray-200"
        }`}
      />
      {error[name] && (
        <span className="text-xs text-red-400">{error[name]}</span>
      )}
    </div>
  );
};
export default FormInput;
