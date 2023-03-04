import React from "react";
import classes from "../../sassStyles/componentStyles/Product.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { AiFillStar } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { ProductType } from "../../Types";
import { useAppDispatch } from "../../app/hooks";
import { addToFav } from "../favorites/favoritesSlice";
import { addToCart, decrementCartItem } from "../cart/cartSlice";

type Props = {
  product: ProductType;
  inFav: boolean;
  inCart: boolean;
};

const SingleProduct: React.FC<Props> = ({ product, inFav, inCart }) => {
  const dispatch = useAppDispatch();

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
    if (!inCart) {
      dispatch(addToCart(product));
      toastNotify(`${product.title} added to cart!`);
    } else {
      toastNotify(`${product.title} already in cart!`);
    }
  };

  const decrementCartItemHandle = () => {
    if (inCart) {
      dispatch(decrementCartItem(product.id));
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
              onClick={decrementCartItemHandle}
              className={classes.card__content__button}
            >
              Remove from cart
            </button>
          )}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default SingleProduct;
