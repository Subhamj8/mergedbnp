import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateItemQuantity, isCartEmpty } = useCart();

  if (isCartEmpty) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-8">
          <ShoppingBag size={48} className="text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 text-center mb-8 max-w-md">
          Looks like you haven't added any products to your cart yet.
          Browse our products and find something you'll love.
        </p>
        <Button to="/products" variant="primary" size="lg">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Cart Items ({cart.items.length})</h2>
              
              <div className="divide-y divide-gray-200">
                {cart.items.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="sm:w-32 h-32 flex-shrink-0 mr-6 mb-4 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                        <Link to={`/products/${item.productId}`}>
                          <h3 className="text-lg font-medium text-gray-800 hover:text-brand-500 transition-colors">
                            {item.productName}
                          </h3>
                        </Link>
                        <span className="text-lg font-semibold text-gray-800 mt-1 sm:mt-0">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {item.variantName}
                      </p>
                      
                      {item.designId && (
                        <p className="text-sm text-brand-500 mb-3">
                          Custom Design
                        </p>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <button
                            className="w-8 h-8 rounded-l-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val) && val > 0) {
                                updateItemQuantity(item.id, val);
                              }
                            }}
                            className="w-12 h-8 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
                            aria-label="Quantity"
                          />
                          <button
                            className="w-8 h-8 rounded-r-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        
                        <button
                          className="text-gray-500 hover:text-red-500 transition-colors"
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Link to="/products" className="text-brand-500 hover:text-brand-600 transition-colors">
              ← Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">${cart.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800">${cart.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-lg font-semibold text-gray-800">${cart.total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button to="/checkout" variant="primary" fullWidth>
                Proceed to Checkout
              </Button>
              
              <div className="mt-6 text-sm text-gray-500">
                <p className="mb-1">We accept:</p>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-gray-100 rounded">Visa</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">Mastercard</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">Amex</span>
                  <span className="px-2 py-1 bg-gray-100 rounded">PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;