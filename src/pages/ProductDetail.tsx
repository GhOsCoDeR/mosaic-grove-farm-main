
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { Product } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  ShoppingCart, Heart, ArrowLeft, Plus, Minus, 
  Truck, Package, Leaf, Star, Check, Tag
} from 'lucide-react';

// Mock data for the product detail page
const products: Product[] = [
  {
    id: 1,
    name: "Organic Cashews",
    description: "Ethically grown and harvested cashews from our farms in the Eastern Afram Plains. Our cashews are cultivated using sustainable farming practices that preserve the environment while producing premium quality nuts. Perfect for snacking, cooking, or making homemade cashew milk.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1563412580953-7f9e99209336",
    category: "Nuts",
    variations: [
      {
        name: "Type",
        options: ["Raw", "Roasted", "Salted"]
      }
    ],
    weight: {
      options: [250, 500, 1000],
      unit: "g"
    }
  },
  {
    id: 2,
    name: "Tiger Nut Flour",
    description: "Our signature product, perfect for gluten-free baking and adding nutritional value to smoothies and recipes. This versatile flour is made from ground tiger nuts, which are rich in fiber, vitamins, and minerals. Ideal for making pancakes, breads, cookies, and other baked goods.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed",
    category: "Flour",
    variations: [
      {
        name: "Processing",
        options: ["Fine Ground", "Coarse Ground"]
      }
    ],
    weight: {
      options: [500, 1000, 2000],
      unit: "g"
    }
  },
  {
    id: 3,
    name: "Tiger Nut Milk",
    description: "Creamy plant-based milk alternative rich in nutrients and natural sweetness. Our tiger nut milk is dairy-free, nut-free, and soy-free, making it an excellent alternative for those with allergies or dietary restrictions. Enjoy it on its own, in coffee, or use it in recipes.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    category: "Beverages",
    variations: [
      {
        name: "Flavor",
        options: ["Original", "Vanilla", "Chocolate"]
      }
    ],
    weight: {
      options: [500, 1000],
      unit: "ml"
    }
  },
  {
    id: 4,
    name: "Tiger Nut Dessert",
    description: "Frozen treats featuring the unique flavor and nutrition of tiger nuts. Our tiger nut desserts are dairy-free and naturally sweetened. They make a perfect healthy alternative to traditional ice cream while being rich in nutrients and fiber.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
    category: "Dessert",
    variations: [
      {
        name: "Flavor",
        options: ["Classic", "Berry Mix", "Chocolate"]
      }
    ],
    weight: {
      options: [250, 500],
      unit: "g"
    }
  }
];

// Mock reviews data
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2023-08-15",
    comment: "These cashews are amazing! So fresh and flavorful. Definitely the best I've ever had."
  },
  {
    id: 2,
    name: "Michael Brown",
    rating: 4,
    date: "2023-07-22",
    comment: "Really good quality. I love that they're ethically sourced."
  },
  {
    id: 3,
    name: "Aisha Patel",
    rating: 5,
    date: "2023-07-10",
    comment: "Perfect for my recipes. Will definitely order again."
  },
  {
    id: 4,
    name: "David Wong",
    rating: 5,
    date: "2023-06-28",
    comment: "Great taste and texture. Love knowing they're grown sustainably."
  }
];

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === Number(productId));
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const { toast } = useToast();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<Record<string, string>>({});
  const [selectedWeight, setSelectedWeight] = useState<number | undefined>(
    product?.weight?.options[0]
  );
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'shipping'>('details');

  const increasedPrice = selectedWeight && product 
    ? product.price * (selectedWeight / (product.weight?.options[0] || 1)) 
    : product?.price;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container mx-auto py-16 px-4 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you are looking for does not exist.</p>
          <Button onClick={() => navigate('/products')} className="bg-mosaic-green hover:bg-mosaic-green-dark">
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    if (Object.keys(selectedVariation).length < (product.variations?.length || 0)) {
      toast({
        title: "Selection Required",
        description: "Please select all options before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, quantity, selectedVariation, selectedWeight);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  const handleVariationChange = (name: string, value: string) => {
    setSelectedVariation(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <button 
            onClick={() => navigate('/products')} 
            className="flex items-center text-mosaic-green hover:text-mosaic-green-dark mb-6 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Products
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden animate-fade-in">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Product Details */}
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="mb-2 text-mosaic-green">{product.category}</div>
              <h1 className="text-3xl font-serif font-bold text-mosaic-green-dark mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center text-amber-500 mr-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">24 reviews</span>
              </div>
              
              <div className="text-2xl font-bold text-mosaic-green-dark mb-4">
                ${increasedPrice?.toFixed(2)}
              </div>
              
              <p className="text-gray-700 mb-6">
                {product.description}
              </p>
              
              <div className="space-y-6 mb-8">
                {/* Weight Selection */}
                {product.weight && (
                  <div>
                    <h3 className="font-semibold mb-2">Weight</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.weight.options.map((weight) => (
                        <button
                          key={weight}
                          onClick={() => setSelectedWeight(weight)}
                          className={`px-4 py-2 border rounded-md transition-colors ${
                            selectedWeight === weight
                              ? 'bg-mosaic-green text-white border-mosaic-green'
                              : 'border-gray-300 hover:border-mosaic-green'
                          }`}
                        >
                          {weight}{product.weight?.unit}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Variations Selection */}
                {product.variations?.map((variation) => (
                  <div key={variation.name}>
                    <h3 className="font-semibold mb-2">{variation.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {variation.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleVariationChange(variation.name, option)}
                          className={`px-4 py-2 border rounded-md transition-colors ${
                            selectedVariation[variation.name] === option
                              ? 'bg-mosaic-green text-white border-mosaic-green'
                              : 'border-gray-300 hover:border-mosaic-green'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Quantity */}
                <div>
                  <h3 className="font-semibold mb-2">Quantity</h3>
                  <div className="flex items-center border border-gray-300 rounded-md w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-mosaic-green transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 border-l border-r border-gray-300">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-mosaic-green transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors flex-1 py-6"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </Button>
                
                <Button
                  onClick={handleAddToWishlist}
                  variant="outline"
                  className={`flex items-center justify-center gap-2 border-mosaic-green text-mosaic-green-dark hover:bg-mosaic-green-light hover:text-mosaic-green-dark transition-colors py-6 ${
                    isInWishlist(product.id) ? 'bg-mosaic-green-light' : ''
                  }`}
                >
                  <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>
              
              {/* Product Details */}
              <div className="space-y-4 border-t border-gray-200 pt-6">
                <div className="flex items-center">
                  <Truck size={18} className="text-mosaic-green mr-3" />
                  <span>Free shipping on orders over $50</span>
                </div>
                
                <div className="flex items-center">
                  <Package size={18} className="text-mosaic-green mr-3" />
                  <span>Eco-friendly packaging</span>
                </div>
                
                <div className="flex items-center">
                  <Leaf size={18} className="text-mosaic-green mr-3" />
                  <span>Organically grown</span>
                </div>
                
                <div className="flex items-center">
                  <Tag size={18} className="text-mosaic-green mr-3" />
                  <span>10% off on first order with code: WELCOME10</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="border-b border-gray-200 mb-6">
              <div className="flex space-x-8">
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`pb-4 ${
                    activeTab === 'details'
                      ? 'border-b-2 border-mosaic-green text-mosaic-green-dark font-semibold'
                      : 'text-gray-500 hover:text-mosaic-green-dark transition-colors'
                  }`}
                >
                  Product Details
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-4 ${
                    activeTab === 'reviews'
                      ? 'border-b-2 border-mosaic-green text-mosaic-green-dark font-semibold'
                      : 'text-gray-500 hover:text-mosaic-green-dark transition-colors'
                  }`}
                >
                  Reviews (24)
                </button>
                <button 
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-4 ${
                    activeTab === 'shipping'
                      ? 'border-b-2 border-mosaic-green text-mosaic-green-dark font-semibold'
                      : 'text-gray-500 hover:text-mosaic-green-dark transition-colors'
                  }`}
                >
                  Shipping & Returns
                </button>
              </div>
            </div>
            
            {activeTab === 'details' && (
              <div className="prose max-w-none animate-fade-in">
                <h3>Product Information</h3>
                <p>
                  Our {product.name} is sourced directly from our farms in Ghana, where we employ sustainable and ethical farming practices. We prioritize quality and environmental responsibility in all our products.
                </p>
                
                <h3>Benefits</h3>
                <ul>
                  <li>Organic and sustainably grown</li>
                  <li>Rich in essential nutrients</li>
                  <li>Supports local farming communities</li>
                  <li>Ethically harvested and processed</li>
                </ul>
                
                <h3>How to Use</h3>
                <p>
                  {product.category === 'Nuts' && 'Enjoy as a healthy snack, add to salads, or use in your baking recipes.'}
                  {product.category === 'Flour' && 'Perfect for gluten-free baking. Use it for making bread, cookies, pancakes or add to smoothies for extra nutrition.'}
                  {product.category === 'Beverages' && 'Enjoy chilled, use in smoothies, or as a dairy alternative in your coffee and cereal.'}
                  {product.category === 'Dessert' && 'Ready to enjoy! Simply thaw for a few minutes before serving if frozen.'}
                </p>
                
                <h3>Storage</h3>
                <p>
                  {product.category === 'Nuts' || product.category === 'Flour' 
                    ? 'Store in a cool, dry place. Once opened, keep in an airtight container.' 
                    : 'Keep refrigerated at all times. Consume within 7 days of opening.'}
                </p>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-8 animate-fade-in">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={20} fill="currentColor" />
                      ))}
                    </div>
                    <span className="ml-2 text-lg font-medium">4.8 out of 5</span>
                    <span className="ml-2 text-gray-500">(24 reviews)</span>
                  </div>
                </div>
                
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{review.name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          fill={star <= review.rating ? "rgb(245 158 11)" : "none"}
                          className={star <= review.rating ? "text-amber-500" : "text-gray-300"}
                        />
                      ))}
                    </div>
                    
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
                
                <div className="pt-4">
                  <Button 
                    variant="outline" 
                    className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green-light"
                  >
                    Write a Review
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'shipping' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Shipping Information</h3>
                  <p className="mb-4">
                    We ship our products across Ghana and to select international destinations. All orders are processed within 1-2 business days.
                  </p>
                  
                  <div className="bg-mosaic-earth-light/50 p-4 rounded-md mb-6">
                    <h4 className="font-semibold mb-2">Domestic Shipping (Ghana)</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Standard Shipping: 5-7 business days (5.99 GHS)</li>
                      <li>Express Shipping: 2-3 business days (12.99 GHS)</li>
                      <li>Free standard shipping on orders over 50 GHS</li>
                      <li>Local pickup available at our Accra facility</li>
                    </ul>
                  </div>
                  
                  <div className="bg-mosaic-earth-light/50 p-4 rounded-md">
                    <h4 className="font-semibold mb-2">International Shipping</h4>
                    <p>
                      International shipping is available to select countries. Shipping costs and delivery times vary based on location.
                      Please contact us for specific international shipping quotes.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Returns & Refunds</h3>
                  <p className="mb-4">
                    We want you to be completely satisfied with your purchase. If you're not satisfied with your order, please follow our return policy:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Returns must be initiated within 14 days of delivery</li>
                    <li>Products must be unused and in original packaging</li>
                    <li>Perishable items (opened food products) cannot be returned</li>
                    <li>Refunds will be issued to the original payment method</li>
                    <li>For quality issues, please contact us with photos of the product</li>
                  </ul>
                  
                  <div className="mt-4">
                    <Button 
                      variant="outline" 
                      className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green-light"
                    >
                      Contact Support
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Related Products */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-2xl font-serif font-bold text-mosaic-green-dark mb-6">
              You May Also Like
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products
                .filter(p => p.id !== product.id)
                .slice(0, 4)
                .map(relatedProduct => (
                  <div 
                    key={relatedProduct.id}
                    className="bg-white rounded-lg border border-mosaic-earth overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    onClick={() => navigate(`/product/${relatedProduct.id}`)}
                    role="button"
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-serif font-bold text-mosaic-green-dark">{relatedProduct.name}</h4>
                        <span className="text-mosaic-green font-bold">${relatedProduct.price.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{relatedProduct.description}</p>
                      <Button
                        className="w-full bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(relatedProduct);
                          toast({
                            title: "Added to Cart",
                            description: `${relatedProduct.name} has been added to your cart.`,
                          });
                        }}
                      >
                        <ShoppingCart size={18} className="mr-2" /> Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
