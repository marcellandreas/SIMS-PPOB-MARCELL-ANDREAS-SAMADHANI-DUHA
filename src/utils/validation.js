export const validateForm = (formData, type) => {
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  let validationErrors = {};

  if (!formData.email) {
    validationErrors.email = "Email harus diisi";
  } else if (!validateEmail(formData.email)) {
    validationErrors.email = "Format email tidak valid";
  }

  if (!formData.password) {
    validationErrors.password = "Password harus diisi";
  } else if (formData.password.length < 8) {
    validationErrors.password = "Password minimal 8 karakter";
  }

  if (type === "register") {
    if (!formData.first_name)
      validationErrors.first_name = "First name harus diisi";
    if (!formData.last_name)
      validationErrors.last_name = "Last name harus diisi";

    if (!formData.confirmPassword) {
      validationErrors.confirmPassword = "Konfirmasi password harus diisi";
    } else if (formData.confirmPassword !== formData.password) {
      validationErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }
  }

  return validationErrors;
};
