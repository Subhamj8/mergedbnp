import { User, Cart } from '../types';

// User storage
export const storeUser = (user: User): void => {
  localStorage.setItem('printmaster_user', JSON.stringify(user));
};

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('printmaster_user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr) as User;
  } catch (error) {
    console.error('Failed to parse stored user', error);
    return null;
  }
};

export const removeStoredUser = (): void => {
  localStorage.removeItem('printmaster_user');
};

// Cart storage
export const storeCart = (cart: Cart): void => {
  localStorage.setItem('printmaster_cart', JSON.stringify(cart));
};

export const getStoredCart = (): Cart | null => {
  const cartStr = localStorage.getItem('printmaster_cart');
  if (!cartStr) return null;
  
  try {
    return JSON.parse(cartStr) as Cart;
  } catch (error) {
    console.error('Failed to parse stored cart', error);
    return null;
  }
};

// Product view history
export const addToViewHistory = (productId: string): void => {
  const historyStr = localStorage.getItem('printmaster_view_history');
  let history: string[] = [];
  
  if (historyStr) {
    try {
      history = JSON.parse(historyStr);
    } catch (error) {
      console.error('Failed to parse view history', error);
    }
  }
  
  // Add productId to the beginning and ensure no duplicates
  history = [productId, ...history.filter(id => id !== productId)];
  
  // Limit history to 10 items
  if (history.length > 10) {
    history = history.slice(0, 10);
  }
  
  localStorage.setItem('printmaster_view_history', JSON.stringify(history));
};

export const getViewHistory = (): string[] => {
  const historyStr = localStorage.getItem('printmaster_view_history');
  if (!historyStr) return [];
  
  try {
    return JSON.parse(historyStr);
  } catch (error) {
    console.error('Failed to parse view history', error);
    return [];
  }
};