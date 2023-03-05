import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductsList from "./features/products/ProductsList";
import FavoritesList from "./features/favorites/FavoritesList";
import CartList from "./features/cart/CartList";
import AddressList from "./features/address/AddressList";

function App() {
  return (
    // nested rootes
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ProductsList />} />
        <Route path="favorites" element={<FavoritesList />} />
        <Route path="cart" element={<CartList />} />
        <Route path="address" element={<AddressList />} />
      </Route>
    </Routes>
  );
}

export default App;
