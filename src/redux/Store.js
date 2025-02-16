import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./Slices/ProfileSlice";
import balanceReducer from "./Slices/balanceSlice";
import informationReducer from "./Slices/informationSlice";
import transactionReducer from "./Slices/transactionSlice";
import topupReducer from "./Slices/topUpSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    balance: balanceReducer,
    information: informationReducer,
    transactions: transactionReducer,
    topup: topupReducer,
  },
});
