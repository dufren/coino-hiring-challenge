import React from "react";
import classes from "../../sassStyles/componentStyles/ProductsList.module.scss";
import { ProductType } from "../../Types";
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../app/api/apiSlice";
import { PulseLoader } from "react-spinners";
import SingleProduct from "./SingleProduct";
import Search from "../../components/Search";

import { useAppSelector } from "../../app/hooks";
import { ToastContainer } from "react-toastify";

const ProductsList = () => {
  const { data, isLoading, isError, isSuccess } =
    useGetProductsQuery(undefined); // rtk query's fetch function. basically data is reponse

  const [products, setProducts] = useState<ProductType[]>([]);

  const favList = useAppSelector((store) => store.favorites.favorites); // for checking in fav
  const cartList = useAppSelector((store) => store.cart.cartList); // for checking in cart

  useEffect(() => {
    // data comes undefined. when fetch is done data changes and useeffect catching it
    data && setProducts(data.products);
  }, [isSuccess]);

  let content;

  if (isLoading) {
    // while data is getting fetch displaying loader
    content = (
      <div className={classes.loader}>
        <PulseLoader size={50} color={"#1ecad3"} />
      </div>
    );
  }

  if (isError) {
    // when fetch operation gets error displaying error
    content = <p className={classes.loader}>something went wrong...</p>;
  }

  if (isSuccess) {
    // all the action stars here
    // mapping all the products to single component to handle it easily
    const results = products.map((product) => (
      <SingleProduct
        product={product}
        inFav={favList.some((p) => p.id === product.id)}
        inCart={cartList.some((p) => p.product.id === product.id)}
        key={product.id}
      />
    ));
    // if there is nothing to display
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
        <ToastContainer />
      </main>
    );
  }

  return content ?? <div></div>;
};

export default ProductsList;
