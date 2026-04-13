import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ruyani from "./Ruyani";
import ProductDetails from "./ProductDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ruyani />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
