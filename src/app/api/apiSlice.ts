import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ProductData } from "../../Types";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductData, undefined>({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = apiSlice;
