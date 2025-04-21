import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isProductAddSelected: boolean;
  productType: any;
  userDetails: any; // Added userDetails
  isLoading: boolean; // Added isLoading
}

const initialState: IInitialState = {
  userDetails: null,
  isLoading: true,
};

const fetchUserDetails = async () => {
  // Define fetchUserDetails function
  // ...implementation...
};

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
        state.userDetails = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUserDetails, logout } = userSlice.actions;

export default userSlice.reducer;
