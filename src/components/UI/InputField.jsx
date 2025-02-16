import PropTypes from "prop-types";

export const InputField = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error = false,
  icon: Icon,
}) => {
  return (
    <div className="relative w-full">
      {Icon && (
        <Icon
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-xl ${
            error ? "text-red-400" : "text-gray-400"
          }`}
        />
      )}
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`w-full pl-10 pr-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
        onChange={onChange}
      />
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  icon: PropTypes.elementType,
};
