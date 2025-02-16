import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { CiCreditCard1, CiWallet } from "react-icons/ci";
import { MdCheck, MdClose } from "react-icons/md";

// Components
import MainLayout from "../components/Layout";

// Redux
import { fetchProfile } from "../redux/Slices/ProfileSlice";
import { fetchBalance } from "../redux/Slices/balanceSlice";
import { postTransaction } from "../redux/Slices/transactionSlice";

const ServiceDetailPage = () => {
  const { service_code } = useParams();
  const { services } = useSelector((state) => state.information);
  const dispatch = useDispatch();

  const service = services.find((item) => item.service_code === service_code);

  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalResult, setModalResult] = useState({
    show: false,
    success: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  const handleTopUp = async () => {
    setIsLoading(true);
    dispatch(postTransaction(service_code))
      .unwrap()
      .then(() => {
        setModalResult({ show: true, success: true });
      })
      .catch(() => {
        setModalResult({ show: true, success: false });
      })
      .finally(() => {
        setIsLoading(false);
        setModalConfirm(false);
      });
  };

  if (!service) {
    return <p>Layanan tidak ditemukan.</p>;
  }

  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="col-span-12 flex flex-col gap-10">
        <div className="text-xl">
          <p>Pembayaran</p>
          <div className="flex items-center gap-x-2 mt-2">
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="w-10 h-10"
            />
            <h5 className="font-bold">{service.service_name} Prabayar</h5>
          </div>
          <form className="flex flex-col gap-5">
            <div className="relative w-full">
              <CiCreditCard1 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                name="service_tariff"
                value={service.service_tariff}
                className="w-full pl-10 pr-3 py-2 border rounded-md bg-white"
                readOnly
              />
            </div>
            <button
              type="button"
              className="bg-red-600 w-full text-white py-3 rounded-md hover:bg-red-700 transition"
              onClick={() => setModalConfirm(true)}
            >
              Bayar
            </button>
          </form>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {modalConfirm && (
        <div className="fixed inset-0 flex items-center justify-center opacity-90 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="w-full flex justify-center gap-5 flex-col items-center">
              <div className="flex justify-center items-center rounded-full w-16 h-16 bg-red-500">
                <CiWallet className="w-10 h-10 text-white" />
              </div>
              <p className="text-center">
                Anda yakin untuk Membayar {service.service_name} <br />
                <span className="font-bold text-xl">
                  Rp {parseInt(service.service_tariff).toLocaleString("id-ID")}
                </span>
              </p>
            </div>

            <div className="mt-4 flex flex-col justify-end gap-2">
              <button
                onClick={handleTopUp}
                className="px-4 py-2 text-red-500 font-bold rounded-md cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Ya, Lanjutkan Pembayaran"}
              </button>
              <button
                onClick={() => setModalConfirm(false)}
                className="px-4 py-2 text-gray-500 rounded-md cursor-pointer"
              >
                Batalkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sukses / Gagal */}
      {modalResult.show && (
        <div className="fixed inset-0 flex items-center justify-center opacity-90 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <div className="w-full flex justify-center gap-5 flex-col items-center">
              <div
                className={`flex justify-center items-center rounded-full w-16 h-16 ${
                  modalResult.success ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {modalResult.success ? (
                  <MdCheck className="w-10 h-10 text-white" />
                ) : (
                  <MdClose className="w-10 h-10 text-white" />
                )}
              </div>
              <p className="text-center flex flex-col">
                Membayar {service.service_name} Sebesar
                <span className="font-bold text-xl">
                  Rp {parseInt(service.service_tariff).toLocaleString("id-ID")}
                </span>
              </p>
            </div>

            {modalResult.success ? <p>Berhasil</p> : <p>Gagal</p>}
            <button
              onClick={() => {
                setModalResult({ show: false, success: false });
                navigate("/");
              }}
              className="mt-4 px-4 py-2 text-red-500 cursor-pointer font-bold rounded-md"
            >
              Kembali ke beranda
            </button>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default ServiceDetailPage;
