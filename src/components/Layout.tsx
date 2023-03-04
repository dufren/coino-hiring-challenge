import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

import classes from "../sassStyles/componentStyles/Layout.module.scss";

const Layout = () => {
  const [theme, setTheme] = useState("dark");

  return (
    <div className={classes.container} data-theme={theme}>
      <Header theme={theme} setTheme={setTheme} />
      <div className={classes.container__content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
