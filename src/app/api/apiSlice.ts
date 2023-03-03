import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DataType } from "../../Types";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<DataType, undefined>({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = apiSlice;
