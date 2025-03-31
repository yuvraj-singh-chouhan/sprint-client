
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and About */}
          <div>
            <h3 className="text-2xl font-bold mb-4">SoleVenture</h3>
            <p className="text-neutral-300 mb-6">
              Discover premium quality shoes for every occasion, style, and comfort.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-neutral-300 hover:text-brand-light transition">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="text-neutral-300 hover:text-brand-light transition">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-neutral-300 hover:text-brand-light transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shopping Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">Shopping</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/men" className="text-neutral-300 hover:text-white transition">
                  Men's Shoes
                </Link>
              </li>
              <li>
                <Link to="/women" className="text-neutral-300 hover:text-white transition">
                  Women's Shoes
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-neutral-300 hover:text-white transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-neutral-300 hover:text-white transition">
                  Collections
                </Link>
              </li>
              <li>
                <Link to="/sale" className="text-neutral-300 hover:text-white transition">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-medium mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-neutral-300 hover:text-white transition">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-300 hover:text-white transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-neutral-300 hover:text-white transition">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium mb-4">Join Our Newsletter</h4>
            <p className="text-neutral-300 mb-4">
              Stay updated with our latest releases and exclusive offers.
            </p>
            <div className="flex flex-col space-y-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
              />
              <Button className="bg-brand hover:bg-brand-dark text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SoleVenture. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
            <Link to="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
