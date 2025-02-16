import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api";

// Ambil token dari localStorage
const token = localStorage.getItem("token");

// Async Thunk untuk fetch balance
export const fetchBalance = createAsyncThunk(
  "balance/fetchBalance",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/balance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balance: "",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.balance = action.payload.balance;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default balanceSlice.reducer;
