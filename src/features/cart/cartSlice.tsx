import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../../Types";

type cartList = {
  cart: ProductType[];
};

const initialCartItems =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems") || "")
    : [];

const initialState: cartList = {
  cart: initialCartItems,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const isExisted = state.cart.some(
        (item) => item.id === action.payload.id
      );

      if (!isExisted) {
        state.cart.push(action.payload);
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cart.map((item) => item))
      );
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
