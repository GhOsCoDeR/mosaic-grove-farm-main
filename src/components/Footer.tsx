
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-mosaic-green-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-serif mb-4">Mosaic Grove</h3>
            <p className="mb-4">
              Empowering women and youth through sustainable farming in Ghana's Eastern Afram Plains and Kwahu regions.
            </p>
            <div className="flex space-x-4">
              {/* Social media links would go here */}
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-serif mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-mosaic-earth transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-mosaic-earth transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-mosaic-earth transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/impact" className="hover:text-mosaic-earth transition-colors">
                  Community Impact
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-mosaic-earth transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-serif mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="flex-shrink-0 h-5 w-5 mt-0.5" />
                <span>Eastern Afram Plains & Kwahu Region, Ghana</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <span>+233 XX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <span>info@mosaicgrove.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Mosaic Grove. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
