import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Components
import BannerSlider from "../components/BannerSlider";
import MainLayout from "../components/Layout";

// Redux
import { fetchBanner, fetchServices } from "../redux/Slices/informationSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBanner());
    dispatch(fetchServices());
  }, [dispatch]);

  const { banner: BannerInformation, services: ServiceInformation } =
    useSelector((state) => state.information);

  return (
    <MainLayout>
      {/* Menu Pembayaran */}
      <section className="md:col-span-12 flex min-h-screen md:min-h-auto  justify-center md:justify-between gap-4 md:flex-nowrap flex-wrap">
        {ServiceInformation.map((data) => (
          <Link key={data.service_code} to={`/service/${data.service_code}`}>
            <article className="w-[90px] h-[100px] flex flex-col items-center text-center">
              <figure>
                <img
                  src={data.service_icon}
                  alt={data.service_code}
                  className="w-[80px] h-[80px]"
                />
              </figure>
              <p className="mt-2">{data.service_name}</p>
            </article>
          </Link>
        ))}
      </section>

      {/* Banner Promo */}
      <section className="md:col-span-12 pt-10 ">
        <h2 className="text-2xl font-bold  mb-4">Temukan Promo Menarik</h2>
        <BannerSlider bannerData={BannerInformation} />
      </section>
    </MainLayout>
  );
};

export default HomePage;
