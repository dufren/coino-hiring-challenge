import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductsList from "./features/products/ProductsList";
import FavoritesList from "./features/favorites/FavoritesList";
import CartList from "./features/cart/CartList";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ProductsList />} />
        <Route path="favorites" element={<FavoritesList />} />
        <Route path="cart" element={<CartList />} />
      </Route>
    </Routes>
  );
}

export default App;
