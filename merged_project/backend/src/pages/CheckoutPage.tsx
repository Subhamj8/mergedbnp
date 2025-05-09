import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would handle payment processing
    // For now, just simulate order completion
    clearCart();
    navigate('/order-confirmation/123'); // Using a dummy order ID
  };

  if (!cart.items.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="First Name"
                defaultValue={user?.firstName}
                required
              />
              <Input
                type="text"
                placeholder="Last Name"
                defaultValue={user?.lastName}
                required
              />
            </div>
            <Input
              type="email"
              placeholder="Email Address"
              defaultValue={user?.email}
              required
            />
            <Input
              type="text"
              placeholder="Street Address"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="City"
                required
              />
              <Input
                type="text"
                placeholder="State"
                required
              />
            </div>
            <Input
              type="text"
              placeholder="ZIP Code"
              required
            />

            {/* Payment Information */}
            <h2 className="text-xl font-semibold mt-8 mb-4">Payment Information</h2>
            <Input
              type="text"
              placeholder="Card Number"
              required
            />
            <div className="grid grid-cols-3 gap-4">
              <Input
                type="text"
                placeholder="MM/YY"
                required
              />
              <Input
                type="text"
                placeholder="CVC"
                required
              />
            </div>

            <Button type="submit" className="w-full mt-6">
              Place Order
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between">
                <p className="font-medium">Subtotal</p>
                <p className="font-medium">
                  ${cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="font-medium">Shipping</p>
                <p className="font-medium">$0.00</p>
              </div>
              <div className="flex justify-between mt-2 text-lg font-bold">
                <p>Total</p>
                <p>
                  ${cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;