import classes from "../sassStyles/componentStyles/Header.module.scss";

import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <img
          className={classes.header__content__logo}
          src="../../public/coino-logo.svg"
          alt="coino-logo"
        />

        <nav className={classes.header__content__nav}>
          <ul className={`${!isMenuOpen ? classes.close : ""}`}>
            <li>
              <a href="">Products</a>
            </li>

            <li>
              <a href="">Favorites</a>
            </li>
            <li>
              <a href="">Cart</a>
            </li>
          </ul>
        </nav>

        <div className={classes.header__content__toggler}>
          {!isMenuOpen ? (
            <BiMenuAltRight onClick={() => setIsMenuOpen(!isMenuOpen)} />
          ) : (
            <AiOutlineClose onClick={() => setIsMenuOpen(!isMenuOpen)} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
