
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShoppingBag, Download, ArrowRight } from 'lucide-react';

type OrderConfirmation = {
  orderId: string;
  orderDate: string;
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  deliveryMethod: {
    id: string;
    name: string;
    description: string;
    price: number;
    estimatedDays: string;
  };
  cartItems: any[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

const OrderSuccess = () => {
  const [order, setOrder] = useState<OrderConfirmation | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = sessionStorage.getItem('orderConfirmation');
    
    if (!storedOrder) {
      navigate('/');
      return;
    }
    
    try {
      const parsedOrder = JSON.parse(storedOrder);
      setOrder(parsedOrder);
    } catch (error) {
      console.error('Failed to parse order confirmation:', error);
      navigate('/');
    }
  }, [navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading order details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-mosaic-green rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              
              <h1 className="text-3xl font-serif font-bold text-mosaic-green-dark mb-2">
                Order Placed Successfully!
              </h1>
              
              <p className="text-gray-600">
                Thank you for your order. Your order has been received.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-100 pb-4 mb-4">
                <div>
                  <span className="text-gray-600 text-sm">Order Number</span>
                  <p className="font-bold">{order.orderId}</p>
                </div>
                
                <div className="mt-2 sm:mt-0">
                  <span className="text-gray-600 text-sm">Date Placed</span>
                  <p className="font-medium">{formatDate(order.orderDate)}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <h2 className="font-medium text-lg text-mosaic-green-dark">Order Details</h2>
                
                {order.cartItems.map((item) => (
                  <div key={item.product.id} className="flex items-start space-x-4">
                    <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping ({order.deliveryMethod.name})</span>
                  <span className="font-medium">
                    {order.deliveryFee === 0 ? 'FREE' : `$${order.deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="font-bold text-mosaic-green-dark">Total</span>
                  <span className="font-bold text-mosaic-green-dark">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-medium text-lg text-mosaic-green-dark mb-4">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Shipping Address</h3>
                  <p className="font-medium">{order.shippingInfo.fullName}</p>
                  <p>{order.shippingInfo.address}</p>
                  <p>
                    {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                  </p>
                  <p>{order.shippingInfo.country}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-600 mb-1">Contact Information</h3>
                  <p>{order.shippingInfo.email}</p>
                  <p>{order.shippingInfo.phone}</p>
                  
                  <h3 className="text-sm font-medium text-gray-600 mt-4 mb-1">Delivery Method</h3>
                  <p>{order.deliveryMethod.name}</p>
                  <p className="text-sm text-gray-500">Estimated delivery: {order.deliveryMethod.estimatedDays}</p>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <p className="text-gray-600">
                A confirmation email has been sent to <span className="font-medium">{order.shippingInfo.email}</span>
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  onClick={() => window.print()} 
                  variant="outline"
                  className="border-mosaic-green text-mosaic-green flex items-center gap-2"
                >
                  <Download size={18} /> Download Receipt
                </Button>
                
                <Link to="/products">
                  <Button className="bg-mosaic-green hover:bg-mosaic-green-dark flex items-center gap-2">
                    Continue Shopping <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center justify-center text-gray-500 text-sm">
                <ShoppingBag size={18} className="mr-2" />
                Need help? Contact our support team at support@mosaicgrove.com
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
