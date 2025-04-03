
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/use-cart';
import { Input } from '@/components/ui/input';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16 bg-neutral-50 rounded-lg">
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-neutral-600 mb-8">
                Looks like you haven't added any shoes to your cart yet.
              </p>
              <Button
                onClick={() => navigate('/shoes')}
                className="bg-brand hover:bg-brand-dark text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                  <div className="hidden sm:grid grid-cols-12 gap-4 p-4 bg-neutral-50 border-b border-neutral-200">
                    <div className="col-span-6 font-medium">Product</div>
                    <div className="col-span-2 font-medium text-center">Price</div>
                    <div className="col-span-2 font-medium text-center">Quantity</div>
                    <div className="col-span-2 font-medium text-right">Total</div>
                  </div>
                  
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 border-b border-neutral-200 items-center"
                    >
                      {/* Product */}
                      <div className="col-span-6 flex items-center">
                        <div className="h-20 w-20 bg-neutral-100 rounded overflow-hidden mr-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-neutral-500">Size: {item.size}</p>
                          <button
                            onClick={() => removeItem(item.id, item.size)}
                            className="flex items-center text-red-500 hover:text-red-700 text-sm mt-1"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <div className="sm:hidden inline-block font-medium mr-2">Price:</div>
                        ${item.price.toFixed(2)}
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="sm:hidden inline-block font-medium mr-2">Qty:</div>
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded-l-md"
                          >
                            <Minus size={14} />
                          </button>
                          <div className="w-12 h-8 flex items-center justify-center border-t border-b border-neutral-300">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-neutral-300 rounded-r-md"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-2 text-right">
                        <div className="sm:hidden inline-block font-medium mr-2">Total:</div>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-4 flex justify-between">
                    <Button
                      onClick={() => navigate('/shoes')}
                      variant="outline"
                    >
                      Continue Shopping
                    </Button>
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      className="text-red-500 border-red-500 hover:bg-red-50"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-neutral-200 p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{totalPrice >= 99 ? 'Free' : '$9.99'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-bold text-lg mb-6">
                    <span>Total</span>
                    <span>
                      ${(totalPrice + (totalPrice >= 99 ? 0 : 9.99) + totalPrice * 0.08).toFixed(2)}
                    </span>
                  </div>
                  
                  {/* Promo Code */}
                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Promo Code</p>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" className="flex-grow" />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-brand hover:bg-brand-dark text-white"
                    size="lg"
                    disabled={items.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
