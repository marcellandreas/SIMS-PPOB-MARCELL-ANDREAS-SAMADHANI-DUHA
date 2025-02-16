import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Icons
import { CiWallet } from "react-icons/ci";

// Components
import MainLayout from "../components/Layout";
import { Button } from "../components/UI/Button";

// Redux
import { fetchBalance } from "../redux/Slices/balanceSlice";
import { fetchTopUp } from "../redux/Slices/topUpSlice";
import { ModalConfirm } from "../components/Modal/ModalConfirm";
import { ModalResult } from "../components/Modal/ModalResult";

const TopUpPage = () => {
  const [topUpAmount, setTopUpAmount] = useState("");
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalResult, setModalResult] = useState({
    show: false,
    success: false,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleTopUpClick = (amount) => {
    setTopUpAmount(amount);
  };

  const handleConfirmTopUp = () => {
    const amount = parseInt(topUpAmount, 10);

    if (isNaN(amount) || amount < 10000 || amount > 1000000) {
      alert("Nominal top-up harus antara Rp10.000 hingga Rp1.000.000");
      return;
    }

    setModalConfirm(true);
  };

  const handleTopUp = () => {
    setModalConfirm(false);
    dispatch(fetchTopUp(parseInt(topUpAmount))).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(fetchBalance());
        setModalResult({ show: true, success: true });
      } else {
        setModalResult({ show: true, success: false });
      }
    });
  };

  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="col-span-12 flex flex-col gap-10">
        <div className="mt-4 text-xl">
          <p>Silahkan masukkan</p>
          <h1 className="text-4xl font-bold">Nominal Top Up</h1>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <div className=" col-span-6 md:col-span-4 grid grid-cols-1 grid-rows-2 gap-2">
            <div className="relative w-full h-full">
              <CiWallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="number"
                placeholder="Masukkan nominal Top up"
                className="w-full pl-10 pr-3 h-full border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
              />
            </div>
            <Button
              onClick={handleConfirmTopUp}
              disabled={!topUpAmount}
              loading={loading}
              fullWidth
            >
              Top Up
            </Button>
          </div>
          <div className=" col-span-6 md:col-span-2 grid grid-cols-3 grid-rows-2 gap-2">
            {[10000, 20000, 50000, 100000, 250000, 500000].map(
              (amount, index) => (
                <button
                  key={index}
                  className="w-full cursor-pointer border border-gray-300 p-4 rounded-md text-center"
                  onClick={() => handleTopUpClick(amount.toString())}
                >
                  <p>Rp{amount.toLocaleString("id-ID")}</p>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {modalConfirm && (
        <ModalConfirm
          onCancel={() => setModalConfirm(false)}
          onConfirm={handleTopUp}
          amount={topUpAmount}
        />
      )}

      {/* Modal Sukses / Gagal */}
      {modalResult.show && (
        <ModalResult
          onCancel={() => {
            setModalResult({ show: false, success: false });
            navigate("/");
          }}
          onConfirm={modalResult}
          amount={topUpAmount}
        />
      )}
    </MainLayout>
  );
};

export default TopUpPage;
