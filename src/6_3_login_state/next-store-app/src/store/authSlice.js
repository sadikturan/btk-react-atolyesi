import { login } from "@/lib/api";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  user: null,
  access: null,
  refresh: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login(email, password);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.access = token.access;
        state.refresh = token.refresh;
        state.isAuthenticated = true;
        state.loading = false;

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("access", token.access);
          localStorage.setItem("refresh", token.refresh);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
