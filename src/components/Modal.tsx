import React from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { updateCart } from "../features/cart/cartSlice";
import { addToFav } from "../features/favorites/favoritesSlice";
import classes from "../sassStyles/componentStyles/Modal.module.scss";
import { ProductType } from "../Types";

type Props = {
  modalOpen: boolean;
  product: ProductType;
  inFav: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amount: number;
};

const Modal: React.FC<Props> = ({
  modalOpen,
  product,
  inFav,
  setModalOpen,
  amount,
}) => {
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

  const removeAndFavHandle = () => {
    dispatch(addToFav(product));
    dispatch(updateCart({ product, amount: -amount }));
    toastNotify(`${product.title} removed and favorited`);
    setModalOpen(false);
  };

  const removeFromCartHandle = () => {
    dispatch(updateCart({ product, amount: -amount }));
    toastNotify(`${product.title} removed and favorited`);

    setModalOpen(false);
  };

  return (
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
  );
};

export default Modal;
