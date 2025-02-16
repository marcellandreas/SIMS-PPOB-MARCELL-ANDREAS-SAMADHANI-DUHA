import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Icons
import { IoMdClose } from "react-icons/io";
import { MdOutlineAlternateEmail } from "react-icons/md";

// Components
import { Button } from "../components/UI/Button";
import { InputField } from "../components/UI/InputField";
import { InputFieldPassword } from "../components/UI/InputFieldPassword";

// Utils
import { validateForm } from "../utils/validation";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, "login");

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true); // Aktifkan loading state

      try {
        const response = await axios.post(
          "https://take-home-test-api.nutech-integrasi.com/login",
          formData
        );
        const token = response?.data?.data?.token;
        localStorage.setItem("token", token);

        setResponseMessage({
          status: "success",
          message: "Login berhasil! Mohon tunggu...",
        });

        if (token) {
          setTimeout(() => {
            window.location.reload();
          }, 5000); // Reload setelah 5 detik
        }
      } catch (error) {
        setResponseMessage({
          status: "error",
          message:
            error.response?.data?.message || "Terjadi kesalahan, coba lagi",
        });
      } finally {
        setIsLoading(false); // Matikan loading state
      }
    } else {
      setResponseMessage(null);
    }
  };

  const closeErrorMessage = () => setErrors({});
  const closeResponseMessage = () => setResponseMessage(null);

  return (
    <section className="w-full h-screen grid grid-cols-12">
      {/* Bagian Kiri - Form Login */}
      <div className="col-span-12 pt-10 md:pt-0 md:col-span-6 flex flex-col gap-8 justify-center items-center">
        {/* Logo */}
        <div className="flex items-center gap-x-2">
          <img src="/images/Logo.png" alt="Logo" />
          <span className="uppercase font-bold text-2xl">sims ppob</span>
        </div>

        {/* Judul */}
        <h3 className="font-black text-3xl text-center w-3/5">
          Masuk atau buat akun untuk memulai
        </h3>

        {/* Jika Loading, Tampilkan Pesan Loading */}
        {isLoading ? (
          <div className="text-lg font-medium text-blue-500">
            Mohon tunggu, sedang masuk...
          </div>
        ) : (
          <form className="flex flex-col w-4/5 gap-5" onSubmit={handleSubmit}>
            {/* Input Email */}
            <InputField
              type="email"
              name="email"
              icon={MdOutlineAlternateEmail}
              placeholder="Masukkan email Anda"
              onChange={handleChange}
              error={errors.email}
            />

            {/* Input Password */}
            <InputFieldPassword
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            {/* Tombol Login */}
            <Button>Masuk</Button>
          </form>
        )}

        {/* Link Registrasi */}
        <p className="text-gray-600">
          Belum punya akun? Daftar{" "}
          <Link to="/register" className="text-red-500 hover:underline">
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

      {/* Bagian Kanan - Gambar Ilustrasi */}
      <div className="col-span-12 md:col-span-6">
        <img
          src="/images/Illustrasi Login.png"
          alt="Ilustrasi Login"
          className="h-screen w-full object-cover"
        />
      </div>
    </section>
  );
};

export default LoginPage;
