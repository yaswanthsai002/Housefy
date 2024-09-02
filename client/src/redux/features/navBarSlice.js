import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: null,
};

const navBarSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = navBarSlice.actions;

export default navBarSlice.reducer;
