import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../api/cartApi";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (__dirname, thunkAPI) => {
    try {
      const res = await getCart();
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch cart"
      );
    }
  }
);

export const addToCartThunk = createAsyncThunk(
  "cart/addTocart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await addToCart({ productId, quantity });
      console.log(res);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to add item to the cart"
      );
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateToCart",
  async ({ productId, quantity }, thunkAPI) => {
    try {
      const res = await updateCartItem({ productId, quantity });
      return res.data.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to update item in the cart"
      );
    }
  }
);

export const deleteCartItemThunk = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ productId }, thunkAPI) => {
    try {
      const res = await removeCartItem({ productId });
      return res?.cart;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.error || "Failed to remove cart item"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {
    updateItemFromSocket: (state, action) => {
      const item = action.payload;
      const index = state.cartItems.findIndex(
        (i) => i.productId === item.productId
      );
      if (index >= 0) {
        state.cartItems[index].quantity = item.quantity;
      } else {
        state.cartItems.push(item);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateItemFromSocket, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
