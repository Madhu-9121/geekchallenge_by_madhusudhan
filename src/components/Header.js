import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Header = ({ cartItems }) => {
  const cartItemCount = cartItems.length;
  return (
    <nav className="nav-container">
      <div className="inner">
        <div className="inner-body">
          <Link to="/" className="link">
            <div className="logo">
              TeeRex <span>Store</span>
            </div>
          </Link>
        </div>
        <ul className="menus">
          <Link to="/" className="productIcon">
            <li>Products</li>
          </Link>
          <Link to="/cart" className="link">
            <li className="cart-icon">
              {cartItemCount > 0 && (
                <div className="cart-count">{cartItemCount}</div>
              )}
              <AiOutlineShoppingCart />
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
