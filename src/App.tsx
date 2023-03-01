import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProductsList from "./products/ProductsList";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ProductsList />} />
      </Route>
    </Routes>
  );
}

export default App;
