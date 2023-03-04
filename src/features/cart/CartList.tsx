import React from "react";
import classes from "../../sassStyles/componentStyles/CartList.module.scss";
import SingleProduct from "../products/SingleProduct";
import { useAppSelector } from "../../app/hooks";

const CartList = () => {
  const favList = useAppSelector((store) => store.favorites.favorites);
  const cartList = useAppSelector((store) => store.cart.cartList);

  const results = cartList.map((cartItem) => (
    <SingleProduct
      inFav={favList.some((p) => p.id === cartItem.product.id)}
      inCart={cartList.some((p) => p.product.id === cartItem.product.id)}
      product={cartItem.product}
      key={cartItem.product.id}
    />
  ));

  const content = results?.length ? (
    results
  ) : (
    <p>There is no product in cart</p>
  );

  return (
    <main className={classes.main}>
      <h1>Cart</h1>
      <div
        className={`${classes.main__content} ${
          !results?.length ? classes.empty : ""
        }`}
      >
        {content}
      </div>
    </main>
  );
};

export default CartList;
