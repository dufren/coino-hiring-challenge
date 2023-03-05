import React from "react";
import { Link } from "react-router-dom";
import classes from "../sassStyles/componentStyles/NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={classes.notfound}>
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <nav>
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/address">Address</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NotFound;
