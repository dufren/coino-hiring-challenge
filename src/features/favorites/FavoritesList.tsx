import React from "react";
import classes from "../../sassStyles/componentStyles/FavoritesList.module.scss";
import SingleProduct from "../products/SingleProduct";
import { useAppSelector } from "../../app/hooks";
import { ToastContainer } from "react-toastify";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const FavoritesList = () => {
  const favList = useAppSelector((store) => store.favorites.favorites);
  const cartList = useAppSelector((store) => store.cart.cartList);

  const [parent] = useAutoAnimate();

  const results = favList.map((favItem) => (
    <SingleProduct
      inFav={favList.some((p) => p.id === favItem.id)}
      inCart={cartList.some((p) => p.product.id === favItem.id)}
      product={favItem}
      key={favItem.id}
    />
  ));

  const content = results?.length ? (
    results
  ) : (
    <p>There is no favorite product</p>
  );

  return (
    <main className={classes.main}>
      <h1>Favorites</h1>
      <div
        ref={parent}
        className={`${classes.main__content} ${
          !results?.length ? classes.empty : ""
        }`}
      >
        {content}
      </div>
      <ToastContainer />
    </main>
  );
};

export default FavoritesList;
