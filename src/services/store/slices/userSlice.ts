import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URI } from "../../config";

interface IInitialState {
  userDetails: any;
  isLoading: boolean;
}

const initialState: IInitialState = {
  userDetails: null,
  isLoading: true,
};

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
     
      if (!token) throw new Error("No token found");

      const response = await axios.get(`${BASE_URI}auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Session expired");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    logout: (state) => {
      state.userDetails = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload.data.userData;
        state.isLoading = false;
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.userDetails = null;
        state.isLoading = false;
      });
  },
});

export const { setUserDetails, logout } = userSlice.actions;

export default userSlice.reducer;
