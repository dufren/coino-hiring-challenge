import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Cart, CardUpdate as CardUpdateAction } from "../../utils/Types";

const initialStateLocal = // checking localstorage to keep data in cache
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
      //update function. addes, removes, increments and decrements
      let cartItem = state.cartList.find(
        // first checkes the item
        (item) => item.product.id === action.payload.product.id
      );

      if (cartItem == undefined) {
        // if there is no item adding it
        cartItem = {
          product: action.payload.product,
          amount: 0, // amount 0 because every time amount is updates either item is existed or not
        };
        state.cartList.push(cartItem);
      }

      cartItem.amount += action.payload.amount;

      if (0 >= cartItem.amount) {
        // if item amount goes under 0, removes from list
        state.cartList = state.cartList.filter(
          (p) => p.product.id !== action.payload.product.id
        );
      }

      state.totalAmount += action.payload.amount;
      state.totalPrice += cartItem?.product.price * action.payload.amount;

      localStorage.setItem("cartState", JSON.stringify(state)); // keep updated local storage
    },
  },
});

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
