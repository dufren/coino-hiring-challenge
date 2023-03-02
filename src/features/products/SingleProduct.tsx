import classes from "../../sassStyles/componentStyles/Product.module.scss";
import { AiFillStar } from "react-icons/ai";
import type { ProductType2 } from "../../Types";

const SingleProduct = ({ product }: ProductType2) => {
  return (
    <div className={classes.card}>
      <img
        src={product.images[0]}
        alt={product.title}
        className={classes.card__image}
      />
      <div className={classes.card__content}>
        <h2 className={classes.card__content__title}>{product.title}</h2>
        <p className={classes.card__content__brand}>{product.brand}</p>
        <div className={classes.card__content__price}>${product.price}</div>
        <button className={classes.card__content__button}>Add to cart</button>
      </div>
    </div>
  );
};

export default SingleProduct;
