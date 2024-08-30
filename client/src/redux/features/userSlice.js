import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { signInSuccess } = userSlice.actions;

export default userSlice.reducer;
