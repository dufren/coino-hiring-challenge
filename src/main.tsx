import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./sassStyles/main.module.scss";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
