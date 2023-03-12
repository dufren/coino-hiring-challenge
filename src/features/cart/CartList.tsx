import React, { useEffect, useRef } from "react";
import classes from "../../sassStyles/componentStyles/CartList.module.scss";
import SingleProduct from "../products/SingleProduct";
import { useAppSelector } from "../../app/hooks";
import { ToastContainer } from "react-toastify";
import autoAnimate from "@formkit/auto-animate";

const CartList = () => {
  const favList = useAppSelector((store) => store.favorites.favorites);
  const cartList = useAppSelector((store) => store.cart.cartList);
  const totalPrice = useAppSelector((store) => store.cart.totalPrice);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

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
      <h1>Total Price: ${totalPrice}</h1>
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

export default CartList;
