import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser, login, logout, signup } from "../api/authApi";

export const signupuserThunk = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await signup({ name, email, password });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Signup failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const data = await logout();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Logout failed"
      );
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, thunkAPI) => {
    try {
      const data = await fetchUser();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch user profile"
      );
    }
  }
);

const initialState = {
  user: null,
  signedUpUser: null,
  loading: false,
  error: null,
  profileLoaded: false,
  profileLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.profileLoaded = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // PROFILE FETCH
      .addCase(getUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = action.payload;
        state.profileLoaded = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload;
        state.profileLoaded = true;
        state.user = null;
      })
      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.profileLoaded = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // SIGNUP
      .addCase(signupuserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupuserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.signedUpUser = action.payload;
      })
      .addCase(signupuserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
