import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    siginInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { siginInSuccess } = userSlice.actions;

export default userSlice.reducer;
