import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ruyani from "./Ruyani";
import ProductDetails from "./ProductDetails";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Ruyani />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
