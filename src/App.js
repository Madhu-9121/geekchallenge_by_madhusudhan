import React from "react";
import { Routes, Route } from "react-router-dom";
import Context from "./components/context";
import "./styles.css";
import Products from "./components/Products";
import CartComponent from "./components/Cart";

export default function App() {
  return (
    <div className="App">
      <Context>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<CartComponent />} />
        </Routes>
      </Context>
    </div>
  );
}
  