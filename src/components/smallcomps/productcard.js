import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import "./styles.css";

const ProductCard = ({ productInfo, handleAddToCart }) => {
  const { name, imageURL, price, gender, quantity, color, id } = productInfo;
  const [addedToCart, setAddedToCart] = useState(false); // State to track if product is added to cart

  const handleAddToCartClick = () => {
    if (!addedToCart) {
      handleAddToCart(productInfo); // Call the prop function to add the product to the cart
      setAddedToCart(true); // Update the state to indicate that the product is added to cart
    }
  };

  return (
    <div className="productCard">
      <div className="productImage">
        <img src={imageURL} alt={name} className="hide" />
      </div>
      <div className="product-details">
        {name} for {gender}
        <span>{color}</span>
      </div>
      <div className="card-footer">
        <div className="price">
          ${price}
          {!quantity ? (
            <span className="empty">Out of Stock</span>
          ) : (
            <span>Only {quantity} in stock</span>
          )}
        </div>
        <button
          className="checkout"
          onClick={handleAddToCartClick}
          disabled={addedToCart}
        >
          {addedToCart ? "Added to Cart" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
