// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { showNotification } = useNotification();

  useEffect(() => {
    const savedCart = localStorage.getItem('skaraLuxeCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
        localStorage.removeItem('skaraLuxeCart');
      }
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('skaraLuxeCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1, size = 'Standard', color = '') => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && 
                item.selectedSize === size && 
                item.selectedColor === color
      );

      if (existingItemIndex !== -1) {
        // Update quantity if same product with same size and color exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, {
          ...product,
          quantity,
          selectedSize: size,
          selectedColor: color,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  const removeFromCart = (itemId, size = 'Standard', color = '') => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === itemId && 
          item.selectedSize === size && 
          item.selectedColor === color)
      )
    );
  };

  const updateQuantity = (itemId, size, color, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, size, color);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        (item.id === itemId && item.selectedSize === size && item.selectedColor === color)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartItemCount = (productId, size, color) => {
    const item = cartItems.find(item => 
      item.id === productId && 
      item.selectedSize === size && 
      item.selectedColor === color
    );
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getCartItemCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};