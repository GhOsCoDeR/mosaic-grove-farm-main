import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { Users, Leaf, Home, Book } from 'lucide-react';

const Impact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with new component */}
      <HeroSection
        title="Our Impact"
        subtitle="Creating positive change through sustainable agriculture and community empowerment"
        backgroundImage="/ag2.jpg"
        overlayClass="bg-mosaic-green-dark/50"
      />
      
      {/* Overview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="section-heading">Our Commitment to Positive Change</h2>
          <p className="text-lg mb-12 max-w-3xl mx-auto">
            At Mosaic Grove, we believe that sustainable agriculture can be a powerful force for social and environmental good. Our impact strategy focuses on four key areas: economic empowerment, environmental sustainability, education, and community development.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-mosaic-earth-light p-6 rounded-lg text-center">
              <div className="bg-mosaic-green rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">300+</h3>
              <p>Jobs created for women and youth</p>
            </div>
            
            <div className="bg-mosaic-earth-light p-6 rounded-lg text-center">
              <div className="bg-mosaic-green rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">500+</h3>
              <p>Acres under sustainable cultivation</p>
            </div>
            
            <div className="bg-mosaic-earth-light p-6 rounded-lg text-center">
              <div className="bg-mosaic-green rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Home className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">12</h3>
              <p>Communities supported</p>
            </div>
            
            <div className="bg-mosaic-earth-light p-6 rounded-lg text-center">
              <div className="bg-mosaic-green rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Book className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">200+</h3>
              <p>Farmers trained in sustainable practices</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Economic Impact */}
      <section className="py-16 px-4 bg-mosaic-earth-light/50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">Economic Empowerment</h2>
              <p className="mb-4">
                We're creating sustainable livelihoods for women and youth in rural Ghana through fair employment practices and training:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                  <span>Providing above-market wages to 300+ workers</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                  <span>Skills development programs for career advancement</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                  <span>Supporting women-led cooperatives and entrepreneurship</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                  <span>Microloan programs for farmers to expand their operations</span>
                </li>
              </ul>
              <blockquote className="border-l-4 border-mosaic-green pl-4 italic">
                "Working with Mosaic Grove has transformed my life. I've been able to support my family and send my children to school."
                <footer className="mt-2 text-sm">- Abena M., Cashew Processing Team</footer>
              </blockquote>
            </div>
            <div className="bg-gray-200 h-80 rounded-lg">
              {/* Placeholder for impact image */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Workers in the Field Image
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Environmental Impact */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-gray-200 h-80 rounded-lg">
              {/* Placeholder for impact image */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Sustainable Farming Practices Image
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="section-heading">Environmental Sustainability</h2>
              <p className="mb-4">
                Our commitment to the environment extends throughout our operations:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                  <span>100% organic farming practices with no synthetic chemicals</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                  <span>Water conservation through drip irrigation systems</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                  <span>Solar-powered processing facilities and equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                  <span>Tree planting initiatives (5,000+ trees planted)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">✓</span>
                  <span>Eco-friendly packaging from biodegradable materials</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Development */}
      <section className="py-16 px-4 bg-mosaic-earth-light/50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-heading text-center mb-12">Community Development</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-3">Education</h3>
              <p className="mb-4">
                Funded renovation of 4 local schools and established scholarship programs for 50+ students.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-3">Healthcare</h3>
              <p className="mb-4">
                Supported mobile clinic initiatives providing healthcare access to 5,000+ rural residents.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-3">Infrastructure</h3>
              <p className="mb-4">
                Helped improve road access and clean water facilities in partner communities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Sustainability Goals */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-heading text-center mb-12">Our Sustainability Goals</h2>
          
          <div className="space-y-10">
            <div className="bg-mosaic-earth-light/30 p-6 rounded-lg">
              <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-3">Short Term (2023-2024)</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">1</span>
                  <span>Achieve carbon-neutral operations across all facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">2</span>
                  <span>Expand farmer training program to reach 100 additional farmers</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">3</span>
                  <span>Implement water recycling systems at all processing facilities</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-mosaic-earth-light/30 p-6 rounded-lg">
              <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-3">Medium Term (2025-2026)</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">1</span>
                  <span>Create 200 additional jobs across our operations</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">2</span>
                  <span>Launch sustainability certification program for partner farmers</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">3</span>
                  <span>Expand renewable energy use to power 100% of operations</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-mosaic-earth-light/30 p-6 rounded-lg">
              <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-3">Long Term (2027-2030)</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">1</span>
                  <span>Establish agricultural training center serving 1,000+ farmers annually</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">2</span>
                  <span>Achieve zero waste across entire supply chain</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-mosaic-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-1">3</span>
                  <span>Support creation of 5 additional women-led agricultural cooperatives</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Get Involved Section */}
      <section className="py-16 px-4 bg-mosaic-green text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Join Our Mission
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Together, we can create a more sustainable future while empowering rural communities in Ghana.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/products" className="inline-block bg-white text-mosaic-green-dark px-6 py-3 rounded-md hover:bg-mosaic-earth hover:text-mosaic-green-dark transition-colors duration-300">
              Shop Our Products
            </Link>
            <Link to="/contact" className="inline-block bg-transparent border-2 border-white px-6 py-3 rounded-md hover:bg-white hover:text-mosaic-green-dark transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Impact;
