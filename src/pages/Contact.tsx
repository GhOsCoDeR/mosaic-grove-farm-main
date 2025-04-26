import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll get back to you soon!",
        duration: 5000,
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with new component */}
      <HeroSection
        title="Contact Us"
        subtitle="Get in touch with the Mosaic Grove team for inquiries, partnerships, or more information"
        backgroundImage="/tigernut4.jpg"
        height="py-40"
      />
      
      {/* Contact Form & Info */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="section-subheading mb-6">Get in Touch</h2>
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-mosaic-green mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Our Locations</h3>
                    <p className="text-gray-600">Eastern Afram Plains, Ghana</p>
                    <p className="text-gray-600">Kwahu Region, Ghana</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-mosaic-green mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-gray-600">info@mosaicgrove.com</p>
                    <p className="text-gray-600">partnerships@mosaicgrove.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-mosaic-green mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-gray-600">+233 XX XXX XXXX</p>
                    <p className="text-gray-600">+233 XX XXX XXXX</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-mosaic-earth-light p-6 rounded-lg">
                <h3 className="font-serif font-bold mb-3">Business Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="section-subheading mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mosaic-green"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mosaic-green"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mosaic-green"
                  >
                    <option value="">Select a subject</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                    <option value="Career Information">Career Information</option>
                    <option value="Media Inquiry">Media Inquiry</option>
                    <option value="General Question">General Question</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mosaic-green"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="flex items-center bg-mosaic-green text-white px-6 py-3 rounded-md hover:bg-mosaic-green-dark transition-colors duration-300 disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 px-4 bg-mosaic-earth-light">
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-heading text-center mb-12">Our Locations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="section-subheading mb-4">Eastern Afram Plains</h3>
              <div className="bg-gray-300 h-80 w-full rounded-lg shadow-md">
                {/* Placeholder for map */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Map of Eastern Afram Plains Location
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="section-subheading mb-4">Kwahu Region</h3>
              <div className="bg-gray-300 h-80 w-full rounded-lg shadow-md">
                {/* Placeholder for map */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Map of Kwahu Region Location
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partnership CTA */}
      <section className="py-16 px-4 bg-mosaic-green text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Partner With Us
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We're always open to collaboration opportunities with organizations that share our vision for sustainable agriculture and community empowerment.
          </p>
          <a href="mailto:partnerships@mosaicgrove.com" className="inline-block bg-white text-mosaic-green-dark px-6 py-3 rounded-md hover:bg-mosaic-earth hover:text-mosaic-green-dark transition-colors duration-300">
            Discuss Partnership
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Contact;
