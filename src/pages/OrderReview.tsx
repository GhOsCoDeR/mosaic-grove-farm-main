
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Truck, CreditCard, Check, ArrowRight } from 'lucide-react';

type CheckoutData = {
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
  notes: string;
  cartItems: any[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

const OrderReview = () => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedData = sessionStorage.getItem('checkoutData');
    
    if (!storedData) {
      navigate('/checkout');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      setCheckoutData(parsedData);
    } catch (error) {
      console.error('Failed to parse checkout data:', error);
      navigate('/checkout');
    }
  }, [navigate]);

  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Store order confirmation data
      const orderConfirmation = {
        orderId: `MG-${Date.now().toString().substring(7)}`,
        orderDate: new Date().toISOString(),
        ...checkoutData
      };
      sessionStorage.setItem('orderConfirmation', JSON.stringify(orderConfirmation));
      
      // Clear cart and redirect to success page
      clearCart();
      setIsSubmitting(false);
      navigate('/order-success');
    }, 1500);
  };

  if (!checkoutData) {
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
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Checkout Steps */}
            <div className="mb-8 animate-fade-in">
              <div className="flex justify-center items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-mosaic-green text-white rounded-full flex items-center justify-center">
                    <ShoppingCart size={16} />
                  </div>
                  <span className="ml-2 font-medium text-mosaic-green-dark">Cart</span>
                </div>
                
                <div className="w-12 h-1 bg-mosaic-green"></div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-mosaic-green text-white rounded-full flex items-center justify-center">
                    <Truck size={16} />
                  </div>
                  <span className="ml-2 font-medium text-mosaic-green-dark">Shipping</span>
                </div>
                
                <div className="w-12 h-1 bg-mosaic-green"></div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-mosaic-green text-white rounded-full flex items-center justify-center">
                    <CreditCard size={16} />
                  </div>
                  <span className="ml-2 font-medium text-mosaic-green-dark">Payment</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <h2 className="text-2xl font-serif font-bold text-mosaic-green-dark mb-6">
                    Review Your Order
                  </h2>
                  
                  <div className="space-y-6 mb-4">
                    {checkoutData.cartItems.map((item) => (
                      <div key={item.product.id} className="flex items-start space-x-4 pb-4 border-b border-gray-100">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-gray-500 mb-1">Quantity: {item.quantity}</p>
                          {item.selectedWeight && (
                            <p className="text-sm text-gray-500">
                              Weight: {item.selectedWeight}{item.product.weight?.unit}
                            </p>
                          )}
                          {item.selectedVariation && Object.keys(item.selectedVariation).length > 0 && (
                            <div className="text-sm text-gray-500">
                              {Object.entries(item.selectedVariation).map(([key, value]) => (
                                <p key={key}>{key}: {String(value)}</p>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                          <div className="text-sm text-gray-500">${item.product.price.toFixed(2)} each</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping Information */}
                  <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-mosaic-green-dark">
                        Shipping Address
                      </h3>
                      <button 
                        onClick={() => navigate('/checkout')}
                        className="text-sm text-mosaic-green hover:text-mosaic-green-dark transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                    
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{checkoutData.shippingInfo.fullName}</p>
                      <p>{checkoutData.shippingInfo.address}</p>
                      <p>
                        {checkoutData.shippingInfo.city}, {checkoutData.shippingInfo.state} {checkoutData.shippingInfo.zipCode}
                      </p>
                      <p>{checkoutData.shippingInfo.country}</p>
                      <p className="pt-2">{checkoutData.shippingInfo.email}</p>
                      <p>{checkoutData.shippingInfo.phone}</p>
                    </div>
                  </div>
                  
                  {/* Delivery Method */}
                  <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-mosaic-green-dark">
                        Delivery Method
                      </h3>
                      <button 
                        onClick={() => navigate('/checkout')}
                        className="text-sm text-mosaic-green hover:text-mosaic-green-dark transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                    
                    <div className="text-sm space-y-1">
                      <p className="font-medium">{checkoutData.deliveryMethod.name}</p>
                      <p>{checkoutData.deliveryMethod.description}</p>
                      <p className="text-gray-500">Estimated delivery: {checkoutData.deliveryMethod.estimatedDays}</p>
                      <p className="font-medium pt-2">
                        {checkoutData.deliveryMethod.price === 0 
                          ? 'FREE' 
                          : `$${checkoutData.deliveryMethod.price.toFixed(2)}`
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method */}
                <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <h3 className="text-lg font-medium text-mosaic-green-dark mb-4">
                    Payment Method
                  </h3>
                  
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <p className="text-center text-sm">
                      For demo purposes, this checkout process simulates payment.
                      <br />
                      In a real application, we would integrate with a payment provider here.
                    </p>
                  </div>
                  
                  <div className="mt-4 p-4 bg-mosaic-earth-light/50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-mosaic-green flex items-center justify-center mr-3">
                        <Check size={12} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">Cash on Delivery</h4>
                        <p className="text-sm text-gray-600">Pay when your order arrives</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Order Notes */}
                {checkoutData.notes && (
                  <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <h3 className="text-lg font-medium text-mosaic-green-dark mb-4">
                      Order Notes
                    </h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{checkoutData.notes}</p>
                  </div>
                )}
              </div>
              
              {/* Order Total */}
              <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                  <h2 className="text-2xl font-serif font-bold text-mosaic-green-dark mb-6">
                    Order Total
                  </h2>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({checkoutData.cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span className="font-medium">${checkoutData.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {checkoutData.deliveryFee === 0 ? 'FREE' : `$${checkoutData.deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                      <span className="font-bold text-mosaic-green-dark">Total</span>
                      <span className="font-bold text-mosaic-green-dark">${checkoutData.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="w-full py-6 bg-mosaic-green hover:bg-mosaic-green-dark text-white flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                    <ArrowRight size={18} />
                  </Button>
                  
                  <p className="mt-4 text-xs text-center text-gray-500">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderReview;
