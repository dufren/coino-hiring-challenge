import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../../Types";

type favList = {
  favorites: ProductType[];
};

const initialFavItems =
  localStorage.getItem("favItems") !== null
    ? JSON.parse(localStorage.getItem("favItems") || "")
    : [];

const initialState: favList = {
  favorites: initialFavItems,
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

      localStorage.setItem(
        "favItems",
        JSON.stringify(state.favorites.map((item) => item))
      );
    },
  },
});

export const { addToFav } = favoritesSlice.actions;

export default favoritesSlice.reducer;
