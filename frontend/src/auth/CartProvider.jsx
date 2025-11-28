import React, { useState, useCallback } from "react";
import { CartContext } from "./CartContext.js";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = useCallback((productToAdd) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item._id === productToAdd._id);

      if (existingItem) {
        return prev.map((item) =>
          item._id === productToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          _id: productToAdd._id,
          name: productToAdd.name || productToAdd.nombre,
          price: productToAdd.price || productToAdd.precio,
          imageUrl: productToAdd.imageUrl || productToAdd.ruta,
          quantity: 1,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((id, newQty) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === id ? { ...item, quantity: Math.max(newQty, 1) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

