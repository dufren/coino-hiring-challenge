import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AddressValue } from "../../utils/Types";
type addressList = {
  addresses: AddressValue[];
};

const initialStateLocal = // checking localstorage to keep data in cache
  localStorage.getItem("addressState") !== null
    ? JSON.parse(localStorage.getItem("addressState") || "")
    : null;

const initialState: addressList = {
  addresses: initialStateLocal === null ? [] : initialStateLocal.addresses,
};

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    addToAddress: (state, action: PayloadAction<AddressValue>) => {
      const isExisted = state.addresses.some(
        //checks for is existed in list
        (item) => item.name === action.payload.name
      );

      if (!isExisted) {
        // if not adds
        state.addresses.push(action.payload);
      }
      localStorage.setItem("addressState", JSON.stringify(state)); // keep updated local storage
    },
  },
});

export const { addToAddress } = addressSlice.actions;

export default addressSlice.reducer;
