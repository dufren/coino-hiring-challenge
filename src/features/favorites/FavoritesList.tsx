import classes from "../../sassStyles/componentStyles/FavoritesList.module.scss";

import SingleProduct from "../products/SingleProduct";

import { useAppSelector } from "../../app/hooks";

const FavoritesList = () => {
  const favoriteList = useAppSelector((store) => store.favorites.favorites);

  const results = favoriteList.map((product) => (
    <SingleProduct product={product} key={product.id} />
  ));

  const content = results?.length ? (
    results
  ) : (
    <p>There is no favorite product</p>
  );

  return (
    <main
      className={`${classes.main} ${!results?.length ? classes.empty : ""}`}
    >
      <h1>Favorites</h1>
      <div className={classes.main__content}>{content}</div>
    </main>
  );
};

export default FavoritesList;
