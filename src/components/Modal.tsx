import React from "react";
import { useAppDispatch } from "../app/hooks";
import { updateCart } from "../features/cart/cartSlice";
import { addToFav } from "../features/favorites/favoritesSlice";
import { ProductType } from "../utils/Types";
import classes from "../sassStyles/componentStyles/Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { toastNotify } from "./ToastNotify";

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
    setModalOpen(false);
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
        <button className={classes.modal__content__close}>
          <AiOutlineClose onClick={() => setModalOpen(false)} />
        </button>
      </div>
    </div>
  );
};

export default Modal;
