
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from '@/hooks/use-cart';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-brand-dark">SoleVenture</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-700 hover:text-brand transition duration-200">
              Home
            </Link>
            <Link to="/shoes" className="text-neutral-700 hover:text-brand transition duration-200">
              Shop
            </Link>
            <Link to="/men" className="text-neutral-700 hover:text-brand transition duration-200">
              Men
            </Link>
            <Link to="/women" className="text-neutral-700 hover:text-brand transition duration-200">
              Women
            </Link>
            <Link to="/collections" className="text-neutral-700 hover:text-brand transition duration-200">
              Collections
            </Link>
          </nav>

          {/* Search, Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center relative">
              <Input 
                type="search"
                placeholder="Search..."
                className="w-[200px] pr-8 focus-visible:ring-brand"
              />
              <Search size={18} className="absolute right-2.5 text-neutral-400" />
            </div>
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-neutral-700 hover:text-brand transition duration-200" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <Button 
              onClick={toggleMenu} 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-neutral-700 hover:text-brand transition duration-200 py-2 border-b border-neutral-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shoes" 
                className="text-neutral-700 hover:text-brand transition duration-200 py-2 border-b border-neutral-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                to="/men" 
                className="text-neutral-700 hover:text-brand transition duration-200 py-2 border-b border-neutral-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Men
              </Link>
              <Link 
                to="/women" 
                className="text-neutral-700 hover:text-brand transition duration-200 py-2 border-b border-neutral-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Women
              </Link>
              <Link 
                to="/collections" 
                className="text-neutral-700 hover:text-brand transition duration-200 py-2 border-b border-neutral-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Collections
              </Link>
              <div className="pt-2">
                <Input 
                  type="search"
                  placeholder="Search for shoes..."
                  className="w-full"
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
