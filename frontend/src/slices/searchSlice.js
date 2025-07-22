import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchProducts } from "../api/searchApi";

export const fetchSearchResults = createAsyncThunk(
  "/products/searchProducts",
  async ({ q }, thunkAPI) => {
    try {
      const res = await searchProducts(q);
      return res.data?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.error || "Failed to search products"
      );
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = "";
      state.results = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.results = [];
      });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;