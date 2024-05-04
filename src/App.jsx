// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/components/homepage";
import ProductDetailPage from "../src/components/ProductDetailPage";
import Error404 from "../src/components/Error404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/product" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
