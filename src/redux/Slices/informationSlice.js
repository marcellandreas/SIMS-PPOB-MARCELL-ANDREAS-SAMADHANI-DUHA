import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api";

// Ambil token dari localStorage
const token = localStorage.getItem("token");

// Async Thunk untuk fetch banner
export const fetchBanner = createAsyncThunk(
  "information/fetchBanner",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/banner`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchServices = createAsyncThunk(
  "information/fetchServices",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const informationsSlice = createSlice({
  name: "informations",
  initialState: {
    banner: [],
    services: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banner = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default informationsSlice.reducer;
