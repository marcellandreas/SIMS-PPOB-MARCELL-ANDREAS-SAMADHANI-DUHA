import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Icons
import { TbMinus, TbPlus } from "react-icons/tb";

// Components
import MainLayout from "../components/Layout";

// Redux
import {
  fetchTransactions,
  increaseOffsetAndLimit,
} from "../redux/Slices/transactionSlice";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const { transactions, offset, limit, status, error } = useSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions({ offset, limit }));
  }, [limit, offset, dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(date) + " WIB"
    );
  };

  return (
    <MainLayout>
      <div className="col-span-12 flex flex-col gap-10">
        <div className="text-xl">
          <h1 className="text-4xl font-bold">Semua Transaksi</h1>
        </div>

        {status === "loading" && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col gap-6">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="border border-gray-300 flex justify-between items-start rounded-md p-2 min-h-[90px]"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  {transaction.transaction_type === "TOPUP" ? (
                    <div className="flex items-center gap-x-2 text-green-600">
                      <TbPlus className="font-bold text-xl" />
                      <span className="text-2xl font-semibold">
                        Rp.
                        {parseInt(transaction.total_amount).toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-x-2 text-red-600">
                      <TbMinus className="font-bold text-xl" />
                      <span className="text-2xl font-semibold">
                        Rp.
                        {parseInt(transaction.total_amount).toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-gray-500">
                  {formatDate(transaction.created_on)}
                </p>
              </div>
              <div>{transaction.description}</div>
            </div>
          ))}
        </div>
        <button
          className=" text-red-600 font-semibold cursor-pointer"
          onClick={() => dispatch(increaseOffsetAndLimit())}
        >
          Show More
        </button>
      </div>
    </MainLayout>
  );
};

export default TransactionPage;
