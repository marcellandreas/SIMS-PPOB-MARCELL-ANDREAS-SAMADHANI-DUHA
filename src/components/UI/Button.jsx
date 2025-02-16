import PropTypes from "prop-types";

export const Button = ({
  children,
  fullWidth,
  onClick,
  disabled,
  loading,
  variant,
}) => {
  const baseClasses = `rounded-md  transition duration-300 ease-in-out py-3 w-auto h-auto`;

  const fullWidthClass = fullWidth ? "w-full" : "";

  const isDisabled = disabled || loading;
  const disabledClass = isDisabled
    ? "bg-gray-400 text-white cursor-not-allowed border-gray-400"
    : "";

  const variantClasses = !isDisabled
    ? variant === "outline"
      ? "border border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-white cursor-pointer"
      : variant === "gray"
      ? "bg-gray-400 text-white rounded-md w-full mt-2 cursor-pointer"
      : "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
    : "";

  return (
    <button
      className={`${baseClasses} ${fullWidthClass} ${variantClasses} ${disabledClass}`}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
    >
      {loading ? "Memproses..." : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  variant: PropTypes.oneOf(["outline", "gray"]),
};

Button.defaultProps = {
  fullWidth: false,
  onClick: () => {},
  disabled: false,
  loading: false,
  variant: undefined,
};
