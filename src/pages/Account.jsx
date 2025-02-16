import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { FaEdit, FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

// Components
import Navbar from "../components/Navbar";
import { Button } from "../components/UI/Button";

// Redux
import {
  fetchProfile,
  updateProfile,
  updateProfileImage,
} from "../redux/Slices/ProfileSlice";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const dispatch = useDispatch();
  const { first_name, last_name, email, profile_image } = useSelector(
    (state) => state.profile
  );

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    setProfile({ first_name, last_name, email });

    if (
      !profile_image ||
      profile_image === "https://minio.nutech-integrasi.com/take-home-test/null"
    ) {
      setPreviewImage("/images/Profile Photo.png");
    } else {
      setPreviewImage(profile_image);
    }
  }, [first_name, last_name, email, profile_image]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profile))
      .unwrap()
      .then(() => {
        setMessage("Profil berhasil diperbarui!");
        setIsEditing(false);
      })
      .catch(() => setMessage("Gagal memperbarui profil!"));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Pratinjau sebelum upload
    }
  };

  const uploadImage = () => {
    if (!selectedFile) {
      setMessage("Silakan pilih foto terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", selectedFile);

    dispatch(updateProfileImage(selectedFile))
      .unwrap()
      .then(() => {
        setMessage("Foto profil berhasil diperbarui!");
        setSelectedFile(null);
      })
      .catch((error) => setMessage(error.message || "Gagal mengunggah foto!"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    // window.location.reload();
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <section className="container mx-auto py-20 px-6 md:px-20 lg:px-40 xl:px-80">
        <div className="flex flex-col items-center text-center relative">
          {/* Foto Profil */}
          <div className="relative w-32 h-32">
            <img
              src={previewImage}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profile-upload"
              onChange={handleImageChange}
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border hover:bg-gray-200 transition cursor-pointer"
            >
              <FaEdit className="text-gray-600 text-lg" />
            </label>
          </div>

          <h2 className="mt-4 text-xl font-semibold">
            {first_name} {last_name}
          </h2>

          {selectedFile && (
            <button
              onClick={uploadImage}
              className="mt-2 px-4 py-2 bg-red-600 cursor-pointer text-white rounded-md"
            >
              Upload Foto
            </button>
          )}
        </div>

        {/* Form Profil */}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Nama Depan</label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-3 text-gray-400 text-xl" />
              <input
                type="text"
                name="first_name"
                value={profile.first_name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full pl-10 pr-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Nama Belakang</label>
            <div className="relative flex items-center">
              <FaUser className="absolute left-3 text-gray-400 text-xl" />
              <input
                type="text"
                name="last_name"
                value={profile.last_name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full pl-10 pr-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <div className="relative flex items-center">
              <MdOutlineAlternateEmail className="absolute left-3 text-gray-400 text-xl" />
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled // Email tidak bisa diedit
                className="w-full pl-10 pr-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Tombol Dinamis */}
          {isEditing ? (
            <div className="mt-5">
              <Button fullWidth type="submit">
                Simpan
              </Button>
              <Button variant="gray" onClick={() => setIsEditing(false)}>
                Batalkan
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              fullWidth
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}

          {/* Tombol Logout hanya muncul jika tidak sedang Edit Profile */}
          {!isEditing && (
            <Button fullWidth type="button" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-gray-700">
            {message}
          </div>
        )}
      </section>
    </>
  );
};

export default AccountPage;
