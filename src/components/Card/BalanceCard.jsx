import PropTypes from "prop-types";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Lingkaran = () => (
  <span className="text-4xl sm:text-5xl font-bold">• • • • •</span>
);

export const BalanceCard = ({ showBalance, toggleBalance, balanceSaldo }) => {
  return (
    <article
      className="md:col-span-7  max-h-[250px] bg-cover bg-center p-4 sm:p-6 text-white rounded-3xl flex flex-col justify-between"
      style={{ backgroundImage: "url('/images/Background%20Saldo.png')" }}
    >
      <h4 className="text-lg sm:text-xl">Saldo Anda</h4>
      <h1 className="text-3xl sm:text-4xl md:text-5xl">
        Rp. {showBalance ? balanceSaldo : <Lingkaran />}
      </h1>
      <button
        onClick={toggleBalance}
        className="flex items-center gap-2 text-lg sm:text-xl cursor-pointer"
        aria-label="Tampilkan atau sembunyikan saldo"
      >
        Lihat Saldo {showBalance ? <FaRegEyeSlash /> : <FaRegEye />}
      </button>
    </article>
  );
};

BalanceCard.propTypes = {
  showBalance: PropTypes.bool.isRequired,
  toggleBalance: PropTypes.func.isRequired,
  balanceSaldo: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
