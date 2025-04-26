
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { isSameProduct } from '../utils/productHelpers';

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  // Enhanced context with type-safe methods
  return {
    ...context,
    isInCart: (productId: string | number) => 
      context.cartItems.some(item => isSameProduct(item.product.id, productId)),
    isInWishlist: (productId: string | number) => 
      context.wishlistItems.some(item => isSameProduct(item.id, productId)),
    getCartItem: (productId: string | number) =>
      context.cartItems.find(item => isSameProduct(item.product.id, productId)),
    getWishlistItem: (productId: string | number) =>
      context.wishlistItems.find(item => isSameProduct(item.id, productId))
  };
};
