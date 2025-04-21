import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  isProductAddSelected: boolean;
  productType: any;
}

const initialState: IInitialState = {
  userDetails: null,
  isLoading: true,
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
        console.log('action.payload.data.userData: ', action.payload.data.userData);
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
