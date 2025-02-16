import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="container mx-auto py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-x-2">
          <img src="/images/Logo.png" alt="Logo" className="w-10 h-10" />
          <span className="uppercase font-bold text-2xl">sims ppob</span>
        </Link>

        {/* Menu untuk desktop */}
        <div className="hidden md:flex gap-x-10 text-xl text-black font-semibold">
          <Link to="/topup">Top Up</Link>
          <Link to="/transaction">Transaction</Link>
          <Link to="/account">Akun</Link>
        </div>

        {/* Icon menu untuk mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-y-4 text-center text-xl text-black font-semibold pb-4">
          <Link to="/topup" onClick={() => setIsOpen(false)}>
            Top Up
          </Link>
          <Link to="/transaction" onClick={() => setIsOpen(false)}>
            Transaction
          </Link>
          <Link to="/account" onClick={() => setIsOpen(false)}>
            Akun
          </Link>
        </div>
      )}

      <hr className="border-b border-gray-200 w-full" />
    </>
  );
};

export default Navbar;
