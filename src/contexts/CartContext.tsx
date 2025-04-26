
import React, { createContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string | null;
  inventory_count: number;
  is_featured: boolean | null;
};

export type CartItem = {
  id?: string;
  product: Product;
  quantity: number;
  selectedVariation?: Record<string, string> | null;
  selectedWeight?: number | null;
};

type CartState = {
  cartItems: CartItem[];
  wishlistItems: Product[];
};

type CartAction =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'SET_WISHLIST'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number; selectedVariation?: Record<string, string> | null; selectedWeight?: number | null; } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string; itemId?: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number; itemId?: string; selectedVariation?: Record<string, string> | null; selectedWeight?: number | null; } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string };

type CartContextType = {
  cartItems: CartItem[];
  wishlistItems: Product[];
  addToCart: (product: Product, quantity?: number, selectedVariation?: Record<string, string> | null, selectedWeight?: number | null) => Promise<void>;
  removeFromCart: (productId: string, itemId?: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number, itemId?: string, selectedVariation?: Record<string, string> | null, selectedWeight?: number | null) => Promise<void>;
  clearCart: () => Promise<void>;
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  isLoading: boolean;
};

const initialState: CartState = {
  cartItems: [],
  wishlistItems: [],
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to check if two variations are the same
const areVariationsSame = (var1?: Record<string, string> | null, var2?: Record<string, string> | null): boolean => {
  if (!var1 && !var2) return true;
  if (!var1 || !var2) return false;

  const keys1 = Object.keys(var1);
  const keys2 = Object.keys(var2);
  
  if (keys1.length !== keys2.length) return false;
  
  return keys1.every(key => var1[key] === var2[key]);
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cartItems: action.payload,
      };
    
    case 'SET_WISHLIST':
      return {
        ...state,
        wishlistItems: action.payload,
      };
      
    case 'ADD_TO_CART': {
      const { product, quantity, selectedVariation, selectedWeight } = action.payload;
      
      // Check if this exact product + variation + weight combination exists
      const existingItemIndex = state.cartItems.findIndex(item =>
        item.product.id === product.id &&
        areVariationsSame(item.selectedVariation, selectedVariation) &&
        item.selectedWeight === selectedWeight
      );

      if (existingItemIndex > -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + quantity,
        };
        return { ...state, cartItems: updatedCartItems };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { product, quantity, selectedVariation, selectedWeight }],
        };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => 
          item.product.id !== action.payload.id || 
          (action.payload.itemId && item.id !== action.payload.itemId)
        ),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity, itemId } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => 
            item.product.id !== id || 
            (itemId && item.id !== itemId)
          ),
        };
      }
      
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          (item.product.id === id && (!itemId || item.id === itemId))
            ? { ...item, quantity } 
            : item
        ),
      };
    }
    
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    
    case 'ADD_TO_WISHLIST': {
      const isAlreadyInWishlist = state.wishlistItems.some(item => item.id === action.payload.id);
      if (isAlreadyInWishlist) {
        return state;
      }
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };
    }
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(item => item.id !== action.payload),
      };
    
    default:
      return state;
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Fetch cart and wishlist when user is authenticated
  useEffect(() => {
    const fetchCart = async () => {
      if (!isAuthenticated || !user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Fetch cart items
        const { data: cartData, error: cartError } = await supabase
          .from('cart_items')
          .select(`
            id,
            quantity,
            selected_variations,
            selected_weight,
            products:product_id (
              id,
              name,
              description,
              price,
              image_url,
              category_id,
              inventory_count,
              is_featured
            )
          `)
          .eq('user_id', user.id);

        if (cartError) {
          console.error('Error fetching cart:', cartError);
        } else if (cartData) {
          const formattedCartItems = cartData.map(item => ({
            id: item.id,
            product: item.products,
            quantity: item.quantity,
            selectedVariation: item.selected_variations as Record<string, string> | null,
            selectedWeight: item.selected_weight,
          }));
          
          dispatch({ type: 'SET_CART', payload: formattedCartItems });
        }

        // Fetch wishlist items
        const { data: wishlistData, error: wishlistError } = await supabase
          .from('wishlist_items')
          .select(`
            products:product_id (
              id,
              name,
              description,
              price,
              image_url,
              category_id,
              inventory_count,
              is_featured
            )
          `)
          .eq('user_id', user.id);

        if (wishlistError) {
          console.error('Error fetching wishlist:', wishlistError);
        } else if (wishlistData) {
          const formattedWishlistItems = wishlistData.map(item => item.products);
          dispatch({ type: 'SET_WISHLIST', payload: formattedWishlistItems });
        }
      } catch (error) {
        console.error('Error fetching cart/wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [user, isAuthenticated]);

  const addToCart = async (
    product: Product,
    quantity = 1,
    selectedVariation?: Record<string, string>,
    selectedWeight?: number
  ) => {
    // Update local state first for immediate UI feedback
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity, selectedVariation, selectedWeight }
    });

    if (isAuthenticated && user) {
      try {
        // Check if this product combination exists in the cart
        const { data: existingItems, error: checkError } = await supabase
          .from('cart_items')
          .select('id, quantity')
          .eq('user_id', user.id)
          .eq('product_id', product.id)
          .eq('selected_variations', selectedVariation || null)
          .eq('selected_weight', selectedWeight || null);

        if (checkError) {
          console.error('Error checking cart:', checkError);
          return;
        }

        if (existingItems && existingItems.length > 0) {
          // Update existing item quantity
          const existingItem = existingItems[0];
          const newQuantity = existingItem.quantity + quantity;
          
          const { error } = await supabase
            .from('cart_items')
            .update({ quantity: newQuantity })
            .eq('id', existingItem.id);

          if (error) {
            console.error('Error updating cart quantity:', error);
          }
        } else {
          // Insert new item
          const { error } = await supabase
            .from('cart_items')
            .insert({
              user_id: user.id,
              product_id: product.id,
              quantity,
              selected_variations: selectedVariation || null,
              selected_weight: selectedWeight || null
            });

          if (error) {
            console.error('Error adding to cart:', error);
          }
        }
      } catch (error) {
        console.error('Error syncing cart with database:', error);
      }
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = async (productId: string, itemId?: string) => {
    // Update local state first for immediate UI feedback
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId, itemId } });

    if (isAuthenticated && user) {
      try {
        if (itemId) {
          // Remove specific cart item by its ID
          const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('id', itemId)
            .eq('user_id', user.id);

          if (error) {
            console.error('Error removing from cart:', error);
          }
        } else {
          // Remove all items with this product ID
          const { error } = await supabase
            .from('cart_items')
            .delete()
            .eq('product_id', productId)
            .eq('user_id', user.id);

          if (error) {
            console.error('Error removing from cart:', error);
          }
        }
      } catch (error) {
        console.error('Error syncing cart with database:', error);
      }
    }
  };

  const updateQuantity = async (
    productId: string,
    quantity: number,
    itemId?: string,
    selectedVariation?: Record<string, string>,
    selectedWeight?: number
  ) => {
    // Update local state first for immediate UI feedback
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, quantity, itemId, selectedVariation, selectedWeight }
    });

    if (isAuthenticated && user) {
      try {
        if (quantity <= 0) {
          // Remove the item if quantity is zero or negative
          await removeFromCart(productId, itemId);
          return;
        }

        if (itemId) {
          // Update specific cart item by its ID
          const { error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('id', itemId)
            .eq('user_id', user.id);

          if (error) {
            console.error('Error updating cart quantity:', error);
          }
        } else {
          // Update by product and variation details
          const { error } = await supabase
            .from('cart_items')
            .update({ quantity })
            .eq('product_id', productId)
            .eq('user_id', user.id)
            .eq('selected_variations', selectedVariation || null)
            .eq('selected_weight', selectedWeight || null);

          if (error) {
            console.error('Error updating cart quantity:', error);
          }
        }
      } catch (error) {
        console.error('Error syncing cart with database:', error);
      }
    }
  };

  const clearCart = async () => {
    // Update local state first for immediate UI feedback
    dispatch({ type: 'CLEAR_CART' });

    if (isAuthenticated && user) {
      try {
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) {
          console.error('Error clearing cart:', error);
        }
      } catch (error) {
        console.error('Error syncing cart with database:', error);
      }
    }
  };

  const addToWishlist = async (product: Product) => {
    // Check if already in wishlist
    const isAlreadyInWishlist = state.wishlistItems.some(item => item.id === product.id);
    if (isAlreadyInWishlist) {
      return;
    }

    // Update local state first for immediate UI feedback
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });

    if (isAuthenticated && user) {
      try {
        const { error } = await supabase
          .from('wishlist_items')
          .insert({
            user_id: user.id,
            product_id: product.id
          });

        if (error) {
          console.error('Error adding to wishlist:', error);
        }
      } catch (error) {
        console.error('Error syncing wishlist with database:', error);
      }
    }

    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const removeFromWishlist = async (productId: string) => {
    // Update local state first for immediate UI feedback
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });

    if (isAuthenticated && user) {
      try {
        const { error } = await supabase
          .from('wishlist_items')
          .delete()
          .eq('product_id', productId)
          .eq('user_id', user.id);

        if (error) {
          console.error('Error removing from wishlist:', error);
        }
      } catch (error) {
        console.error('Error syncing wishlist with database:', error);
      }
    }
  };

  const isInWishlist = (productId: string) => {
    return state.wishlistItems.some(item => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        wishlistItems: state.wishlistItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
