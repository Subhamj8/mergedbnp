import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartItem } from '../types';
import { getStoredCart, storeCart } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

interface CartContextType {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartEmpty: boolean;
}

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0,
};

const CartContext = createContext<CartContextType>({
  cart: initialCart,
  addToCart: () => {},
  removeFromCart: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
  isCartEmpty: true,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(initialCart);
  
  useEffect(() => {
    const storedCart = getStoredCart();
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Update cart totals
  const updateCartTotals = (items: CartItem[]): Cart => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // Assuming 10% tax rate
    const shipping = items.length > 0 ? 10 : 0; // Flat shipping rate
    const total = subtotal + tax + shipping;

    return {
      items,
      subtotal,
      tax,
      shipping,
      total,
    };
  };

  // Add item to cart
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newCart = { ...cart };
    
    // Check if the item already exists with the same variant and customizations
    const existingItemIndex = newCart.items.findIndex(
      (i) => i.productId === item.productId && 
             i.variantId === item.variantId &&
             JSON.stringify(i.customizations) === JSON.stringify(item.customizations)
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      newCart.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      newCart.items.push({
        ...item,
        id: uuidv4(),
      });
    }

    const updatedCart = updateCartTotals(newCart.items);
    setCart(updatedCart);
    storeCart(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    const newItems = cart.items.filter((item) => item.id !== itemId);
    const updatedCart = updateCartTotals(newItems);
    setCart(updatedCart);
    storeCart(updatedCart);
  };

  // Update item quantity
  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const newItems = cart.items.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity };
      }
      return item;
    });

    const updatedCart = updateCartTotals(newItems);
    setCart(updatedCart);
    storeCart(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    setCart(initialCart);
    storeCart(initialCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        isCartEmpty: cart.items.length === 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};