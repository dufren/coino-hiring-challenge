import classes from "../../sassStyles/componentStyles/ProductsList.module.scss";

import type { ProductType } from "../../Types";

import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../app/api/apiSlice";
import { PulseLoader } from "react-spinners";

import SingleProduct from "./SingleProduct";
import Search from "../../components/Search";

const ProductsList = () => {
  const { data, isLoading, isError, isSuccess } =
    useGetProductsQuery(undefined);

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    data && setProducts(data.products);
  }, [data]);

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <PulseLoader size={50} color={"#1ecad3"} />
      </div>
    );
  }

  if (isError) {
    return <p className={classes.loader}>something went wrong...</p>;
  }

  if (isSuccess) {
    const results = products.map((product) => (
      <SingleProduct product={product} key={product.id} />
    ));

    const content = results?.length ? (
      results
    ) : (
      <p className={classes.main__content__nomatch}>No Matching Product</p>
    );

    return (
      <main className={classes.main}>
        <nav className={classes.main__search}>
          <Search data={data.products} setProducts={setProducts} />
        </nav>
        <div
          className={`${classes.main__content} ${
            !results?.length ? classes.empty : ""
          }`}
        >
          {content}
        </div>
      </main>
    );
  }
};

export default ProductsList;
