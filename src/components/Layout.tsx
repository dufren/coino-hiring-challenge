import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

import classes from "../sassStyles/componentStyles/Layout.module.scss";
import Footer from "./Footer";

const Layout = () => {
  const [theme, setTheme] = useState("dark");

  return (
    // layout exists to be able to set up nested structre
    <div className={classes.container} data-theme={theme}>
      <Header theme={theme} setTheme={setTheme} />
      <div className={classes.container__content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
