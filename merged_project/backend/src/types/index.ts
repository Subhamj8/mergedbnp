// Common Types
export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  company?: string;
  phone?: string;
  address?: Address;
};

export type UserRole = 'customer' | 'vendor' | 'admin';

export type Address = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type ProductVariant = {
  id: string;
  name: string;
  description?: string;
  price: number;
  options: {
    size?: string;
    color?: string;
    material?: string;
    quantity?: number;
    [key: string]: any;
  };
  inStock: boolean;
  leadTime: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  vendorId: string;
  featuredImage: string;
  images: string[];
  variants: ProductVariant[];
  minPrice: number;
  maxPrice: number;
  hasDesignOptions: boolean;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string;
  designId?: string;
  customizations?: Record<string, any>;
};

export type Cart = {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
};

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  notes?: string;
};

export type Design = {
  id: string;
  userId: string;
  productId: string;
  name: string;
  preview: string;
  elements: any[];
  createdAt: string;
  updatedAt: string;
};

// Vendor Analytics
export type VendorAnalytics = {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: {
    productId: string;
    productName: string;
    sales: number;
    quantity: number;
  }[];
  salesByPeriod: {
    period: string;
    amount: number;
  }[];
};

// Admin Dashboard
export type AdminAnalytics = {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  recentOrders: Order[];
  topProducts: {
    productId: string;
    productName: string;
    sales: number;
  }[];
  salesByPeriod: {
    period: string;
    amount: number;
  }[];
};

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type Toast = {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
};