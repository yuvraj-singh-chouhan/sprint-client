
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart, Package, Truck, Shield, Heart, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, totalPrice, itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/signin');
    }
  };

  const handlePromoCode = async () => {
    if (!promoCode.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === 'save10') {
        setPromoApplied(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  const shippingCost = totalPrice >= 99 ? 0 : 9.99;
  const taxAmount = totalPrice * 0.08;
  const promoDiscount = promoApplied ? totalPrice * 0.1 : 0;
  const finalTotal = totalPrice + shippingCost + taxAmount - promoDiscount;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container-custom py-6">
            {/* Back Button */}
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="text-neutral-600 hover:text-brand hover:bg-brand/10 transition-all duration-300 p-2 rounded-full"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
            </div>

            {/* Breadcrumbs */}
            <div className="mb-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-neutral-600 hover:text-brand transition-colors">
                        Home
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/shoes" className="text-neutral-600 hover:text-brand transition-colors">
                        Shop
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-neutral-900 font-medium">
                      Shopping Cart
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Title and Item Count */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2">
                  Shopping Cart
                </h1>
                <p className="text-neutral-600">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>

              {items.length > 0 && (
                <div className="hidden md:flex items-center space-x-3">
                  <Badge variant="outline" className="px-3 py-1">
                    <Package className="h-4 w-4 mr-2" />
                    {itemCount} Items
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          {items.length === 0 ? (
            /* Empty Cart State */
            <Card className="max-w-md mx-auto">
              <CardContent className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-12 w-12 text-neutral-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-neutral-900">Your cart is empty</h2>
                <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
                  Looks like you haven't added any shoes to your cart yet. Discover our amazing collection!
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/shoes')}
                    className="w-full bg-brand hover:bg-brand-dark text-white hover-lift transition-all duration-300"
                    size="lg"
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/collections')}
                    className="w-full"
                  >
                    Browse Collections
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Cart with Items */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {/* Continue Shopping Button */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/shoes')}
                    className="hover:bg-brand/10 hover:border-brand"
                  >
                    Continue Shopping
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                </div>

                {/* Cart Items List */}
                <Card>
                  <CardContent className="p-0">
                    {/* Desktop Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-neutral-50 border-b border-neutral-200 font-medium text-neutral-700">
                      <div className="col-span-6">Product</div>
                      <div className="col-span-2 text-center">Price</div>
                      <div className="col-span-2 text-center">Quantity</div>
                      <div className="col-span-2 text-right">Total</div>
                    </div>

                    {/* Cart Items */}
                    {items.map((item, index) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className={`grid grid-cols-1 md:grid-cols-12 gap-4 p-6 transition-colors hover:bg-neutral-50 ${index !== items.length - 1 ? 'border-b border-neutral-200' : ''
                          }`}
                      >
                        {/* Product Info */}
                        <div className="md:col-span-6 flex items-center space-x-4">
                          <div className="relative">
                            <div className="h-24 w-24 bg-neutral-100 rounded-xl overflow-hidden group">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-neutral-900 mb-1">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-neutral-600">
                              <span>Size: {item.size}</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-3">
                              <button
                                onClick={() => removeItem(item.id, item.size)}
                                className="flex items-center text-red-500 hover:text-red-700 text-sm transition-colors"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Remove
                              </button>
                              <button className="flex items-center text-neutral-500 hover:text-red-500 text-sm transition-colors">
                                <Heart className="h-4 w-4 mr-1" />
                                Save for Later
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="md:col-span-2 flex md:justify-center items-center">
                          <div className="md:hidden font-medium mr-2">Price:</div>
                          <span className="font-semibold text-lg">${item.price.toFixed(2)}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="md:col-span-2 flex md:justify-center items-center">
                          <div className="md:hidden font-medium mr-2">Qty:</div>
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-l-lg hover:bg-neutral-50 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <div className="w-14 h-10 flex items-center justify-center border-t border-b border-neutral-300 font-semibold">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-r-lg hover:bg-neutral-50 transition-colors"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="md:col-span-2 flex md:justify-end items-center">
                          <div className="md:hidden font-medium mr-2">Total:</div>
                          <span className="font-bold text-xl text-neutral-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 py-6">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-brand/10 rounded-full flex items-center justify-center">
                      <Truck className="h-6 w-6 text-brand" />
                    </div>
                    <p className="text-sm font-medium text-neutral-900">Free Shipping</p>
                    <p className="text-xs text-neutral-600">On orders over $99</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm font-medium text-neutral-900">Secure Payment</p>
                    <p className="text-xs text-neutral-600">100% protected</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-sm font-medium text-neutral-900">Easy Returns</p>
                    <p className="text-xs text-neutral-600">60-day policy</p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="overflow-hidden">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-6 text-neutral-900">Order Summary</h2>

                      {/* Summary Details */}
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Subtotal ({itemCount} items)</span>
                          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-neutral-600">Shipping</span>
                          <span className="font-semibold">
                            {totalPrice >= 99 ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              `$${shippingCost.toFixed(2)}`
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-neutral-600">Tax</span>
                          <span className="font-semibold">${taxAmount.toFixed(2)}</span>
                        </div>

                        {promoApplied && (
                          <div className="flex justify-between text-green-600">
                            <span>Promo Discount</span>
                            <span className="font-semibold">-${promoDiscount.toFixed(2)}</span>
                          </div>
                        )}
                      </div>

                      <Separator className="my-6" />

                      <div className="flex justify-between font-bold text-xl mb-6">
                        <span>Total</span>
                        <span className="text-brand">${finalTotal.toFixed(2)}</span>
                      </div>

                      {/* Free Shipping Progress */}
                      {totalPrice < 99 && (
                        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center mb-2">
                            <Truck className="h-4 w-4 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-blue-900">
                              Add ${(99 - totalPrice).toFixed(2)} more for free shipping!
                            </span>
                          </div>
                          <div className="w-full bg-blue-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((totalPrice / 99) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Promo Code */}
                      <div className="mb-6">
                        <p className="text-sm font-medium mb-3 flex items-center">
                          <Tag className="h-4 w-4 mr-2" />
                          Promo Code
                        </p>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-grow"
                            disabled={promoApplied}
                          />
                          <Button
                            variant="outline"
                            onClick={handlePromoCode}
                            disabled={isLoading || promoApplied || !promoCode.trim()}
                            className="px-4 hover:bg-brand-dark hover:text-white text:black"
                          >
                            {isLoading ? 'Applying...' : promoApplied ? 'Applied' : 'Apply'}
                          </Button>
                        </div>
                        {promoApplied && (
                          <p className="text-sm text-green-600 mt-2">✓ Promo code applied successfully!</p>
                        )}
                      </div>

                      {/* Checkout Button */}
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-brand hover:bg-brand-dark text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        size="lg"
                        disabled={items.length === 0}
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
                      </Button>

                      <p className="text-xs text-neutral-500 text-center mt-4">
                        By proceeding, you agree to our Terms of Service
                      </p>
                    </CardContent>
                  </Card>
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
