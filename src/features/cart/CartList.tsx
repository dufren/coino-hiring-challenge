import React, { useState } from "react";
import classes from "../../sassStyles/componentStyles/CartList.module.scss";
import SingleProduct from "../products/SingleProduct";
import { useAppSelector } from "../../app/hooks";
import { ToastContainer } from "react-toastify";

const CartList = () => {
  const favList = useAppSelector((store) => store.favorites.favorites);
  const cartList = useAppSelector((store) => store.cart.cartList);
  const totalPrice = useAppSelector((store) => store.cart.totalPrice);

  const [modalOpen, setModalOpen] = useState(false);

  const results = cartList.map((cartItem) => (
    <SingleProduct
      setModalOpen={setModalOpen}
      inFav={favList.some((p) => p.id === cartItem.product.id)}
      inCart={cartList.some((p) => p.product.id === cartItem.product.id)}
      product={cartItem.product}
      key={cartItem.product.id}
    />
  ));
  console.log(modalOpen);
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
        className={`${classes.main__content} ${
          !results?.length ? classes.empty : ""
        }`}
      >
        {content}
      </div>

      <div className={`${classes.modal} ${modalOpen ? classes.open : ""}`}>
        <div className={classes.modal__content}>
          <h2>modal title</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt a
            exercitationem tempore officia dolore ea tenetur labore corporis,
            quia, saepe eum placeat rem cupiditate nemo! Deleniti ipsum suscipit
            sed veniam!
          </p>
        </div>
        <div className={classes.modal__buttons}>
          <button className={classes.modal__buttons__btn}>btn1</button>
          <button className={classes.modal__buttons__btn}>btn2</button>
        </div>
      </div>

      <ToastContainer />
    </main>
  );
};

export default CartList;
