import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with new component */}
      <HeroSection
        title="About Mosaic Grove"
        subtitle="Our mission is to cultivate sustainable agriculture and empower local communities in Ghana"
        backgroundImage="/kwame.jpeg"
        overlayClass="bg-mosaic-green-dark/60"
      />
      
      {/* Our Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-heading text-center mb-12">Our Story</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <p className="mb-6">
                Mosaic Grove was founded in 2018 with a vision to transform rural Ghanaian communities through sustainable agriculture. After leaving Ghana at 17, our founder Dr. Kaadze Wright returned with a mission to create jobs and ensure food security.
              </p>
              <p className="mb-6">
                Starting with a 100-acre organic cashew farm in the Eastern Afram Plains, we employed women and youth from surrounding communities, providing training and fair wages.
              </p>
              <p>
                In 2020, we expanded to tiger nut cultivation in the Kwahu region, adding another nutritious and environmentally sustainable crop to our portfolio.
              </p>
            </div>
            <div className="bg-mosaic-earth-light p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif font-bold text-mosaic-green-dark mb-4">Our Journey</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="bg-mosaic-green rounded-full w-6 h-6 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <span className="font-bold">2018:</span> Founded with 100-acre organic cashew farm in Eastern Afram Plains
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-mosaic-green rounded-full w-6 h-6 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <span className="font-bold">2020:</span> Expanded to tiger nut cultivation in Kwahu region
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-mosaic-green rounded-full w-6 h-6 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <span className="font-bold">2022:</span> Launched processing facility for value-added products
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-mosaic-green rounded-full w-6 h-6 flex items-center justify-center text-white font-bold mr-4 flex-shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <span className="font-bold">2023:</span> Expanded e-commerce platform to reach global markets
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-mosaic-earth-light/50 p-8 rounded-lg">
            <h3 className="section-subheading mb-4">Our Vision for the Future</h3>
            <p className="mb-4">
              We're now pioneering innovative plant-based products while continuously supporting local farmers. Our vision extends beyond agriculture to creating lasting social impact:
            </p>
            <ul className="list-disc pl-5 space-y-3 mb-4">
              <li>Expanding our farmer network to create 500+ jobs by 2025</li>
              <li>Establishing a training academy for sustainable farming practices</li>
              <li>Developing value-added products like plant-based milk and flour alternatives</li>
              <li>Building a carbon-neutral processing facility powered by renewable energy</li>
            </ul>
            <p>
              Through it all, we remain committed to our founding principles of sustainability, community empowerment, and ethical business practices.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-heading text-center mb-12">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-mosaic-earth text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4">
                {/* Placeholder for profile image */}
              </div>
              <h3 className="text-xl font-serif font-bold text-mosaic-green-dark">Dr. Kaadze Wright</h3>
              <p className="text-sm text-gray-600 mb-3">Founder & CEO</p>
              <p className="text-sm">
                Agricultural economist with 15+ years of experience in sustainable farming practices and rural development.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-mosaic-earth text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4">
                {/* Placeholder for profile image */}
              </div>
              <h3 className="text-xl font-serif font-bold text-mosaic-green-dark">Ama Osei</h3>
              <p className="text-sm text-gray-600 mb-3">Operations Director</p>
              <p className="text-sm">
                Logistics expert who oversees our farming operations and ensures efficient distribution of products.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-mosaic-earth text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4">
                {/* Placeholder for profile image */}
              </div>
              <h3 className="text-xl font-serif font-bold text-mosaic-green-dark">Kwame Darko</h3>
              <p className="text-sm text-gray-600 mb-3">Community Relations</p>
              <p className="text-sm">
                Passionate about social impact, Kwame manages our community engagement programs and cooperative relationships.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 px-4 bg-mosaic-green text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p>Committed to environmentally responsible farming practices that preserve Ghana's natural resources</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p>Investing in people and communities to create lasting positive social impact</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p>Continuously exploring new ways to improve our products and practices</p>
            </div>
          </div>
          
          <div className="mt-12">
            <Link to="/impact" className="inline-block bg-white text-mosaic-green-dark px-6 py-3 rounded-md hover:bg-mosaic-earth hover:text-mosaic-green-dark transition-colors duration-300">
              Learn About Our Impact
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
