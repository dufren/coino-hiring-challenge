import classes from "../../sassStyles/componentStyles/Product.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import { AiFillStar } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

import type { PropDataType } from "../../Types";

import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addToFav } from "../favorites/favoritesSlice";
import { addToCart } from "../cart/cartSlice";

const SingleProduct = ({ product }: PropDataType) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToFav, setIsAddedToFav] = useState(false);

  useEffect(() => {
    setIsAddedToFav(
      localStorage.getItem(String(product.id)) !== null
        ? JSON.parse(localStorage.getItem(String(product.id)) ?? "")
        : false
    );
  }, [isAddedToFav]);

  const dispatch = useAppDispatch();

  const addToFavHandle = () => {
    !isAddedToFav
      ? localStorage.setItem(String(product.id), JSON.stringify(!isAddedToFav))
      : localStorage.removeItem(String(product.id));
    dispatch(addToFav(product));

    setIsAddedToFav(!isAddedToFav);

    if (!isAddedToFav) {
      toast.success(`${product.title} added to favorites`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warn(`${product.title} removed from favorites`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const addToCartHandle = () => {
    setIsAddedToCart(true);
    dispatch(addToCart(product));
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
          {isAddedToFav ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
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

        <button
          onClick={addToCartHandle}
          className={classes.card__content__button}
        >
          {isAddedToCart ? "Added to cart" : "Add to cart"}
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SingleProduct;
