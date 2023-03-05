import classes from "../sassStyles/componentStyles/Header.module.scss";

import { BiMenuAltRight, BiSun, BiMoon } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const Header: React.FC<Props> = ({ theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMenuOpen]);

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <h1 className={classes.header__content__logo}>COINO</h1>

        <nav className={classes.header__content__nav}>
          <ul className={`${!isMenuOpen ? classes.close : ""}`}>
            <li>
              <Link to={"/"}>Products</Link>
            </li>

            <li>
              <Link to={"/favorites"}>Favorites</Link>
            </li>
            <li>
              <div>
                <Link to={"/cart"}>Cart</Link>
              </div>
            </li>
            <li>
              <Link to={"/address"}>Address</Link>
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
