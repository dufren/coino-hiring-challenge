import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Cart, CardUpdate as CardUpdateAction } from "../../Types";

const initialStateLocal =
  localStorage.getItem("cartState") !== null
    ? JSON.parse(localStorage.getItem("cartState") || "")
    : null;

const initialState: Cart = {
  cartList: initialStateLocal === null ? [] : initialStateLocal.cartList,
  totalPrice: initialStateLocal === null ? 0 : initialStateLocal.totalPrice,
  totalAmount: initialStateLocal === null ? 0 : initialStateLocal.totalAmount,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CardUpdateAction>) => {
      let cartItem = state.cartList.find(
        (item) => item.product.id === action.payload.product.id
      );

      if (cartItem == undefined) {
        cartItem = {
          product: action.payload.product,
          amount: 0,
        };
        state.cartList.push(cartItem);
      }

      cartItem.amount += action.payload.amount;

      if (0 >= cartItem.amount) {
        state.cartList = state.cartList.filter(
          (p) => p.product.id !== action.payload.product.id
        );
      }

      state.totalAmount += action.payload.amount;
      state.totalPrice += cartItem?.product.price * action.payload.amount;

      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
