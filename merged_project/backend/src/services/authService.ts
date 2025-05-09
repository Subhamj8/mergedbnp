import { User } from '../types';
import { mockUsers } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

// This is a mock implementation that would be replaced with actual API calls

export const loginUser = async (email: string, password: string): Promise<User> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user with matching email
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // In a real app, we would verify the password hash here
  // For this mock, we'll assume any password works
  
  return user;
};

export const registerUser = async (userData: Partial<User> & { password: string }): Promise<User> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user with this email already exists
  const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email?.toLowerCase());
  
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user (in a real app, this would be saved to a database)
  const newUser: User = {
    id: uuidv4(),
    email: userData.email || '',
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    role: userData.role || 'customer',
    createdAt: new Date().toISOString(),
    company: userData.company,
    phone: userData.phone,
    address: userData.address,
  };
  
  // Add to mock users (this would be a database operation in a real app)
  mockUsers.push(newUser);
  
  return newUser;
};

export const logoutUser = async (): Promise<void> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, this would invalidate the session/token on the server
  
  return;
};