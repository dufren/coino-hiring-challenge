import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../app/api/apiSlice";
import { PulseLoader } from "react-spinners";

import classes from "../../sassStyles/componentStyles/ProductsList.module.scss";

import type { ProductType } from "../../Types";
import SingleProduct from "./SingleProduct";

const ProductsList = () => {
  const { data, isLoading, isError, isSuccess } =
    useGetProductsQuery(undefined);

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    data && setProducts(data.products);
  }, [data]);

  let content;

  if (isLoading) content = <PulseLoader size={50} color={"#1ecad3"} />;

  if (isError) {
    return (content = <p>something went wrong...</p>);
  }

  if (isSuccess) {
    content =
      products?.length &&
      products.map((product) => (
        <SingleProduct product={product} key={product.id} />
      ));
  }

  return (
    <main className={classes.main}>
      <nav className={classes.main__search}>search bar and dropdown menu</nav>
      <div className={classes.main__content}>{content}</div>
    </main>
  );
};

export default ProductsList;
