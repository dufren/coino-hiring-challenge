import React, { useState, useEffect } from "react";
import classes from "../../sassStyles/componentStyles/Product.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { AiFillStar } from "react-icons/ai";
import { MdOutlineFavorite } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { ProductType } from "../../utils/Types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToFav } from "../favorites/favoritesSlice";
import { updateCart } from "../cart/cartSlice";
import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal";
import { toastNotify } from "../../components/ToastNotify";

type Props = {
  product: ProductType;
  inFav: boolean; // rendering purposes
  inCart: boolean; // rendering purposes
};

const SingleProduct: React.FC<Props> = ({ product, inFav, inCart }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [modalOpen, setModalOpen] = useState(false);

  const cart = useAppSelector((store) => store.cart.cartList);
  const amount = cart.find((p) => p.product.id === product.id)?.amount ?? 0;

  const addToFavHandle = () => {
    // handles add function for favorites.
    dispatch(addToFav(product));

    if (!inFav) {
      toastNotify(`${product.title} added to favorites!`);
    } else {
      toastNotify(`${product.title} removed from favorites!`);
    }
  };

  const addToCartHandle = () => {
    // handles add and increment function.
    dispatch(updateCart({ product: product, amount: 1 })); // 1 amount for increment operation, if there is no item same with prop, its pushing it.
    toastNotify(`${product.title} added to cart!`);
  };

  const decrementCartItemHandle = () => {
    // handles decrement function.
    if (inCart) {
      dispatch(updateCart({ product: product, amount: -1 })); // -1 amount for decrement operation.
      toastNotify(`${product.title} removed from cart!`);
    }
  };

  const removeFromCartHandle = () => {
    // handles remove function.
    if (location.pathname === "/cart") {
      setModalOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      dispatch(updateCart({ product: product, amount: -amount })); //-amount equals the amount at the store. so basically  removes it.
      toastNotify(`${product.title} removed from cart!`);
    }
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
          {inFav ? <TiTick /> : <MdOutlineFavorite />}
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

        {location.pathname === "/cart" && (
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
      </div>

      {/* modal, only displays when url changes to /cart and modalOpen should be true */}
      {modalOpen && location.pathname === "/cart" && (
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={product}
          inFav={inFav}
          amount={amount}
        />
      )}
    </div>
  );
};

export default SingleProduct;
