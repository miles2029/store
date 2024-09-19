import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import ProductDetailPage from "../src/components/ProductDetailPage";
import Error404 from "../src/components/Error404";
import Cart from "../src/components/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<HomePage cartItemCount={cartItems.length} />}
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetailPage
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
            />
          }
        />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;
