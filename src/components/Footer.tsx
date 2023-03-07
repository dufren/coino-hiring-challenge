import React from "react";
import classes from "../sassStyles/componentStyles/Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <hr />
      <p>
        <span>&copy; 2023 </span>
        <Link target="_blank" to="https://www.linkedin.com/in/ozgur-cokceken/">
          Özgür Çokçeken
        </Link>
        <br />
        <Link target="_blank" to="mailto:ozgurcokckn@gmail.com">
          For Contact
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
