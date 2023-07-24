import React, { useState, useEffect, useContext } from "react";
import Header from "./Header";
import { Cart } from "./context";
import "./cartstyles.css";

const CartComponent = () => {
  const { state, dispatch } = useContext(Cart);
  const { cart } = state;
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate the total price of items in the cart whenever the cart changes
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    setTotalPrice(totalPrice);
  }, [cart]);

  return (
    <div className="cart-container">
      <Header cartItems={cart} />
      <h3 style={{ marginTop: "130px" }}>Shopping Cart</h3>
      <ul className="cart-items">
        {cart.length > 0 ? (
          cart.map((item) => (
            <li className="cart-item" key={item.id}>
              <img src={item.imageURL} alt={item.name} />
              <div className="product-details-cart">
                <div className="name">{item.name}</div>
                <div className="price">${item.price}</div>
              </div>
              <div className="quantity-left">
                {item.quantity - item.qty === 0 ? (
                  <span className="out">Out of Stock</span>
                ) : (
                  `only ${item.quantity - item.qty} more left`
                )}
              </div>
              <div className="quantity">
                <button
                  onClick={() => {
                    dispatch({
                      type: "increment",
                      payload: item
                    });
                  }}
                  className="inc-dec-btn"
                >
                  +
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => {
                    dispatch({
                      type: "decrement",
                      payload: item
                    });
                  }}
                  className="inc-dec-btn"
                >
                  -
                </button>
              </div>
              <button
                onClick={() => {
                  dispatch({
                    type: "removeFromCart",
                    payload: item
                  });
                }}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <div className="empty-cart">
            <h3>Cart is Empty</h3>
            <h5>Click on products to add</h5>
          </div>
        )}
      </ul>
      <div className="total-price">
        <h3>Total: {totalPrice}</h3>
      </div>
    </div>
  );
};

export default CartComponent;
