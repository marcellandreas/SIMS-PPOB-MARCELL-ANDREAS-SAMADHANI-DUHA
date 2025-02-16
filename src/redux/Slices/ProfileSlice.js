import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../api";

// Ambil token dari localStorage
const token = localStorage.getItem("token");

// Async Thunk untuk fetch profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    try {
      const response = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Async Thunk untuk update profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData) => {
    const response = await axios.put(
      "https://take-home-test-api.nutech-integrasi.com/profile/update",
      profileData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data;
  }
);

// Async Thunk untuk update foto profil
export const updateProfileImage = createAsyncThunk(
  "profile/updateProfileImage",
  async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    const response = await axios.put(
      `https://take-home-test-api.nutech-integrasi.com/profile/image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    first_name: "",
    last_name: "",
    email: "",
    profile_image: "/images/Profile Photo.png",
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.first_name = action.payload?.first_name;
        state.last_name = action.payload?.last_name;
        state.email = action.payload?.email;
        state.profile_image = action.payload?.profile_image;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.first_name = action.payload.first_name;
        state.last_name = action.payload.last_name;
        state.email = action.payload.email;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateProfileImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile_image = action.payload.profile_image;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
