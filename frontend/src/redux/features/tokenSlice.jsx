import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: {
      access: null,
      refresh: null,
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.token = { ...action.payload };
    },
    clearToken: (state) => {
      state.token = initialState.token;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;
