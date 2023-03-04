import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType, Cart } from "../../Types";

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

      state.totalAmount += 1;
      state.totalPrice += action.payload.price;

      localStorage.setItem("cartState", JSON.stringify(state));
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

      if (cartItem != undefined) {
        state.totalAmount -= 1;
        state.totalPrice -= cartItem?.product.price;
      }

      localStorage.setItem("cartState", JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const cartItem = state.cartList.find(
        (item) => item.product.id === action.payload
      );

      if (cartItem != undefined) {
        state.totalAmount -= 1;
        state.totalPrice -= cartItem?.product.price;
      }

      state.cartList = state.cartList.filter(
        (item) => item.product.id !== action.payload
      );

      localStorage.setItem("cartState", JSON.stringify(state));
    },
  },
});

export const { addToCart, decrementCartItem, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
