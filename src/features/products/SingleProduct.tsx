import React, { useState } from "react";
import classes from "../../sassStyles/componentStyles/Product.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { AiFillStar } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { ProductType } from "../../Types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToFav } from "../favorites/favoritesSlice";
import { updateCart } from "../cart/cartSlice";

type Props = {
  product: ProductType;
  inFav: boolean;
  inCart: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SingleProduct: React.FC<Props> = ({
  product,
  inFav,
  inCart,
  setModalOpen,
}) => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((store) => store.cart.cartList);
  const amount = cart.find((p) => p.product.id === product.id)?.amount ?? 0;

  const toastNotify = (message: string) => {
    toast.info(`${message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const addToFavHandle = () => {
    dispatch(addToFav(product));

    if (!inFav) {
      toastNotify(`${product.title} added to favorites!`);
    } else {
      toastNotify(`${product.title} removed from favorites!`);
    }
  };

  const addToCartHandle = () => {
    dispatch(updateCart({ product: product, amount: 1 }));
    toastNotify(`${product.title} added to cart!`);
  };

  const decrementCartItemHandle = () => {
    if (inCart) {
      dispatch(updateCart({ product: product, amount: -1 }));
      toastNotify(`${product.title} removed from cart!`);
    }
  };

  const removeFromCartHandle = () => {
    dispatch(updateCart({ product: product, amount: -amount }));
    setModalOpen(true);
    toastNotify(`${product.title} removed from cart!`);
  };

  return (
    <div className={classes.card}>
      <div className={classes.card__upper}>
        <img
          src={product.images[0]}
          alt={product.title}
          className={classes.card__upper__image}
        />
        <button onClick={addToFavHandle} className={classes.card__upper__fav}>
          {inFav ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
        </button>
      </div>

      <div className={classes.card__content}>
        <h2 className={classes.card__content__title}>{product.title}</h2>

        <p className={classes.card__content__brand}>{product.brand}</p>

        <span className={classes.card__content__rating}>
          <AiFillStar className={classes.card__content__rating__star} />
          {product.rating}
        </span>

        <div className={classes.card__content__price}>${product.price}</div>
        <div>
          {!inCart ? (
            <button
              onClick={addToCartHandle}
              className={classes.card__content__button}
            >
              Add to cart
            </button>
          ) : (
            <button
              onClick={removeFromCartHandle}
              className={classes.card__content__button}
            >
              Remove from cart
            </button>
          )}
        </div>

        {inCart && (
          <div className={classes.card__content__incart}>
            <button
              onClick={decrementCartItemHandle}
              className={classes.card__content__button__cart__inc}
            >
              -
            </button>
            <span>{amount}</span>
            <button
              onClick={addToCartHandle}
              className={classes.card__content__button__cart__dec}
            >
              +
            </button>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default SingleProduct;
