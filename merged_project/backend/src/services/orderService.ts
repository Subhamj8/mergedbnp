import { Order, Cart, Address } from '../types';
import { mockOrders } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

// Get orders for a user
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockOrders.filter(order => order.userId === userId);
};

// Get a single order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const order = mockOrders.find(order => order.id === orderId);
  return order || null;
};

// Create a new order
export const createOrder = async (
  userId: string,
  cart: Cart,
  shippingAddress: Address,
  billingAddress: Address,
  paymentMethod: string
): Promise<Order> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const now = new Date().toISOString();
  
  const newOrder: Order = {
    id: uuidv4(),
    userId,
    items: [...cart.items],
    status: 'pending',
    subtotal: cart.subtotal,
    tax: cart.tax,
    shipping: cart.shipping,
    total: cart.total,
    shippingAddress,
    billingAddress,
    paymentMethod,
    createdAt: now,
    updatedAt: now,
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  };
  
  // In a real app, this would be saved to a database
  mockOrders.push(newOrder);
  
  return newOrder;
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: Order['status']): Promise<Order> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const orderIndex = mockOrders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) {
    throw new Error('Order not found');
  }
  
  const updatedOrder = {
    ...mockOrders[orderIndex],
    status,
    updatedAt: new Date().toISOString(),
  };
  
  // Update the mock data
  mockOrders[orderIndex] = updatedOrder;
  
  return updatedOrder;
};