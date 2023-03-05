import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../../Types";

type favList = {
  favorites: ProductType[];
};

const initialStateLocal = // checking localstorage to keep data in cache
  localStorage.getItem("favState") !== null
    ? JSON.parse(localStorage.getItem("favState") || "")
    : null;

const initialState: favList = {
  favorites: initialStateLocal === null ? [] : initialStateLocal.favorites,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFav: (state, action: PayloadAction<ProductType>) => {
      // toggler add and remove function
      const isExisted = state.favorites.some(
        //checks for is existed in list
        (item) => item.id === action.payload.id
      );

      if (!isExisted) {
        // if not addes
        state.favorites.push(action.payload);
      } else {
        // if in list, removes
        state.favorites = state.favorites.filter(
          (item) => item.id !== action.payload.id
        );
      }

      localStorage.setItem("favState", JSON.stringify(state)); // keep updated local storage
    },
  },
});

export const { addToFav } = favoritesSlice.actions;

export default favoritesSlice.reducer;
