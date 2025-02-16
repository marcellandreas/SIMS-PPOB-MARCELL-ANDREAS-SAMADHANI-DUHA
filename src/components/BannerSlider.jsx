import PropTypes from "prop-types";

// Swiper
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BannerSlider = ({ bannerData }) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        320: { slidesPerView: 1.5 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4.5 },
      }}
      className="rounded-md"
    >
      {bannerData.map((data, index) => (
        <SwiperSlide key={index} className="relative group">
          <img
            src={data.banner_image}
            alt={`Slide ${index + 1}`}
            className="w-full h-40 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

BannerSlider.propTypes = {
  bannerData: PropTypes.arrayOf(
    PropTypes.shape({
      banner_image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BannerSlider;
