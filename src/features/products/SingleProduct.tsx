import React, { useState } from "react";
import classes from "../../sassStyles/componentStyles/Product.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { AiFillStar } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { ProductType } from "../../Types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToFav } from "../favorites/favoritesSlice";
import { updateCart } from "../cart/cartSlice";
import { useLocation } from "react-router-dom";

type Props = {
  product: ProductType;
  inFav: boolean;
  inCart: boolean;
};

const SingleProduct: React.FC<Props> = ({ product, inFav, inCart }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [modalOpen, setModalOpen] = useState(false);

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
    if (location.pathname === "/cart") {
      setModalOpen(true);
    } else {
      dispatch(updateCart({ product: product, amount: -amount }));
      toastNotify(`${product.title} removed from cart!`);
    }
  };

  const removeAndFavHandle = () => {
    dispatch(addToFav(product));
    dispatch(updateCart({ product, amount: -amount }));
    toastNotify(`${product.title} removed and favorited`);
    setModalOpen(false);
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

      {modalOpen && location.pathname === "/cart" && (
        <div className={`${classes.modal} ${modalOpen ? classes.open : ""}`}>
          <div className={classes.modal__content}>
            <h2>Ürünü sepetten kaldırmak istediğinize emin misiniz?</h2>
            <p>{product.title}</p>
            <div className={classes.modal__content__buttons}>
              <button
                onClick={removeFromCartHandle}
                className={classes.modal__content__buttons__btn}
              >
                Remove from cart
              </button>
              {!inFav && (
                <button
                  onClick={removeAndFavHandle}
                  className={classes.modal__content__buttons__btn}
                >
                  Remove and add to favorites
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
