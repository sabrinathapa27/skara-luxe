// context/CartContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const CART_STORAGE_KEY = "saree_cart_items";
  const isInitialMount = useRef(true);

  // Load cart from localStorage only once on initial render
  const loadCartFromStorage = () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      return [];
    }
  };

  const [cartItems, setCartItems] = useState(() => loadCartFromStorage());

  // Debounced save to localStorage - only save when cart actually changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Use setTimeout to debounce the localStorage save
    const saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(saveTimeout);
  }, [cartItems]);

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    // Your existing addToCart logic
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            selectedSize,
            selectedColor,
            quantity,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  const updateQuantity = (productId, size, color, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // Add this function to get cart items safely
  const getCartItems = () => {
    return [...cartItems];
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
