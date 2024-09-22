import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { signInSuccess, signOutSuccess, updateUser } = userSlice.actions;

export default userSlice.reducer;
