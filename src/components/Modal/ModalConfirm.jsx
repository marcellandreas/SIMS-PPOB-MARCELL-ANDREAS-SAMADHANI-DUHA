import { CiWallet } from "react-icons/ci";

export const ModalConfirm = ({ amount, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-90 backdrop-blur-xs    ">
      <div className="bg-white p-6 rounded-md shadow-md">
        <div className="w-full flex justify-center gap-5 flex-col items-center">
          <div className=" flex justify-center items-center rounded-full w-16 h-16 bg-red-500 ">
            <CiWallet className="w-10 h-10 text-white " />
          </div>
          <p className=" text-center">
            Anda yakin untuk Top Up sebesar <br />
            <span className=" font-bold  text-xl">
              Rp {parseInt(amount).toLocaleString("id-ID")}
            </span>
          </p>
        </div>
        <div className="mt-4 flex flex-col justify-end gap-2">
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-red-500 font-bold rounded-md cursor-pointer"
          >
            Ya, Lanjutkan Top Up
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-500 rounded-md cursor-pointer"
          >
            Batalkan
          </button>
        </div>
      </div>
    </div>
  );
};
