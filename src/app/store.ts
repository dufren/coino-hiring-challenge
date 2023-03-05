import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import cartReducer from "../features/cart/cartSlice";
import addressReducer from "../features/address/addressSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    address: addressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
