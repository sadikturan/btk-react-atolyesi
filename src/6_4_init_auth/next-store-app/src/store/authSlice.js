import { login, register } from "@/lib/api";

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

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await register(formData);
      return data;
    } catch (error) {
      let messages = [];

      if (error.response?.data) {
        Object.entries(error.response?.data).forEach(([key, errs]) => {
          if (Array.isArray(errs)) {
            messages.push(`${key}: ${errs.join(" ")}`);
          } else {
            messages.push(`${key}: ${errs}`);
          }
        });
      }

      return rejectWithValue(messages.join(" | ") || "Register failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserFromStorage: (state) => {
      const user = localStorage.getItem("user");
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      if (user && refresh && access) {
        state.user = JSON.parse(user);
        state.access = access;
        state.refresh = refresh;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    const fullfilledHandler = (state, action) => {
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
    };
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, fullfilledHandler)
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, fullfilledHandler)
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
