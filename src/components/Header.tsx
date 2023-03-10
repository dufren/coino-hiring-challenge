import classes from "../sassStyles/componentStyles/Header.module.scss";

import { BiMenuAltRight, BiSun, BiMoon } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

type Props = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

const Header: React.FC<Props> = ({ theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [width, setWidth] = useState(0);

  const location = useLocation();
  const amount = useAppSelector((store) => store.cart.totalAmount);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (width > 1024 && isMenuOpen) {
      setIsMenuOpen(false);
    }

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [width, isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const setThemeLight = () => {
    setTheme("light");
    localStorage.setItem("theme", JSON.stringify("light"));
  };

  const setThemeDark = () => {
    setTheme("dark");
    localStorage.setItem("theme", JSON.stringify("dark"));
  };

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <h1 className={classes.header__content__logo}>
          <Link to={"/"}>COINO</Link>
        </h1>

        <nav className={classes.header__content__nav}>
          <ul className={`${isMenuOpen ? classes.open : classes.close}`}>
            <li>
              <Link to={"/"}>Products</Link>
            </li>

            <li>
              <Link to={"/favorites"}>Favorites</Link>
            </li>
            <li>
              <div>
                <Link to={"/cart"}>
                  Cart <span>({amount > 0 ? amount : "empty"})</span>
                </Link>
              </div>
            </li>
            <li>
              <Link to={"/address"}>Address</Link>
            </li>
            <li>
              {theme === "dark" ? (
                <BiSun
                  onClick={setThemeLight}
                  className={classes.header__content__nav__toggler}
                />
              ) : (
                <BiMoon
                  onClick={setThemeDark}
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
