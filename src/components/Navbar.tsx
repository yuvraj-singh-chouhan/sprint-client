
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Heart, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { useAuth } from '@/hooks/use-auth';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { isAuthenticated, logout } = useAuth();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shoes", label: "Shop" },
    { to: "/men", label: "Men" },
    { to: "/women", label: "Women" },
    { to: "/collections", label: "Collections" },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm' 
          : 'bg-white/90 backdrop-blur-sm border-b border-neutral-100'
      }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo Section - Fixed Width */}
            <div className="flex items-center w-48">
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text transition-all duration-300 group-hover:scale-105">
                    SoleVenture
                  </h1>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></div>
                </div>
              </Link>
            </div>

            {/* Center Navigation - Hidden on mobile */}
            <nav className="hidden md:flex items-center justify-center flex-3 mr-8">
              <div className="flex items-center space-x-6 lg:space-x-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.to}
                    to={link.to} 
                    className="relative text-neutral-700 hover:text-brand transition-all duration-300 font-medium group py-2 text-sm lg:text-base"
                  >
                    {link.label}
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-full"></div>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right Section - Actions */}
            <div className="flex items-center justify-end w-48 lg:w-64">
              <div className="flex items-center space-x-2 lg:space-x-3">
                {/* Enhanced Search - Only on larger screens */}
                <div className="hidden lg:flex items-center relative">
                  <div className={`relative transition-all duration-300 ${
                    isSearchFocused ? 'scale-105' : 'scale-100'
                  }`}>
                    <Input 
                      type="search"
                      placeholder="Search..."
                      className={`w-[180px] xl:w-[220px] pl-4 pr-10 py-1.5 rounded-full transition-all duration-300 text-sm ${
                        isSearchFocused 
                          ? 'shadow-lg shadow-brand/20' 
                          : ''
                      }`}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                    <Search className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${
                      isSearchFocused ? 'text-brand' : 'text-neutral-400'
                    }`} size={16} />
                  </div>
                </div>
                
                {/* Action Icons */}
                <div className="flex items-center space-x-1">
                  {/* Enhanced Wishlist */}
                  <Link to="/wishlist" className="relative group p-2 rounded-full hover:bg-neutral-100 transition-all duration-300">
                    <Heart className="h-5 w-5 lg:h-6 lg:w-6 text-neutral-700 group-hover:text-red-500 transition-all duration-300 group-hover:scale-110" />
                    {wishlistCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center animate-pulse">
                        <span className="text-xs">{wishlistCount}</span>
                      </Badge>
                    )}
                  </Link>
                  
                  {/* Enhanced Cart */}
                  <Link to="/cart" className="relative group p-2 rounded-full hover:bg-neutral-100 transition-all duration-300">
                    <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 text-neutral-700 group-hover:text-brand transition-all duration-300 group-hover:scale-110" />
                    {itemCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-brand text-white text-xs font-bold rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center pulse-glow">
                        <span className="text-xs">{itemCount}</span>
                      </Badge>
                    )}
                  </Link>
                </div>
                
                {/* Enhanced Auth Links - Desktop */}
                <div className="hidden xl:flex items-center space-x-2">
                  {isAuthenticated ? (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-neutral-700 hover:text-brand hover:bg-brand/10 rounded-full px-3 py-1.5 transition-all duration-300 text-sm"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-1.5 h-4 w-4" />
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-neutral-700 hover:text-brand hover:bg-brand/10 rounded-full px-3 py-1.5 transition-all duration-300 text-sm"
                        onClick={() => navigate('/signin')}
                      >
                        <LogIn className="mr-1.5 h-4 w-4" />
                        Sign In
                      </Button>
                      <Button 
                        size="lg" 
                        className="bg-brand hover:bg-brand-dark  text-white rounded-full px-4 py-2.5 shadow-lg hover:shadow-brand/30 transition-all duration-300 text-sm"
                        onClick={() => navigate('/signup')}
                      >
                        <UserPlus className="mr-1 h-4 w-4" />
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
                {/* Enhanced Mobile Menu Button */}
                <Button 
                  onClick={toggleMenu} 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden relative p-2 rounded-full hover:bg-neutral-100 transition-all duration-300 ml-2"
                >
                  <div className="relative w-5 h-5">
                    <Menu className={`h-5 w-5 absolute transition-all duration-300 ${
                      isMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                    }`} />
                    <X className={`h-5 w-5 absolute transition-all duration-300 ${
                      isMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                    }`} />
                  </div>
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-[500px] pb-6' : 'max-h-0 pb-0'
          }`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mt-4 border border-neutral-200 shadow-lg">
              <nav className="flex flex-col space-y-3">
                {/* Mobile Navigation Links */}
                {navLinks.map((link, index) => (
                  <Link 
                    key={link.to}
                    to={link.to} 
                    className="text-neutral-700 hover:text-brand transition-all duration-300 py-3 px-4 rounded-xl hover:bg-brand/10 font-medium group reveal-animation"
                    style={{animationDelay: `${index * 0.1}s`}}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      {link.label}
                      <div className="w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-6"></div>
                    </div>
                  </Link>
                ))}
                
                {/* Mobile Wishlist */}
                <Link
                  to="/wishlist"
                  className="text-neutral-700 hover:text-brand transition-all duration-300 py-3 px-4 rounded-xl hover:bg-brand/10 flex items-center justify-between group reveal-animation"
                  style={{animationDelay: '0.5s'}}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Heart className="mr-3 h-5 w-5" /> 
                    Wishlist
                  </div>
                  <div className="flex items-center">
                    {wishlistCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center mr-2">
                        {wishlistCount}
                      </Badge>
                    )}
                    <div className="w-0 h-0.5 bg-brand transition-all duration-300 group-hover:w-6"></div>
                  </div>
                </Link>
                
                {/* Mobile Search */}
                <div className="pt-2 reveal-animation" style={{animationDelay: '0.6s'}}>
                  <div className="relative">
                    <Input 
                      type="search"
                      placeholder="Search products..."
                      className="w-full pl-4 pr-10 py-3 rounded-xl border-2 border-neutral-200 focus:border-brand transition-all duration-300"
                    />
                    <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                  </div>
                </div>

                {/* Enhanced Auth Links - Mobile */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-neutral-200 reveal-animation" style={{animationDelay: '0.7s'}}>
                  {isAuthenticated ? (
                    <Button 
                      variant="outline" 
                      className="w-full justify-center rounded-xl border-2 hover:bg-neutral-50 transition-all duration-300"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full justify-center rounded-xl border-2 hover:bg-neutral-50 transition-all duration-300"
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate('/signin');
                        }}
                      >
                        <LogIn className="mr-2 h-4 w-4" /> Sign In
                      </Button>
                      <Button 
                        className="w-full justify-center bg-brand hover:bg-brand-dark rounded-xl shadow-lg hover:shadow-brand/30 transition-all duration-300"
                        onClick={() => {
                          setIsMenuOpen(false);
                          navigate('/signup');
                        }}
                      >
                        <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
