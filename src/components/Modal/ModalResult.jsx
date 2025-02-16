import { MdCheck, MdClose } from "react-icons/md";

export const ModalResult = ({ amount, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-90 backdrop-blur-xs ">
      <div className="bg-white p-6 rounded-md shadow-md text-center">
        <div className="w-full flex justify-center gap-5 flex-col items-center">
          <div
            className={`flex justify-center items-center rounded-full w-16 h-16 ${
              onConfirm.success ? "bg-green-600" : "bg-red-600"
            } `}
          >
            {onConfirm.success ? (
              <MdCheck className="w-10 h-10 text-white " />
            ) : (
              <MdClose className="w-10 h-10 text-white " />
            )}
          </div>
          <p className=" text-center flex flex-col">
            Top Up Sebesar
            <span className=" font-bold  text-xl">
              Rp {parseInt(amount).toLocaleString("id-ID")}
            </span>
          </p>
        </div>
        {onConfirm.success ? <p>Berhasil</p> : <p>Gagal</p>}

        <button
          onClick={onCancel}
          className="mt-4 px-4 py-2 text-red-500 cursor-pointer  font-bold rounded-md"
        >
          Kembali ke beranda
        </button>
      </div>
    </div>
  );
};
