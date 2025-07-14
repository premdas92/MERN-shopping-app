import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, getProductById } from "../api/productApi";

export const getProducts = createAsyncThunk(
  "/products/getProducts",
  async ({ category = "", page = 1, limit = 10 }, thunkAPI) => {
    try {
      const res = await fetchProducts(category, page, limit);
      return res;
    } catch (err) {
      return (
        thunkAPI.rejectWithValue(err?.response?.data?.error) ||
        "Failed to fetch products"
      );
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "/products/getProductById",
  async ({ id }, thunkAPI) => {
    try {
      const res = await getProductById(id);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.error || "Failed to fetch product detail"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    error: null,
    productDetail: null,
    loadingDetail: false,
    errorDetail: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data || [];
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.loadingDetail = true;
        state.errorDetail = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.productDetail = action.payload || null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.errorDetail = action.payload;
      });
  },
});

export default productSlice.reducer;
