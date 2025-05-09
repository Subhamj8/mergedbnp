import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-gray-400 mt-4">
              Professional printing and branding solutions for businesses of all sizes.
              Quality products, fast delivery, and exceptional customer service.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=business-cards" className="text-gray-400 hover:text-white transition-colors">
                  Business Cards
                </Link>
              </li>
              <li>
                <Link to="/products?category=flyers" className="text-gray-400 hover:text-white transition-colors">
                  Flyers & Brochures
                </Link>
              </li>
              <li>
                <Link to="/products?category=banners" className="text-gray-400 hover:text-white transition-colors">
                  Banners & Signage
                </Link>
              </li>
              <li>
                <Link to="/products?category=stationery" className="text-gray-400 hover:text-white transition-colors">
                  Branded Stationery
                </Link>
              </li>
              <li>
                <Link to="/products?category=promotional" className="text-gray-400 hover:text-white transition-colors">
                  Promotional Items
                </Link>
              </li>
              <li>
                <Link to="/products?category=packaging" className="text-gray-400 hover:text-white transition-colors">
                  Custom Packaging
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-gray-400 mr-3 mt-1" />
                <span className="text-gray-400">
                  123 Print Avenue, Suite 101<br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gray-400 mr-3" />
                <a href="tel:+18001234567" className="text-gray-400 hover:text-white transition-colors">
                  (800) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gray-400 mr-3" />
                <a href="mailto:info@printmaster.com" className="text-gray-400 hover:text-white transition-colors">
                  info@printmaster.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} PrintMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;