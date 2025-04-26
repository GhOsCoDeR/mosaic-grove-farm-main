import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import { ArrowRight, Leaf, Users, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section relative text-white py-32 px-4">
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            
            backgroundImage: `url('/hero-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <ParticleBackground className="z-1" particleColor="#ffffff" />
        <div className="container mx-auto text-center max-w-4xl relative z-10 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Sustainable Farming for Community Empowerment
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Growing organic cashews and tiger nuts in Ghana while empowering women and youth
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products" className="btn-primary">
              Explore Our Products
            </Link>
            <Link to="/impact" className="btn-secondary">
              Our Impact
            </Link>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-heading text-center">Our Mission</h2>
          <p className="text-lg text-center mb-10">
            At Mosaic Grove, we're committed to revolutionizing agriculture in Ghana through sustainable practices while creating economic opportunities for rural communities.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-mosaic-earth-light p-6 rounded-lg text-center hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-102 transition-transform duration-300">
              <div className="bg-mosaic-green rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Sustainable Farming</h3>
              <p>Cultivating organic cashews and tiger nuts using eco-friendly methods that preserve our environment.</p>
            </div>
            
            <div className="bg-mosaic-earth-light p-6 rounded-lg text-center hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-102 transition-transform duration-300">
              <div className="bg-mosaic-green rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Community Empowerment</h3>
              <p>Creating meaningful employment opportunities for women and youth in rural Ghana.</p>
            </div>
            
            <div className="bg-mosaic-earth-light p-6 rounded-lg text-center hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-102 transition-transform duration-300">
              <div className="bg-mosaic-green rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Economic Growth</h3>
              <p>Reinvesting profits into local communities and developing innovative agricultural products.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Founder Story Preview */}
      <section className="py-16 px-4 bg-mosaic-earth-light">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="animate-fade-in">
              <h2 className="section-heading">Our Story</h2>
              <p className="mb-4">
                Founded by Dr. Kaadze Wright, Mosaic Grove began with a vision to transform rural Ghanaian communities through sustainable agriculture. After leaving Ghana at 17, Dr. Wright returned with a mission to create jobs and ensure food security.
              </p>
              <p className="mb-6">
                Starting with a 100-acre organic cashew farm in 2018 and expanding to tiger nut cultivation in 2020, we're now pioneering innovative plant-based products while supporting local farmers.
              </p>
              <Link to="/about" className="inline-flex items-center text-mosaic-green font-medium hover:text-mosaic-green-dark transition-colors">
                Read our full story <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img 
                src="/lovable-uploads/c22771de-87f4-4515-8f9a-0327322baa53.png" 
                alt="Our Farm" 
                className="w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Preview */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-heading text-center">Our Products</h2>
          <p className="text-lg text-center mb-10">
            Discover our nutritious, organic products cultivated with care in Ghana's fertile soils
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-mosaic-earth rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-mosaic-earth-light/50 relative overflow-hidden">
                <img 
                  src="/lovable-uploads/d9ef7ed8-9299-4ad9-8c34-939104708d9f.png" 
                  alt="Organic Cashews"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="section-subheading">Organic Cashews</h3>
                <p className="mb-4">
                  Ethically grown and harvested cashews from our farms in the Eastern Afram Plains.
                </p>
                <Link to="/products" className="inline-flex items-center text-mosaic-green font-medium hover:text-mosaic-green-dark transition-colors">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="bg-white border border-mosaic-earth rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-mosaic-earth-light/50 relative overflow-hidden">
                <img 
                  src="/lovable-uploads/c22771de-87f4-4515-8f9a-0327322baa53.png" 
                  alt="Tiger Nut Products"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="section-subheading">Tiger Nut Products</h3>
                <p className="mb-4">
                  Nutritious tiger nut flour and upcoming plant-based milk, frozen desserts, and baked goods.
                </p>
                <Link to="/products" className="inline-flex items-center text-mosaic-green font-medium hover:text-mosaic-green-dark transition-colors">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-mosaic-green text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're interested in our products, partnership opportunities, or supporting our community initiatives, we'd love to hear from you.
          </p>
          <Link to="/contact" className="inline-block bg-white text-mosaic-green-dark px-6 py-3 rounded-md hover:bg-mosaic-earth hover:text-mosaic-green-dark transition-colors duration-300">
            Get In Touch
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
