import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../../Types";

type addressList = {
  addresses: ProductType[];
};

const initialStateLocal = // checking localstorage to keep data in cache
  localStorage.getItem("addressState") !== null
    ? JSON.parse(localStorage.getItem("addressState") || "")
    : null;

const initialState: addressList = {
  addresses: initialStateLocal === null ? [] : initialStateLocal.favorites,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
});

//export const { } = addressSlice.actions;

export default addressSlice.reducer;
