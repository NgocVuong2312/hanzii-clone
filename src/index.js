import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Menu from "./components/Header";
import Footer from "./components/Footer";
import "/node_modules/primeflex/primeflex.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import { RouteComponent } from "./route";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Menu />
    <RouteComponent />
    <Footer />
  </BrowserRouter>
);
