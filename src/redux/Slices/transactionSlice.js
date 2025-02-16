import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api";

const token = localStorage.getItem("token");

const API_TRANSACTION = `${API_URL}/transaction`;
const HISTORY_URL = `${API_TRANSACTION}/history`;

// Async thunk untuk melakukan transaksi (POST)
export const postTransaction = createAsyncThunk(
  "transaction/postTransaction",
  async (service_code, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_TRANSACTION,
        { service_code },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk untuk mengambil riwayat transaksi (GET)
export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async ({ offset, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${HISTORY_URL}?offset=${offset}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("limit :", limit, "ofset :", offset, "a");
      return response.data.data.records;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: [],
    offset: 0,
    limit: 5,
    isLoading: false,
    success: false,
    status: "idle",
    error: null,
  },
  reducers: {
    resetTransactions: (state) => {
      state.transactions = [];
      state.offset = 0;
      state.limit = 5;
    },
    increaseOffsetAndLimit: (state) => {
      console.log(state, "offsetandlimit");
      // state.offset += state.limit;
      state.limit += 5;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle postTransaction
      .addCase(postTransaction.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(postTransaction.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(postTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Handle fetchTransactions
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(fetchTransactions.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   console.log("check limit", action);
      //   state.transactions = [...state.transactions, ...action.payload];
      // })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (state.offset === 0) {
          state.transactions = action.payload;
        } else {
          state.transactions = [...state.transactions, ...action.payload];
        }

        console.log("Final Transactions:", state.transactions.length);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetTransactions, increaseOffsetAndLimit } =
  transactionSlice.actions;

export default transactionSlice.reducer;
