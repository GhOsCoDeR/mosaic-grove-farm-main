
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Trash, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { isSameProduct } from '../utils/productHelpers';

const Wishlist = () => {
  const { wishlistItems, addToCart, removeFromWishlist } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (productId: string) => {
    const product = wishlistItems.find(item => isSameProduct(item.id, productId));
    if (product) {
      addToCart(product);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
    toast({
      title: "Removed from Wishlist",
      description: "Item removed from your wishlist.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto max-w-4xl py-16 px-4">
        <h1 className="section-heading text-center mb-8 animate-fade-in">My Wishlist</h1>
        
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-mosaic-earth-light mb-4">
              <Heart size={32} className="text-mosaic-green" />
            </div>
            <div className="text-mosaic-green-dark text-xl mb-6">Your wishlist is empty</div>
            <Link to="/products" className="btn-primary inline-block">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in">
            <div className="p-6 border-b">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-mosaic-green-dark">
                <div className="col-span-3">Product</div>
                <div className="text-center">Price</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
            </div>

            {wishlistItems.map((item, index) => (
              <div 
                key={item.id} 
                className="p-6 border-b hover:bg-mosaic-earth-light/50 transition-colors duration-300 animate-fade-in" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="grid grid-cols-6 gap-4 items-center">
                  <div className="col-span-3 flex items-center space-x-4">
                    <Link to={`/product/${item.id}`} className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                      <img src={item.image_url || item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div>
                      <Link to={`/product/${item.id}`} className="font-medium text-mosaic-green-dark hover:text-mosaic-green transition-colors">
                        {item.name}
                      </Link>
                      <div className="text-sm text-gray-600">{item.category_name || (item.category?.name)}</div>
                    </div>
                  </div>
                  <div className="text-center font-medium">${item.price.toFixed(2)}</div>
                  <div className="col-span-2 flex justify-end items-center space-x-3">
                    <Button 
                      onClick={() => handleAddToCart(item.id)}
                      className="bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors"
                      size="sm"
                    >
                      <ShoppingCart size={16} className="mr-1" /> Add to Cart
                    </Button>
                    <Button 
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      variant="outline"
                      className="border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-300 transition-colors"
                      size="sm"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="flex justify-between items-center">
                <Link to="/products">
                  <Button 
                    variant="outline" 
                    className="border-mosaic-green text-mosaic-green-dark hover:bg-mosaic-green-light hover:text-mosaic-green-dark font-medium transition-colors"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
