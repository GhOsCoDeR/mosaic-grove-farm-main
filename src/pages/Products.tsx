import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Leaf, Star, Plus, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Product as ProductType } from '../contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const products: ProductType[] = [
  {
    id: 1,
    name: "Organic Cashews",
    description: "Ethically grown and harvested cashews from our farms in the Eastern Afram Plains.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1563412580953-7f9e99209336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FzaGV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
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
    description: "Our signature product, perfect for gluten-free baking and adding nutritional value to smoothies and recipes.",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmxvdXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
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
    description: "Creamy plant-based milk alternative rich in nutrients and natural sweetness.",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGxhbnQlMjBtaWxrfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
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
    description: "Frozen treats featuring the unique flavor and nutrition of tiger nuts.",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
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

const Products = () => {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.id.split('-')[1]);
            setVisibleItems(prev => [...prev, id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.product-item').forEach(item => {
      observer.observe(item);
    });

    return () => {
      document.querySelectorAll('.product-item').forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  const handleAddToCart = (product: ProductType, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleAddToWishlist = (product: ProductType, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToWishlist(product);
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };
  
  const handleViewDetails = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const isVisible = (id: number) => visibleItems.includes(id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="bg-mosaic-green-dark text-white py-20 px-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/tigernutflour.jpg')] bg-cover opacity-75 scale-110 animate-scale-in"></div>
        <div className="container mx-auto text-center max-w-3xl relative z-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Our Products
          </h1>
          <p className="text-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover our range of sustainable, organic products grown with care in Ghana
          </p>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-heading text-center mb-12 animate-fade-in">Nutri-Rich Harvests</h2>
          
          <div className="mb-16">
            <h3 className="text-2xl font-serif font-bold text-mosaic-green-dark mb-8 text-center animate-fade-in">
              Featured Products
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div 
                  id={`product-${product.id}`}
                  key={product.id} 
                  className={`product-item bg-white rounded-lg border border-mosaic-earth overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                    isVisible(product.id) ? 'animate-scale-in opacity-100' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleViewDetails(product.id)}
                >
                  <div className="h-48 overflow-hidden relative group">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="bg-white text-mosaic-green-dark p-2 rounded-full mx-1 hover:bg-mosaic-green hover:text-white transition-colors"
                        onClick={(e) => handleViewDetails(product.id)}
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        className="bg-white text-mosaic-green-dark p-2 rounded-full mx-1 hover:bg-mosaic-green hover:text-white transition-colors"
                        onClick={(e) => handleAddToCart(product, e)}
                      >
                        <ShoppingCart size={18} />
                      </button>
                      <button 
                        className={`bg-white p-2 rounded-full mx-1 transition-colors ${
                          isInWishlist(product.id)
                            ? 'text-red-500'
                            : 'text-mosaic-green-dark hover:bg-mosaic-green hover:text-white'
                        }`}
                        onClick={(e) => handleAddToWishlist(product, e)}
                      >
                        <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-serif font-bold text-mosaic-green-dark">{product.name}</h4>
                      <span className="text-mosaic-green font-bold">${product.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <Button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-mosaic-green h-1 flex-grow"></div>
              <h3 className="text-2xl font-serif font-bold text-mosaic-green-dark mx-4">Organic Cashews</h3>
              <div className="bg-mosaic-green h-1 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-200 h-80 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1563412580953-7f9e99209336?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FzaGV3c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" 
                  alt="Cashews" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="animate-fade-in">
                <p className="mb-4">
                  Our organic cashews are cultivated on our 100-acre farm in Ghana's Eastern Afram Plains, where we employ sustainable farming practices that preserve the environment while producing premium quality nuts.
                </p>
                <p className="mb-6">
                  Currently, 40 acres have been successfully cultivated, with harvesting already underway. Our cashews are grown without chemical pesticides or fertilizers, resulting in a product that's not only better for you but also for the planet.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>100% Organic</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>Premium Quality</span>
                  </div>
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>Sustainably Grown</span>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => handleViewDetails(1)}
                    variant="outline"
                    className="border-mosaic-green text-mosaic-green hover:bg-mosaic-green hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Eye size={18} />
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(products[0])}
                    className="bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors flex items-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
            <div className="flex items-center mb-6">
              <div className="bg-mosaic-green h-1 flex-grow"></div>
              <h3 className="text-2xl font-serif font-bold text-mosaic-green-dark mx-4">Tiger Nuts & Products</h3>
              <div className="bg-mosaic-green h-1 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="order-1 md:order-2 bg-gray-200 h-80 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bnV0c3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" 
                  alt="Tiger Nuts" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="order-2 md:order-1 animate-fade-in">
                <p className="mb-4">
                  In 2020, we launched the only tiger nut cooperative farm in Ghana's eastern Kwahu region. Tiger nuts are not actually nuts, but nutrient-rich tubers with numerous health benefits.
                </p>
                <p className="mb-4">
                  Under our subsidiary, Not Nuts, we currently produce organic tiger nut flour from our harvests. This versatile flour is gluten-free, rich in fiber, and packed with essential nutrients.
                </p>
                <p className="mb-6">
                  Soon, we'll be expanding our product line to include innovative tiger nut creations, including plant-based milk, frozen desserts, and baked goods—all bringing the nutritional benefits of tiger nuts to consumers in new and delicious ways.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>Rich in fiber and nutrients</span>
                  </div>
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>Certified organic</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-mosaic-green mr-2" />
                    <span>Naturally gluten-free</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-xl font-serif font-semibold text-mosaic-green mb-6">Tiger Nut Product Range</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-mosaic-earth-light rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 overflow-hidden relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1614961233913-a5113a4a34ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmxvdXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" 
                      alt="Tiger Nut Flour" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="bg-white text-mosaic-green-dark p-2 rounded-full mx-1 hover:bg-mosaic-green hover:text-white transition-colors"
                        onClick={() => handleViewDetails(2)}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                  <h5 className="font-serif font-bold text-mosaic-green-dark mb-2">Organic Tiger Nut Flour</h5>
                  <p className="text-sm mb-4">
                    Our signature product, perfect for gluten-free baking and adding nutritional value to smoothies and recipes.
                  </p>
                  <Button
                    onClick={() => handleAddToCart(products[1])}
                    className="w-full bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </Button>
                </div>
                
                <div className="bg-mosaic-earth-light rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 overflow-hidden relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGxhbnQlMjBtaWxrfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" 
                      alt="Tiger Nut Milk" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="bg-white text-mosaic-green-dark p-2 rounded-full mx-1 hover:bg-mosaic-green hover:text-white transition-colors"
                        onClick={() => handleViewDetails(3)}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                  <h5 className="font-serif font-bold text-mosaic-green-dark mb-2">Tiger Nut Milk <span className="text-mosaic-green text-xs ml-1">(Coming Soon)</span></h5>
                  <p className="text-sm mb-4">
                    Creamy plant-based milk alternative rich in nutrients and natural sweetness.
                  </p>
                  <Button
                    onClick={() => handleAddToCart(products[2])}
                    className="w-full bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </Button>
                </div>
                
                <div className="bg-mosaic-earth-light rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 overflow-hidden relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGljZSUyMGNyZWFtfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" 
                      alt="Tiger Nut Desserts" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="bg-white text-mosaic-green-dark p-2 rounded-full mx-1 hover:bg-mosaic-green hover:text-white transition-colors"
                        onClick={() => handleViewDetails(4)}
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                  <h5 className="font-serif font-bold text-mosaic-green-dark mb-2">Tiger Nut Desserts <span className="text-mosaic-green text-xs ml-1">(Coming Soon)</span></h5>
                  <p className="text-sm mb-4">
                    Frozen treats and baked delights featuring the unique flavor and nutrition of tiger nuts.
                  </p>
                  <Button
                    onClick={() => handleAddToCart(products[3])}
                    className="w-full bg-mosaic-green hover:bg-mosaic-green-dark text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-mosaic-green h-1 flex-grow"></div>
              <h3 className="text-2xl font-serif font-bold text-mosaic-green-dark mx-4">New Crop Ventures</h3>
              <div className="bg-mosaic-green h-1 flex-grow"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-mosaic-earth rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in">
                <div className="bg-gray-200 h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1626683392018-9578a053b5e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJhZ29uJTIwZnJ1aXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" 
                    alt="Dragon Fruit" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-2">Dragon Fruits</h3>
                  <p>
                    In 2024, we began cultivating dragon fruits, known for their vibrant color, unique taste, and rich nutritional profile. This exotic superfruit is part of our commitment to diversifying sustainable agriculture in Ghana.
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-mosaic-earth rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="bg-gray-200 h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" 
                    alt="Wambugu Apple" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-2">Wambugu Apples</h3>
                  <p>
                    Sourced from Kenya, Wambugu apples represent our latest agricultural innovation. These unique apples are well-suited to African climates and offer a promising new crop for our sustainable farming initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-mosaic-earth-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518495973542-4542c06a5843')] bg-cover opacity-10"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="section-heading animate-fade-in">Health & Environmental Benefits</h2>
          <p className="mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Our commitment to organic farming practices results in products that are not only healthier for consumers but also better for our planet and communities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Organic</h3>
              <p className="text-sm">
                No synthetic pesticides or fertilizers, ensuring pure, chemical-free nutrition.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Sustainable</h3>
              <p className="text-sm">
                Farming practices that preserve soil health and protect local ecosystems.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Nutrient-Rich</h3>
              <p className="text-sm">
                Our products retain maximum nutritional value through careful cultivation and processing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="bg-mosaic-green rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-serif font-bold mb-2">Community-Focused</h3>
              <p className="text-sm">
                Every purchase supports our mission of empowering local farmers and communities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4 bg-mosaic-green text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mosaic-green-dark to-mosaic-green opacity-50"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 animate-fade-in">
            Interested in Our Products?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Reach out to learn more about wholesale opportunities, distribution partnerships, or inquire about our current availability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/wishlist" className="inline-block bg-white text-mosaic-green-dark px-6 py-3 rounded-md hover:bg-mosaic-earth hover:text-mosaic-green-dark transition-colors duration-300 animate-fade-in flex items-center gap-2" style={{ animationDelay: "0.2s" }}>
              <Heart size={18} /> View Wishlist
            </Link>
            <Link to="/contact" className="inline-block bg-white text-mosaic-green-dark px-6 py-3 rounded-md hover:bg-mosaic-earth hover:text-mosaic-green-dark transition-colors duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Products;
