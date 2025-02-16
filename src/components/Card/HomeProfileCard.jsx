import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const HomeProfileCard = ({ firstName, lastName, profileImage }) => {
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (
      !profileImage ||
      profileImage === "https://minio.nutech-integrasi.com/take-home-test/null"
    ) {
      setPreviewImage("/images/Profile Photo.png");
    } else {
      setPreviewImage(profileImage);
    }
  }, [profileImage]);
  return (
    <article className="md:col-span-5  max-h-[230px] flex flex-col items-center md:items-start text-center md:text-left">
      <figure>
        <img
          src={previewImage}
          alt="Foto Profil"
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border"
        />
      </figure>
      <div className="mt-4 text-lg sm:text-xl">
        <p className="text-sm sm:text-base">Selamat datang,</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {`${firstName} ${lastName}`}
        </h1>
      </div>
    </article>
  );
};

HomeProfileCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
};

HomeProfileCard.defaultProps = {
  profileImage: "/images/Profile Photo.png",
};
