import { createSlice } from "@reduxjs/toolkit";

export const userReducers = createSlice({
  name: "userReducers",
  initialState: {
    user: {},
    token: {
      value: "",
    },
    isAuthenticated: {},
  },
  reducers: {
    updateUser(state, action) {
      state.user = action.payload;
    },
    updateToken(state, action) {
      state.token = action.payload;
    },
    updateAuth(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { updateUser, updateToken, updateAuth } = userReducers.actions;

export default userReducers.reducer;
