import React from "react";
import classes from "../../sassStyles/componentStyles/ProductsList.module.scss";
import { ProductType } from "../../Types";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../app/api/apiSlice";
import { PulseLoader } from "react-spinners";
import SingleProduct from "./SingleProduct";
import Search from "../../components/Search";

import { useAppSelector } from "../../app/hooks";

const ProductsList = () => {
  const { data, isLoading, isError, isSuccess } =
    useGetProductsQuery(undefined);

  const [products, setProducts] = useState<ProductType[]>([]);

  const favList = useAppSelector((store) => store.favorites.favorites);
  const cartList = useAppSelector((store) => store.cart.cartList);

  useEffect(() => {
    data && setProducts(data.products);
  }, [data]);

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <PulseLoader size={50} color={"#1ecad3"} />
      </div>
    );
  }

  if (isError) {
    return <p className={classes.loader}>something went wrong...</p>;
  }

  if (isSuccess) {
    const results = products.map((product) => (
      <SingleProduct
        product={product}
        inFav={favList.some((p) => p.id === product.id)}
        inCart={cartList.some((p) => p.product.id === product.id)}
        key={product.id}
      />
    ));

    const content = results?.length ? (
      results
    ) : (
      <p className={classes.main__content__nomatch}>No Matching Product</p>
    );

    return (
      <main className={classes.main}>
        <nav className={classes.main__search}>
          <Search data={data.products} setProducts={setProducts} />
        </nav>
        <div
          className={`${classes.main__content} ${
            !results?.length ? classes.empty : ""
          }`}
        >
          {content}
        </div>
      </main>
    );
  }
};

export default ProductsList;
