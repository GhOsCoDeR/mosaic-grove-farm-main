
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { Plus, Minus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some products to your cart before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto max-w-4xl py-16 px-4">
          <h1 className="section-heading text-center mb-8">Your Cart</h1>
          <div className="text-center py-16 animate-fade-in">
            <div className="text-mosaic-green-dark text-xl mb-6">Your cart is empty</div>
            <Link to="/products" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto max-w-4xl py-16 px-4">
        <h1 className="section-heading text-center mb-8 animate-fade-in">Your Cart</h1>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in">
          <div className="p-6 border-b">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-mosaic-green-dark">
              <div className="col-span-3">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-right">Total</div>
            </div>
          </div>

          {cartItems.map((item, index) => (
            <div 
              key={`${item.product.id}-${JSON.stringify(item.selectedVariation)}-${item.selectedWeight}`} 
              className="p-6 border-b hover:bg-mosaic-earth-light/50 transition-colors duration-300 animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="col-span-3 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                    <img src={item.product.image_url || '/placeholder.svg'} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium text-mosaic-green-dark">{item.product.name}</div>
                    <div className="text-sm text-gray-600">{item.product.category_id}</div>
                    {item.selectedVariation && Object.keys(item.selectedVariation).length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {Object.entries(item.selectedVariation).map(([key, value]) => (
                          <span key={key} className="mr-2">{key}: {String(value)}</span>
                        ))}
                      </div>
                    )}
                    {item.selectedWeight && (
                      <div className="text-xs text-gray-500">
                        Weight: {item.selectedWeight}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">${item.product.price.toFixed(2)}</div>
                <div className="flex items-center justify-center space-x-2">
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.id)}
                    className="text-mosaic-green-dark hover:text-mosaic-green bg-gray-100 hover:bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.id)}
                    className="text-mosaic-green-dark hover:text-mosaic-green bg-gray-100 hover:bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="flex justify-end items-center space-x-3">
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  <button 
                    onClick={() => removeFromCart(item.product.id, item.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="p-6 animate-fade-in">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Subtotal</span>
              <span className="text-mosaic-green-dark">${subtotal.toFixed(2)}</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              Shipping and taxes calculated at checkout
            </div>
            <div className="mt-6 space-y-3">
              <Button 
                onClick={handleCheckout}
                className="w-full bg-mosaic-green hover:bg-mosaic-green-dark text-white font-medium py-2 rounded transition-colors"
              >
                Proceed to Checkout
              </Button>
              <Link to="/products">
                <Button 
                  variant="outline" 
                  className="w-full border-mosaic-green text-mosaic-green-dark hover:bg-mosaic-green-light hover:text-mosaic-green-dark font-medium py-2 rounded transition-colors"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
