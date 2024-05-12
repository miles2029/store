// ProductCard.js
import React from "react";
import PropTypes from "prop-types";
import "../css/product-card.css";

function ProductCard({ name, price, image, onClick }) {
  return (
    <div className="ProductCard" onClick={onClick}>
      <img src={image} alt={name} />
      <div>
        <h4>{name}</h4>
        <p>$ {price}</p>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ProductCard;
