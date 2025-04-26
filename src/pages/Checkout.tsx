import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard, Truck, Package, ArrowRight, Check, ShoppingCart } from 'lucide-react';

type ShippingInfo = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

type DeliveryMethod = {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
};

const deliveryMethods: DeliveryMethod[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: 'Delivered via Ghana Post',
    price: 5.99,
    estimatedDays: '5-7 business days'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: 'Delivered via DHL Express',
    price: 12.99,
    estimatedDays: '2-3 business days'
  },
  {
    id: 'pickup',
    name: 'Local Pickup',
    description: 'Pickup at our Accra facility',
    price: 0,
    estimatedDays: 'Available next business day'
  }
];

const Checkout = () => {
  const { cartItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: user?.user_metadata?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Ghana',
  });
  
  const [selectedDelivery, setSelectedDelivery] = useState<string>('standard');
  const [notes, setNotes] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  
  const deliveryFee = deliveryMethods.find(method => method.id === selectedDelivery)?.price || 0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    // Redirect to cart if there are no items
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', '/checkout');
      toast({
        title: "Authentication Required",
        description: "Please login or signup to proceed with checkout.",
      });
      navigate('/login');
    }
  }, [isAuthenticated, navigate, toast]);

  useEffect(() => {
    // Simple form validation
    const { fullName, email, phone, address, city, state, zipCode } = shippingInfo;
    setIsFormValid(Boolean(fullName && email && phone && address && city && state && zipCode));
  }, [shippingInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleContinueToReview = () => {
    if (!isFormValid) {
      toast({
        title: "Please complete all fields",
        description: "All shipping information fields are required.",
        variant: "destructive",
      });
      return;
    }
    
    // Save shipping info and delivery method to session storage
    const checkoutData = {
      shippingInfo,
      deliveryMethod: deliveryMethods.find(method => method.id === selectedDelivery),
      notes,
      cartItems,
      subtotal,
      deliveryFee,
      total
    };
    
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    navigate('/order-review');
  };

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
                
                <div className="w-12 h-1 bg-gray-300"></div>
                
                <div className="flex items-center opacity-60">
                  <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center">
                    <CreditCard size={16} />
                  </div>
                  <span className="ml-2 font-medium text-gray-600">Payment</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Shipping Information */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <h2 className="text-2xl font-serif font-bold text-mosaic-green-dark mb-6">
                    Shipping Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State/Region *
                      </label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Postal/ZIP Code *
                      </label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <Input
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <h2 className="text-2xl font-serif font-bold text-mosaic-green-dark mb-6">
                    Delivery Method
                  </h2>
                  
                  <div className="space-y-4">
                    {deliveryMethods.map((method) => (
                      <div 
                        key={method.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedDelivery === method.id 
                            ? 'border-mosaic-green bg-mosaic-earth-light' 
                            : 'border-gray-200 hover:border-mosaic-green'
                        }`}
                        onClick={() => setSelectedDelivery(method.id)}
                      >
                        <div className="flex items-start">
                          <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center mr-3 mt-1 ${
                            selectedDelivery === method.id 
                              ? 'border-mosaic-green bg-mosaic-green' 
                              : 'border-gray-300'
                          }`}>
                            {selectedDelivery === method.id && (
                              <Check size={12} className="text-white" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{method.name}</h3>
                              <span className="font-bold text-mosaic-green-dark">
                                {method.price === 0 ? 'FREE' : `$${method.price.toFixed(2)}`}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{method.description}</p>
                            <p className="text-sm text-gray-500 mt-1">Estimated delivery: {method.estimatedDays}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <h2 className="text-xl font-serif font-bold text-mosaic-green-dark mb-4">
                    Order Notes (Optional)
                  </h2>
                  <Textarea
                    placeholder="Add any special instructions or notes about your order..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full h-32"
                  />
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                  <h2 className="text-2xl font-serif font-bold text-mosaic-green-dark mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-4">
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.product.image_url || item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-sm font-medium">{item.product.name}</h3>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                      <span className="font-bold text-mosaic-green-dark">Total</span>
                      <span className="font-bold text-mosaic-green-dark">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleContinueToReview}
                    className="w-full mt-6 bg-mosaic-green hover:bg-mosaic-green-dark text-white py-6 flex items-center justify-center gap-2"
                  >
                    Continue to Review
                    <ArrowRight size={18} />
                  </Button>
                  
                  <div className="mt-6 text-sm text-gray-500 space-y-2">
                    <div className="flex items-center">
                      <Package size={16} className="mr-2" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center">
                      <CreditCard size={16} className="mr-2" />
                      <span>Secure payment</span>
                    </div>
                  </div>
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

export default Checkout;
