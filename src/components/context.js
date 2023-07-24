import { createContext, useEffect, useReducer } from "react";

export const Cart = createContext();

const Context = ({ children }) => {
  const cartReducer = (state, action) => {
    switch (action.type) {
      case "addToCart":
        const itemInCart = state.cart.find(
          (item) => item.id === action.payload.id
        );
        if (itemInCart) {
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          };
        } else {
          return {
            ...state,
            cart: [...state.cart, { ...action.payload, qty: 1 }]
          };
        }
      case "removeFromCart":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id)
        };
      case "increment":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id && item.qty < item.quantity
              ? { ...item, qty: item.qty + 1 }
              : item
          )
        };
      case "decrement":
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id && item.qty > 1
              ? { ...item, qty: item.qty - 1 }
              : item
          )
        };
      default:
        return state;
    }
  };

  const initialCartItems = () => {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  };

  const [state, dispatch] = useReducer(cartReducer, {
    cart: initialCartItems()
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
  }, [state.cart]);

  return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>;
};

export default Context;
