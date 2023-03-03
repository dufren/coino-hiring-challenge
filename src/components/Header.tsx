import classes from "../sassStyles/componentStyles/Header.module.scss";

import { BiMenuAltRight, BiSun, BiMoon } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import React, { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const Header: React.FC<Props> = ({ theme, setTheme }) => {
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
              <Link to={"/"}>Products</Link>
            </li>

            <li>
              <Link to={"/favorites"}>Favorites</Link>
            </li>
            <li>
              <Link to={"/cart"}>Cart</Link>
            </li>
            <li>
              {theme === "dark" ? (
                <BiSun
                  onClick={() => setTheme("light")}
                  className={classes.header__content__nav__toggler}
                />
              ) : (
                <BiMoon
                  onClick={() => setTheme("dark")}
                  className={classes.header__content__nav__toggler}
                />
              )}
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
