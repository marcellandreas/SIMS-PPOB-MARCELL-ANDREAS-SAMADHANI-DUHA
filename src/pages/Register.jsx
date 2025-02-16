import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

// Icons
import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";

// Components
import { Button } from "../components/UI/Button";
import { InputField } from "../components/UI/InputField";
import { InputFieldPassword } from "../components/UI/InputFieldPassword";

// Utils
import { validateForm } from "../utils/validation";

const RegisterPage = () => {
  const [isConfirmShowPassword, setIsConfirmShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);

  const handleConfirmShowPassword = () =>
    setIsConfirmShowPassword(!isConfirmShowPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, "register");

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "https://take-home-test-api.nutech-integrasi.com/registration",
          {
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
          }
        );
        setResponseMessage({
          status: "success",
          message: response.data.message,
        });
      } catch (error) {
        setResponseMessage({
          status: "error",
          message:
            error.response?.data?.message || "Terjadi kesalahan, coba lagi",
        });
      }
    } else {
      setResponseMessage(null);
    }
  };

  const closeErrorMessage = () => setErrors({});
  const closeResponseMessage = () => setResponseMessage(null);

  return (
    <section className="w-full h-screen grid grid-cols-12">
      <div className="col-span-12 pt-10 md:pt-0 md:col-span-6 flex flex-col max-h-screen gap-8 justify-center items-center">
        {/* Logo */}
        <div className="flex items-center gap-x-2">
          <img src="/images/Logo.png" alt="Logo" />
          <span className="uppercase font-bold text-2xl">sims ppob</span>
        </div>
        <h3 className="font-black text-3xl text-center w-3/5">
          Lengkapi data untuk membuat akun
        </h3>
        <form className="flex flex-col w-4/5 gap-5" onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="first_name"
            icon={FaUser}
            placeholder="Masukan Nama Depan"
            onChange={handleChange}
            error={errors.first_name}
          />
          <InputField
            type="text"
            name="last_name"
            icon={FaUser}
            placeholder="Masukan Nama Belakang"
            onChange={handleChange}
            error={errors.last_name}
          />
          <InputField
            type="email"
            name="email"
            icon={MdOutlineAlternateEmail}
            placeholder="Masukkan email Anda"
            onChange={handleChange}
            error={errors.email}
          />

          <InputFieldPassword
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          {/* Input Konfirmasi Password */}
          <div className="relative w-full">
            <CiLock
              className={`absolute left-3 top-1/2 -translate-y-1/2  text-xl ${
                errors.email ? "text-red-400" : "text-gray-400"
              }`}
            />
            <input
              type={isConfirmShowPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Konfirmasi password"
              className={`w-full pl-10 pr-3 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onChange={handleChange}
            />
            <span
              onClick={handleConfirmShowPassword}
              className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
            >
              {isConfirmShowPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
            {Object.keys(errors)
              .filter((key) => key === "confirmPassword")
              .map((key, index) => (
                <div key={index} className=" absolute right-0 text-red-600  ">
                  <p>{errors[key]}</p>
                </div>
              ))}
          </div>
          <Button>Masuk</Button>
        </form>
        {/* Link Registrasi */}
        <p className="text-gray-600">
          Sudah punya akun? login{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            di sini
          </Link>
        </p>
        {/* Menampilkan error di bawah form dengan tombol close */}
        {Object.keys(errors).length > 0 &&
          Object.keys(errors)
            .filter((key) => key !== "confirmPassword")
            .slice(0, 1)
            .map((key, index) => (
              <div
                key={index}
                className="relative mt-4 p-3 bg-red-100 text-red-600 rounded-md w-4/5 text-center"
              >
                <p>{errors[key]}</p>
                <span
                  className="absolute top-1 right-2 cursor-pointer text-red-500 text-xl"
                  onClick={closeErrorMessage}
                >
                  <IoMdClose />
                </span>
              </div>
            ))}

        {/* Response Handling dengan tombol close */}
        {responseMessage && (
          <div
            className={`relative mt-4 p-3 rounded-md w-4/5 text-center ${
              responseMessage.status === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {responseMessage.message}
            <span
              className="absolute top-1 right-2 cursor-pointer text-white text-xl"
              onClick={closeResponseMessage}
            >
              <IoMdClose />
            </span>
          </div>
        )}
      </div>
      <div className=" col-span-12 md:col-span-6">
        <img
          src="/images/Illustrasi Login.png"
          alt="Ilustrasi Login"
          className="h-screen w-full object-cover"
        />
      </div>
    </section>
  );
};

export default RegisterPage;
