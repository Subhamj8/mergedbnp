import { User, Product, ProductCategory, Order } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@printmaster.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'vendor@printmaster.com',
    firstName: 'Vendor',
    lastName: 'User',
    role: 'vendor',
    company: 'Quality Prints Inc.',
    createdAt: '2023-01-10T00:00:00Z',
  },
  {
    id: '3',
    email: 'customer@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'customer',
    createdAt: '2023-02-15T00:00:00Z',
    address: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
    },
  },
];

// Mock Categories
export const mockCategories: ProductCategory[] = [
  {
    id: 'cat-1',
    name: 'Business Cards',
    slug: 'business-cards',
    description: 'Professional business cards in various sizes and finishes.',
    image: 'https://images.pexels.com/photos/6508959/pexels-photo-6508959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'cat-2',
    name: 'Flyers & Brochures',
    slug: 'flyers',
    description: 'High-quality flyers and brochures for effective marketing.',
    image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'cat-3',
    name: 'Banners & Signs',
    slug: 'banners',
    description: 'Eye-catching banners and signs for indoor and outdoor use.',
    image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'cat-4',
    name: 'Branded Stationery',
    slug: 'stationery',
    description: 'Professional stationery including letterheads, envelopes, and more.',
    image: 'https://images.pexels.com/photos/5702281/pexels-photo-5702281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'cat-5',
    name: 'Promotional Items',
    slug: 'promotional',
    description: 'Custom promotional products to boost your brand.',
    image: 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 'cat-6',
    name: 'Custom Packaging',
    slug: 'packaging',
    description: 'Bespoke packaging solutions for your products.',
    image: 'https://images.pexels.com/photos/4397833/pexels-photo-4397833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Business Cards',
    slug: 'premium-business-cards',
    description: 'Make a lasting impression with our premium business cards. Choose from various paper stocks, finishes, and sizes to create the perfect card that represents your brand. Our high-quality printing ensures vibrant colors and sharp details.',
    shortDescription: 'High-quality business cards with premium finishes.',
    categoryId: 'cat-1',
    vendorId: '2',
    featuredImage: 'https://images.pexels.com/photos/6508959/pexels-photo-6508959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/6508959/pexels-photo-6508959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6177595/pexels-photo-6177595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    variants: [
      {
        id: 'var-1-1',
        name: 'Standard Matte (100)',
        price: 24.99,
        options: {
          size: 'Standard (3.5" x 2")',
          material: 'Matte',
          quantity: 100
        },
        inStock: true,
        leadTime: '3-5 business days'
      },
      {
        id: 'var-1-2',
        name: 'Standard Glossy (100)',
        price: 29.99,
        options: {
          size: 'Standard (3.5" x 2")',
          material: 'Glossy',
          quantity: 100
        },
        inStock: true,
        leadTime: '3-5 business days'
      },
      {
        id: 'var-1-3',
        name: 'Premium Matte (250)',
        price: 49.99,
        options: {
          size: 'Standard (3.5" x 2")',
          material: 'Premium Matte',
          quantity: 250
        },
        inStock: true,
        leadTime: '5-7 business days'
      },
      {
        id: 'var-1-4',
        name: 'Deluxe Spot UV (500)',
        price: 99.99,
        options: {
          size: 'Standard (3.5" x 2")',
          material: 'Spot UV',
          quantity: 500
        },
        inStock: true,
        leadTime: '7-10 business days'
      }
    ],
    minPrice: 24.99,
    maxPrice: 99.99,
    hasDesignOptions: true,
    averageRating: 4.8,
    reviewCount: 124,
    createdAt: '2023-03-10T00:00:00Z',
    updatedAt: '2023-03-10T00:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'Tri-Fold Brochures',
    slug: 'tri-fold-brochures',
    description: 'Showcase your products and services with our high-quality tri-fold brochures. Perfect for marketing campaigns, trade shows, and direct mail. Our brochures are printed on premium paper with vibrant colors that make your brand stand out.',
    shortDescription: 'Professional tri-fold brochures for effective marketing.',
    categoryId: 'cat-2',
    vendorId: '2',
    featuredImage: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5632365/pexels-photo-5632365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5702283/pexels-photo-5702283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    variants: [
      {
        id: 'var-2-1',
        name: 'Standard (100)',
        price: 89.99,
        options: {
          size: '8.5" x 11" (Letter)',
          material: '100lb Gloss Text',
          quantity: 100
        },
        inStock: true,
        leadTime: '5-7 business days'
      },
      {
        id: 'var-2-2',
        name: 'Premium (250)',
        price: 179.99,
        options: {
          size: '8.5" x 11" (Letter)',
          material: '100lb Gloss Text',
          quantity: 250
        },
        inStock: true,
        leadTime: '5-7 business days'
      },
      {
        id: 'var-2-3',
        name: 'Deluxe (500)',
        price: 299.99,
        options: {
          size: '8.5" x 11" (Letter)',
          material: '100lb Gloss Text',
          quantity: 500
        },
        inStock: true,
        leadTime: '7-10 business days'
      }
    ],
    minPrice: 89.99,
    maxPrice: 299.99,
    hasDesignOptions: true,
    averageRating: 4.6,
    reviewCount: 87,
    createdAt: '2023-03-15T00:00:00Z',
    updatedAt: '2023-03-15T00:00:00Z'
  },
  {
    id: 'prod-3',
    name: 'Vinyl Banners',
    slug: 'vinyl-banners',
    description: 'Durable vinyl banners for indoor and outdoor advertising. These eye-catching banners are printed with UV-resistant inks for long-lasting color and include metal grommets for easy hanging. Perfect for trade shows, retail displays, and special events.',
    shortDescription: 'High-quality vinyl banners for indoor and outdoor use.',
    categoryId: 'cat-3',
    vendorId: '2',
    featuredImage: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4195331/pexels-photo-4195331.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    variants: [
      {
        id: 'var-3-1',
        name: 'Small (2\' x 4\')',
        price: 39.99,
        options: {
          size: '2\' x 4\'',
          material: '13oz Vinyl',
          quantity: 1
        },
        inStock: true,
        leadTime: '3-5 business days'
      },
      {
        id: 'var-3-2',
        name: 'Medium (3\' x 6\')',
        price: 69.99,
        options: {
          size: '3\' x 6\'',
          material: '13oz Vinyl',
          quantity: 1
        },
        inStock: true,
        leadTime: '3-5 business days'
      },
      {
        id: 'var-3-3',
        name: 'Large (4\' x 8\')',
        price: 99.99,
        options: {
          size: '4\' x 8\'',
          material: '13oz Vinyl',
          quantity: 1
        },
        inStock: true,
        leadTime: '5-7 business days'
      }
    ],
    minPrice: 39.99,
    maxPrice: 99.99,
    hasDesignOptions: true,
    averageRating: 4.7,
    reviewCount: 62,
    createdAt: '2023-03-20T00:00:00Z',
    updatedAt: '2023-03-20T00:00:00Z'
  },
  {
    id: 'prod-4',
    name: 'Letterhead & Envelopes',
    slug: 'letterhead-envelopes',
    description: 'Professional letterhead and matching envelopes for your business correspondence. Printed on premium paper with crisp, clear graphics to make a lasting impression. Customize with your logo, contact information, and brand colors.',
    shortDescription: 'Professional letterhead and envelopes for your business.',
    categoryId: 'cat-4',
    vendorId: '2',
    featuredImage: 'https://images.pexels.com/photos/5702281/pexels-photo-5702281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/5702281/pexels-photo-5702281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5702369/pexels-photo-5702369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    variants: [
      {
        id: 'var-4-1',
        name: 'Letterhead (100)',
        price: 59.99,
        options: {
          type: 'Letterhead',
          material: '70lb Uncoated Text',
          quantity: 100
        },
        inStock: true,
        leadTime: '3-5 business days'
      },
      {
        id: 'var-4-2',
        name: 'Envelopes (100)',
        price: 49.99,
        options: {
          type: 'Envelopes',
          material: '#10 Regular',
          quantity: 100
        },
        inStock: true,
        leadTime: '3-5 business days'
      },
      {
        id: 'var-4-3',
        name: 'Combo Pack (100 each)',
        price: 99.99,
        options: {
          type: 'Combo',
          material: 'Letterhead & Envelopes',
          quantity: 100
        },
        inStock: true,
        leadTime: '5-7 business days'
      }
    ],
    minPrice: 49.99,
    maxPrice: 99.99,
    hasDesignOptions: true,
    averageRating: 4.5,
    reviewCount: 43,
    createdAt: '2023-03-25T00:00:00Z',
    updatedAt: '2023-03-25T00:00:00Z'
  },
  {
    id: 'prod-5',
    name: 'Custom Promotional Pens',
    slug: 'promotional-pens',
    description: 'High-quality promotional pens customized with your logo or message. These pens are perfect for trade shows, corporate gifts, and marketing campaigns. Choose from various styles and colors to match your brand identity.',
    shortDescription: 'Branded promotional pens for marketing and giveaways.',
    categoryId: 'cat-5',
    vendorId: '2',
    featuredImage: 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5632350/pexels-photo-5632350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4792282/pexels-photo-4792282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    variants: [
      {
        id: 'var-5-1',
        name: 'Standard (50)',
        price: 29.99,
        options: {
          style: 'Ballpoint',
          color: 'Blue',
          quantity: 50
        },
        inStock: true,
        leadTime: '7-10 business days'
      },
      {
        id: 'var-5-2',
        name: 'Premium (100)',
        price: 49.99,
        options: {
          style: 'Ballpoint',
          color: 'Blue',
          quantity: 100
        },
        inStock: true,
        leadTime: '7-10 business days'
      },
      {
        id: 'var-5-3',
        name: 'Deluxe (250)',
        price: 99.99,
        options: {
          style: 'Metal',
          color: 'Silver',
          quantity: 250
        },
        inStock: true,
        leadTime: '10-14 business days'
      }
    ],
    minPrice: 29.99,
    maxPrice: 99.99,
    hasDesignOptions: true,
    averageRating: 4.3,
    reviewCount: 38,
    createdAt: '2023-04-01T00:00:00Z',
    updatedAt: '2023-04-01T00:00:00Z'
  },
  {
    id: 'prod-6',
    name: 'Custom Gift Boxes',
    slug: 'custom-gift-boxes',
    description: 'Elevate your product packaging with our custom gift boxes. These high-quality boxes are perfect for retail products, corporate gifts, and special occasions. Available in various sizes and materials with full-color printing and optional finishing options.',
    shortDescription: 'Premium custom gift boxes for retail and special occasions.',
    categoryId: 'cat-6',
    vendorId: '2',
    featuredImage: 'https://images.pexels.com/photos/4397833/pexels-photo-4397833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/4397833/pexels-photo-4397833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7319173/pexels-photo-7319173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6044198/pexels-photo-6044198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    variants: [
      {
        id: 'var-6-1',
        name: 'Small (25)',
        price: 49.99,
        options: {
          size: '4" x 4" x 2"',
          material: 'Premium Cardstock',
          quantity: 25
        },
        inStock: true,
        leadTime: '7-10 business days'
      },
      {
        id: 'var-6-2',
        name: 'Medium (25)',
        price: 69.99,
        options: {
          size: '6" x 6" x 3"',
          material: 'Premium Cardstock',
          quantity: 25
        },
        inStock: true,
        leadTime: '7-10 business days'
      },
      {
        id: 'var-6-3',
        name: 'Large (25)',
        price: 89.99,
        options: {
          size: '8" x 8" x 4"',
          material: 'Premium Cardstock',
          quantity: 25
        },
        inStock: true,
        leadTime: '7-10 business days'
      },
      {
        id: 'var-6-4',
        name: 'Deluxe (50)',
        price: 149.99,
        options: {
          size: '6" x 6" x 3"',
          material: 'Rigid Box with Magnetic Closure',
          quantity: 50
        },
        inStock: true,
        leadTime: '14-21 business days'
      }
    ],
    minPrice: 49.99,
    maxPrice: 149.99,
    hasDesignOptions: true,
    averageRating: 4.9,
    reviewCount: 27,
    createdAt: '2023-04-05T00:00:00Z',
    updatedAt: '2023-04-05T00:00:00Z'
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'ord-1',
    userId: '3',
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Premium Business Cards',
        variantId: 'var-1-2',
        variantName: 'Standard Glossy (100)',
        price: 29.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/6508959/pexels-photo-6508959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: 'item-2',
        productId: 'prod-4',
        productName: 'Letterhead & Envelopes',
        variantId: 'var-4-3',
        variantName: 'Combo Pack (100 each)',
        price: 99.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/5702281/pexels-photo-5702281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      }
    ],
    status: 'delivered',
    subtotal: 129.98,
    tax: 13.00,
    shipping: 10.00,
    total: 152.98,
    shippingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
    },
    billingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
    createdAt: '2023-05-02T14:32:45Z',
    updatedAt: '2023-05-09T10:15:22Z',
    trackingNumber: 'TRK123456789',
    estimatedDelivery: '2023-05-09T00:00:00Z',
  },
  {
    id: 'ord-2',
    userId: '3',
    items: [
      {
        id: 'item-3',
        productId: 'prod-3',
        productName: 'Vinyl Banners',
        variantId: 'var-3-2',
        variantName: 'Medium (3\' x 6\')',
        price: 69.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/5650026/pexels-photo-5650026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      }
    ],
    status: 'shipped',
    subtotal: 69.99,
    tax: 7.00,
    shipping: 15.00,
    total: 91.99,
    shippingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
    },
    billingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
    createdAt: '2023-06-15T09:24:11Z',
    updatedAt: '2023-06-17T16:45:33Z',
    trackingNumber: 'TRK987654321',
    estimatedDelivery: '2023-06-22T00:00:00Z',
  },
  {
    id: 'ord-3',
    userId: '3',
    items: [
      {
        id: 'item-4',
        productId: 'prod-5',
        productName: 'Custom Promotional Pens',
        variantId: 'var-5-3',
        variantName: 'Deluxe (250)',
        price: 99.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        id: 'item-5',
        productId: 'prod-2',
        productName: 'Tri-Fold Brochures',
        variantId: 'var-2-1',
        variantName: 'Standard (100)',
        price: 89.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      }
    ],
    status: 'processing',
    subtotal: 189.98,
    tax: 19.00,
    shipping: 12.00,
    total: 220.98,
    shippingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
    },
    billingAddress: {
      street: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'USA',
    },
    paymentMethod: 'Credit Card',
    createdAt: '2023-07-10T11:14:59Z',
    updatedAt: '2023-07-10T11:14:59Z',
    estimatedDelivery: '2023-07-20T00:00:00Z',
  }
];