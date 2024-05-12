import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../css/product-card.css";
import "../css/cart.css";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PF9Fd2MA5ECHB0FcEZnRW6Onmhvyh71ogiA73iMQ9uj7pdqJdReth20276L1654dBYZ1Kd0Bq8oZkFEqdesH7ZI00amanQeKE"
);

function Cart({ cartItems }) {
  const handleCheckout = async (item) => {
    const stripe = await stripePromise;

    // Send a request to the backend to create a checkout session
    const response = await fetch(
      "http://localhost:4000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName: item.name, price: item.price * 100 }),
      }
    );

    if (response.ok) {
      const session = await response.json();

      // Redirect to the Stripe Checkout page
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      console.error("Error creating checkout session");
    }
  };

  return (
    <>
      <div className="Homepage">
        <div>
          <div>
            <Link to="/product" className="link">
              <h1>Jordan</h1>
            </Link>
            <p>Shoes</p>
          </div>
        </div>
      </div>
      <div className="Cart">
        <div>
          <h2>Cart</h2>
        </div>
        {cartItems.length === 0 ? (
          <p className="cart-empty">Cart is empty</p>
        ) : (
          <ul className="ProductCardList">
            {cartItems.map((item) => (
              <li key={item.id} className="ProductCard">
                <div className="ProductCard__image">
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/it-sysarch32-store-maratas.appspot.com/o/${encodeURIComponent(
                      item.imagePath
                    )}?alt=media`}
                    alt={item.name}
                  />
                </div>
                <div className="ProductCard__details">
                  <div>
                    <p>{item.name}</p>
                  </div>
                  <p>{item.brand}</p>
                  <p>Size: {item.size}</p>
                  <p>Price: ${item.price}</p>
                  <button onClick={() => handleCheckout(item)}>Checkout</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      imagePath: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Cart;
