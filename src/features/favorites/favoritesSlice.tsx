import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../../Types";

type favList = {
  favorites: ProductType[];
};

const initialStateLocal =
  localStorage.getItem("favState") !== null
    ? JSON.parse(localStorage.getItem("favState") || "")
    : [];

const initialState: favList = {
  favorites: initialStateLocal === null ? [] : initialStateLocal.favorites,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFav: (state, action: PayloadAction<ProductType>) => {
      const isExisted = state.favorites.some(
        (item) => item.id === action.payload.id
      );

      if (!isExisted) {
        state.favorites.push(action.payload);
      } else {
        state.favorites = state.favorites.filter(
          (item) => item.id !== action.payload.id
        );
      }

      localStorage.setItem("favState", JSON.stringify(state));
    },
  },
});

export const { addToFav } = favoritesSlice.actions;

export default favoritesSlice.reducer;
