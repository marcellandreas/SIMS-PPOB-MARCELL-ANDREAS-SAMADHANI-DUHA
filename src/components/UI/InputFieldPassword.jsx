import PropTypes from "prop-types";
import { useState } from "react";

// Icons
import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const InputFieldPassword = ({
  name = "password",
  placeholder = "Masukkan password Anda",
  value = "",
  onChange,
  error = false,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <CiLock
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-xl ${
          error ? "text-red-400" : "text-gray-400"
        }`}
      />
      <input
        type={isShowPassword ? "text" : "password"}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`w-full pl-10 pr-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
        onChange={onChange}
      />
      <span
        onClick={() => setIsShowPassword(!isShowPassword)}
        className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
      >
        {isShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}
      </span>
    </div>
  );
};

InputFieldPassword.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.bool,
};
