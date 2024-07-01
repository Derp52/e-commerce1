import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemAmount, setItemAmount] = useState(0);

  useEffect(() => {
    const totalAmount = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(totalAmount);
    setItemAmount(cart.reduce((acc, item) => acc + item.amount, 0));
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const increaseAmount = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseAmount = (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, amount: Math.max(1, item.amount - 1) } : item
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseAmount, decreaseAmount, clearCart, total, itemAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;



