import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, Package, Heart, Tag, HeartOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from '@/components/ui/input';

// Import the new common components
import { 
  PageLayout, 
  PageHeader, 
  EmptyState, 
  TrustIndicators 
} from '@/components/common';

import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';

const CartPageRefactored = () => {
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

  // Define breadcrumbs
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shoes' }
  ];

  // Define empty state actions
  const emptyStateActions = [
    {
      label: 'Continue Shopping',
      onClick: () => navigate('/shoes'),
      icon: Package
    },
    {
      label: 'Browse Collections',
      onClick: () => navigate('/collections'),
      variant: 'outline' as const
    }
  ];

  // Define header actions
  const headerActions = items.length > 0 ? (
    <Button 
      variant="outline" 
      className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300"
      onClick={clearCart}
    >
      <HeartOff className="mr-2 h-4 w-4" />
      <span className="hidden sm:inline">Clear Cart</span>
      <span className="sm:hidden">Clear</span>
    </Button>
  ) : null;

  // Define header badges
  const headerBadges = items.length > 0 ? (
    <>
      <Badge variant="outline" className="px-3 py-1 hidden md:flex">
        <Package className="h-4 w-4 mr-2" />
        {itemCount} Items
      </Badge>
      <Badge variant="outline" className="px-3 py-1">
        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
      </Badge>
    </>
  ) : null;

  return (
    <PageLayout className="bg-neutral-50">
      {/* Using the new PageHeader component */}
      <PageHeader
        title="Shopping Cart"
        subtitle={`${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your cart`}
        breadcrumbs={breadcrumbs}
        currentPage="Shopping Cart"
        actions={headerActions}
        badges={headerBadges}
      />

      <div className="container-custom py-8">
        {items.length === 0 ? (
          /* Using the new EmptyState component */
          <EmptyState
            icon={ShoppingCart}
            title="Your cart is empty"
            description="Looks like you haven't added any shoes to your cart yet. Discover our amazing collection!"
            actions={emptyStateActions}
          />
        ) : (
          /* Cart with Items */
          <div className="space-y-8">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-white rounded-2xl border border-neutral-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-neutral-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-900">
                    {itemCount} Items in Cart
                  </h3>
                  <p className="text-neutral-600">Ready for checkout</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => navigate('/shoes')}
                  className="flex-1 sm:flex-none hover:bg-brand/10 hover:border-brand"
                >
                  Continue Shopping
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="flex-1 sm:flex-none bg-brand hover:bg-brand-dark text-white"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Checkout
                </Button>
              </div>
            </div>

            {/* Cart Items - This section remains largely the same */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-0">
                    {/* Cart items mapping would go here - same as original */}
                    {items.map((item, index) => (
                      <div key={`${item.id}-${item.size}`} className="p-6 border-b border-neutral-200 last:border-b-0">
                        {/* Cart item content */}
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary - Same as original */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6 text-neutral-900">Order Summary</h2>
                    {/* Order summary content - same as original */}
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      {/* Rest of summary */}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Using the new TrustIndicators component */}
            <TrustIndicators variant="cart" />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CartPageRefactored; 