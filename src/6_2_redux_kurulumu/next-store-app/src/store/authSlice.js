const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: null,
  access: null,
  refresh: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
