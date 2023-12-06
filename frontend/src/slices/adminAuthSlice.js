import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
};

const adminauthSlice = createSlice({
  name: "authAdmin",
  initialState,
  reducers: {
    setCredentialsAdmin: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    logoutAdmin: (state) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const { setCredentialsAdmin, logoutAdmin } = adminauthSlice.actions;

export default adminauthSlice.reducer;
