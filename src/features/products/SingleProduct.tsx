import classes from "../../sassStyles/componentStyles/Product.module.scss";
import { AiFillStar } from "react-icons/ai";
import type { ProductType2 } from "../../Types";

const SingleProduct = ({ product }: ProductType2) => {
  return (
    <div className={classes.card}>
      <img
        src={product.images[0]}
        alt="thumbnail"
        className={classes.card__logo}
      />
      <div className={classes.card__content}>
        <h1>{product.title}</h1>
        <h4>
          <AiFillStar className={classes.card__content__star} />
          <span>{product.rating}</span>
        </h4>
        <div className={classes.card__content__bottom}>
          <h2>${product.price}</h2>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
