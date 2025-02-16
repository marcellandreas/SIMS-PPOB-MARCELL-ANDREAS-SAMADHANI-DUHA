import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api";
const token = localStorage.getItem("token");

// Async Thunk untuk melakukan top-up
export const fetchTopUp = createAsyncThunk(
  "topup/fetchTopUp",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/topup`,
        { top_up_amount: amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Terjadi kesalahan");
    }
  }
);

const topupSlice = createSlice({
  name: "topup",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    resetTopUpState: (state) => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopUp.pending, (state) => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(fetchTopUp.fulfilled, (state) => {
        console.log("berhalan slice");
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(fetchTopUp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetTopUpState } = topupSlice.actions;
export default topupSlice.reducer;
