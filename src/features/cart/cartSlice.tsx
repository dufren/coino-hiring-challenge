import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType, Cart } from "../../Types";

const initialCartList =
  localStorage.getItem("cartList") !== null
    ? JSON.parse(localStorage.getItem("cartList") || "")
    : [];

const initialState: Cart = {
  cartList: initialCartList,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const isExisted = state.cartList.some(
        (item) => item.product.id === action.payload.id
      );

      if (!isExisted) {
        state.cartList.push({ product: action.payload, amount: 1 });
      } else {
        const cartItem = state.cartList.find(
          (item) => item.product.id === action.payload.id
        );

        if (cartItem != undefined) cartItem.amount += 1;
      }

      localStorage.setItem(
        "cartList",
        JSON.stringify(state.cartList.map((item) => item))
      );
    },
    decrementCartItem: (state, action: PayloadAction<number>) => {
      const cartItem = state.cartList.find(
        (item) => item.product.id === action.payload
      );

      if (cartItem != undefined) {
        cartItem.amount -= 1;

        if (0 >= cartItem.amount) {
          state.cartList = state.cartList.filter(
            (item) => item.product.id !== action.payload
          );
        }
      }

      localStorage.setItem(
        "cartList",
        JSON.stringify(state.cartList.map((item) => item))
      );
    },
  },
});

export const { addToCart, decrementCartItem } = cartSlice.actions;

export default cartSlice.reducer;
