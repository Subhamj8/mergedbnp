import { Product, ProductCategory } from '../types';
import { mockProducts, mockCategories } from '../data/mockData';

// Get all products with optional filtering
export const getProducts = async (
  categoryId?: string,
  search?: string,
  minPrice?: number,
  maxPrice?: number,
  page = 1,
  limit = 12
): Promise<{ products: Product[]; total: number }> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredProducts = [...mockProducts];
  
  // Apply filters
  if (categoryId) {
    filteredProducts = filteredProducts.filter(p => p.categoryId === categoryId);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
  }
  
  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.minPrice >= minPrice);
  }
  
  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.maxPrice <= maxPrice);
  }
  
  // Get total count before pagination
  const total = filteredProducts.length;
  
  // Apply pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  filteredProducts = filteredProducts.slice(start, end);
  
  return { products: filteredProducts, total };
};

// Get single product by ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const product = mockProducts.find(p => p.id === productId);
  return product || null;
};

// Get product categories
export const getCategories = async (): Promise<ProductCategory[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return mockCategories;
};

// Get related products (in the same category)
export const getRelatedProducts = async (productId: string, limit = 4): Promise<Product[]> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const product = mockProducts.find(p => p.id === productId);
  if (!product) return [];
  
  return mockProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== productId)
    .slice(0, limit);
};