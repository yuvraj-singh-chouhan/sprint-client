
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Package, TruckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface OrderData {
  id: string;
  date: string;
  items: OrderItem[];
  total: string;
  shipping: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderData | null>(null);
  
  useEffect(() => {
    // Get order data from localStorage
    const orderData = localStorage.getItem('lastOrder');
    
    if (orderData) {
      setOrder(JSON.parse(orderData));
    } else {
      // If no order data, redirect to home
      navigate('/');
    }
  }, [navigate]);
  
  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-brand mb-4 text-sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Return to Home
          </Link>
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center h-20 w-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-neutral-600">
              Thank you for your purchase. We've sent a confirmation email to your inbox.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Order #{order.id.split('-')[1]}</h2>
                  <span className="text-sm text-neutral-500">{formattedDate}</span>
                </div>
                
                <Separator className="mb-6" />
                
                <div className="space-y-6">
                  {order.items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center">
                      <div className="h-16 w-16 bg-neutral-100 rounded overflow-hidden mr-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-neutral-500">Size: {item.size}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${item.price.toFixed(2)}</div>
                        <div className="text-sm text-neutral-500">Qty: {item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Shipping Information */}
                <div className="bg-white rounded-lg border border-neutral-200 p-6">
                  <div className="flex items-center mb-4">
                    <TruckIcon className="h-5 w-5 mr-2 text-neutral-700" />
                    <h3 className="font-semibold">Shipping Information</h3>
                  </div>
                  
                  <div className="text-sm space-y-1 text-neutral-700">
                    <p className="font-medium">{order.shipping.name}</p>
                    <p>{order.shipping.address}</p>
                    <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}</p>
                  </div>
                </div>
                
                {/* Order Timeline */}
                <div className="bg-white rounded-lg border border-neutral-200 p-6">
                  <div className="flex items-center mb-4">
                    <Package className="h-5 w-5 mr-2 text-neutral-700" />
                    <h3 className="font-semibold">Delivery Status</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-green-500 mr-3"></div>
                      <div className="flex-grow">
                        <p className="font-medium">Order Placed</p>
                        <p className="text-xs text-neutral-500">{formattedDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-neutral-200 mr-3"></div>
                      <div className="flex-grow">
                        <p className="font-medium text-neutral-500">Processing</p>
                        <p className="text-xs text-neutral-500">Estimated: Today</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-neutral-200 mr-3"></div>
                      <div className="flex-grow">
                        <p className="font-medium text-neutral-500">Shipped</p>
                        <p className="text-xs text-neutral-500">Estimated: In 1-2 days</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="h-4 w-4 rounded-full bg-neutral-200 mr-3"></div>
                      <div className="flex-grow">
                        <p className="font-medium text-neutral-500">Delivered</p>
                        <p className="text-xs text-neutral-500">Estimated: In 3-5 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-neutral-200 p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${(parseFloat(order.total) * 0.92).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{parseFloat(order.total) >= 99 ? 'Free' : '$9.99'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(parseFloat(order.total) * 0.08).toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>${order.total}</span>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => navigate('/')}
                    className="w-full bg-brand hover:bg-brand/90"
                  >
                    Continue Shopping
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/orders')}
                  >
                    View All Orders
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;
