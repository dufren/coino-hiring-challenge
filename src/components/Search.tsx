import classes from "../sassStyles/componentStyles/Search.module.scss";

import React, { useRef } from "react";
import { ProductType } from "../Types";

type Props = {
  data: ProductType[];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
};

const Search: React.FC<Props> = ({ data, setProducts }) => {
  const sortValue = useRef<HTMLSelectElement>(null);
  const searchValue = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) =>
    e.preventDefault();

  function filterProducts(data: ProductType[]) {
    //searches the list
    const searchString = searchValue?.current?.value?.toLocaleLowerCase() ?? "";

    const filteredProducts = data.filter((product) => {
      return product.title.toLocaleLowerCase().includes(searchString);
    });
    return filteredProducts;
  }

  function sortProducts(filteredProducts: ProductType[]) {
    //sortes the list
    const key = sortValue?.current?.value.split("-") ?? "";
    const sortKey = key[0] as keyof ProductType;
    const sortOrder = key[1];

    filteredProducts.sort((a: ProductType, b: ProductType) => {
      const valueA = a[sortKey] as number;
      const valueB = b[sortKey] as number;

      return (valueA - valueB) * (sortOrder === "desc" ? -1 : 1);
    });
  }

  const filterAndSort = () => {
    // either filter or sort, they work together to stay updated when the other one works
    const filteredProducts = filterProducts(data);
    sortProducts(filteredProducts);
    setProducts(filteredProducts);
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <label htmlFor="sort"></label>
      <select
        ref={sortValue}
        className={classes.form__select}
        onChange={filterAndSort}
        name="sort"
        id="sort"
      >
        <option value="rating-asc">Rating - Low to High</option>
        <option value="rating-desc">Rating - High to Low</option>
        <option value="price-asc">Price - Low to High</option>
        <option value="price-desc">Price - High to Low</option>
      </select>

      <input
        ref={searchValue}
        className={classes.form__input}
        type="text"
        onChange={filterAndSort}
        placeholder="Search..."
      />
    </form>
  );
};

export default Search;
