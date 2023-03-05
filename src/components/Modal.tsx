import React from "react";
import { useAppDispatch } from "../app/hooks";
import { updateCart } from "../features/cart/cartSlice";
import { addToFav } from "../features/favorites/favoritesSlice";
import { ProductType } from "../Types";
import { toast } from "react-toastify";
import classes from "../sassStyles/componentStyles/Modal.module.scss";

type Props = {
  modalOpen: boolean;
  setModalOpen: (arg0: boolean) => void;
  product: ProductType;
  inFav: boolean;
  amount: number;
};

const Modal: React.FC<Props> = ({
  modalOpen,
  setModalOpen,
  product,
  inFav,
  amount,
}) => {
  const dispatch = useAppDispatch();

  const toastNotify = (message: string) => {
    // notification purposes
    toast.info(`${message}`, {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const modalRemoveAndFavHandle = () => {
    // works when the modal is open
    dispatch(addToFav(product));
    dispatch(updateCart({ product, amount: -amount }));
    toastNotify(`${product.title} removed and favorited`);
    setModalOpen(false);
  };

  const modalRemoveFromCartHandle = () => {
    // works when the modal is open
    dispatch(updateCart({ product: product, amount: -amount })); //-amount equals the amount at the store. so basically  removes it.
    toastNotify(`${product.title} removed from cart!`);
  };

  return (
    <div className={`${classes.modal} ${modalOpen ? classes.open : ""}`}>
      <div className={classes.modal__content}>
        <h2>Are you sure you want to remove the product from the cart?</h2>
        <p>{product.title}</p>
        <div className={classes.modal__content__buttons}>
          <button
            onClick={modalRemoveFromCartHandle}
            className={classes.modal__content__buttons__btn}
          >
            Remove from cart
          </button>
          {!inFav && (
            <button
              onClick={modalRemoveAndFavHandle}
              className={classes.modal__content__buttons__btn}
            >
              Remove and add to favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
