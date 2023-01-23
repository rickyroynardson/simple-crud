import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
  },
  reducers: {
    login: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
