
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, RefreshCw, Shield, Play, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { shoes, getNewArrivals, getSaleItems } from '@/data/shoes';

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const newArrivals = getNewArrivals().slice(0, 4);
  const saleItems = getSaleItems().slice(0, 4);
  const featuredShoes = shoes.slice(0, 8);

  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      text: "Absolutely love my new running shoes! They're so comfortable and supportive - perfect for my marathon training. Fast shipping too!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b2e29faa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      id: 2,
      name: "James T.",
      rating: 5,
      text: "The leather loafers I purchased are incredible. The quality is outstanding and they look even better in person. Will definitely shop here again.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 3,
      name: "Emma R.",
      rating: 5,
      text: "Customer service was exceptional when I needed to exchange a pair for a different size. The process was quick and hassle-free. Plus, the shoes are amazing!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const brands = [
    { name: "Nike", logo: "https://logoeps.com/wp-content/uploads/2013/03/nike-vector-logo.png" },
    { name: "Adidas", logo: "https://logoeps.com/wp-content/uploads/2012/11/adidas-vector-logo.png" },
    { name: "Puma", logo: "https://logoeps.com/wp-content/uploads/2013/03/puma-vector-logo.png" },
    { name: "New Balance", logo: "https://logoeps.com/wp-content/uploads/2013/12/new-balance-vector-logo.png" },
    { name: "Vans", logo: "https://logoeps.com/wp-content/uploads/2014/09/vans-vector-logo.png" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Enhanced Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl floating-element"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl floating-element" style={{animationDelay: '3s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl floating-element" style={{animationDelay: '1.5s'}}></div>
          </div>

          <div className="container-custom h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            {/* Left Column - Enhanced Text Content */}
            <div className="space-y-8 order-2 lg:order-1 reveal-animation">
              <div className="space-y-4">
                <Badge className="bg-brand/10 text-brand hover:bg-brand/20 text-sm font-medium px-4 py-2">
                  ✨ PREMIUM COLLECTION 2024
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 leading-tight">
                  Step Into
                  <span className="gradient-text block">Excellence</span>
              </h1>
                <p className="text-xl text-neutral-600 max-w-lg leading-relaxed">
                  Discover our handcrafted collection of premium footwear, where comfort meets style and quality defines every step.
              </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-neutral-900 hover:bg-black text-white transition-all duration-300 px-8 py-4 rounded-xl hover-lift">
                  <Link to="/shoes">
                    Explore Collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-brand text-brand hover:bg-brand transition-all duration-300 hover:text-white px-8 py-4 rounded-xl hover-lift">
                  <Link to="/collections">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Story
                  </Link>
                </Button>
              </div>
              
              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-200">
                <div className="text-center lg:text-left">
                  <p className="text-4xl font-bold text-neutral-900 gradient-text">500+</p>
                  <p className="text-neutral-600 text-sm font-medium">Premium Styles</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-4xl font-bold text-neutral-900 gradient-text">25k+</p>
                  <p className="text-neutral-600 text-sm font-medium">Happy Customers</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-4xl font-bold text-neutral-900 gradient-text">50+</p>
                  <p className="text-neutral-600 text-sm font-medium">Global Brands</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Modern Product Showcase */}
            <div className="relative order-1 lg:order-2 reveal-animation" style={{animationDelay: '0.3s'}}>
              <div className="relative z-10 mx-auto max-w-lg lg:max-w-full">
                {/* Main Product Grid */}
                <div className="grid grid-cols-2 gap-4 lg:gap-6">
                  {/* Large Featured Product */}
                  <div className="col-span-2 relative group">
                    <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-100 to-neutral-200">
                      <img 
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1012&q=80"
                        alt="Premium sneakers collection" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                      
                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4 glass-effect px-3 py-2 rounded-full">
                        <span className="text-xs font-semibold text-neutral-800">✨ Best Seller</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Small Product Cards */}
                  <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-brand/10 relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1012&q=80"
                      alt="Casual sneakers" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
                      alt="Running shoes" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>
              
              {/* Floating Statistics Card */}
              <div className="absolute top-8 right-4 lg:right-8 z-20 glass-effect px-4 py-3 rounded-2xl shadow-xl hidden lg:block floating-element">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-neutral-900">4.9/5</p>
                  <p className="text-xs text-neutral-600">12k+ Reviews</p>
                </div>
              </div>

              {/* Floating Product Info Card */}
              <div className="absolute bottom-8 left-4 lg:left-8 z-20 glass-effect px-5 py-4 rounded-2xl shadow-xl hidden lg:block floating-element" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600">New Arrival</p>
                    <p className="font-semibold text-sm text-neutral-900">Ultra Boost 22</p>
                    <p className="text-brand font-bold text-sm">$229.99</p>
                  </div>
                </div>
              </div>

              {/* Price Range Indicator */}
              <div className="absolute top-1/2 -right-4 lg:-right-8 z-20 glass-effect px-3 py-6 rounded-2xl shadow-xl hidden lg:block floating-element" style={{animationDelay: '1.5s'}}>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-bold text-xs">$</span>
                  </div>
                  <p className="text-xs font-semibold text-neutral-900 whitespace-nowrap">From $89</p>
                  <p className="text-xs text-neutral-600">Great Deals</p>
                </div>
              </div>

              {/* Trending Badge */}
              <div className="absolute top-20 left-4 lg:left-8 z-20 glass-effect px-4 py-2 rounded-full shadow-lg hidden lg:block pulse-glow">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-neutral-800">Trending Now</span>
                </div>
              </div>

              {/* Collection Count */}
              <div className="absolute bottom-20 right-4 lg:right-8 z-20 glass-effect px-4 py-3 rounded-xl shadow-lg hidden lg:block floating-element" style={{animationDelay: '0.7s'}}>
                <div className="text-center">
                  <p className="text-lg font-bold text-neutral-900">500+</p>
                  <p className="text-xs text-neutral-600">Styles</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-neutral-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Brand Partners */}
        <section className="py-16 bg-white border-b border-neutral-100">
          <div className="container-custom">
            <p className="text-center text-neutral-500 mb-8 font-medium">Trusted by leading brands worldwide</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
              {brands.map((brand) => (
                <div key={brand.name} className="flex justify-center hover:opacity-100 transition-opacity duration-300">
                  <div className="text-2xl font-bold text-neutral-400 hover:text-neutral-600 transition-colors">
                    {brand.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Enhanced Featured Categories */}
        <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
          <div className="container-custom">
            <div className="text-center mb-16 reveal-animation">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">Shop by Style</h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                Discover our curated collections designed for every lifestyle and occasion
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Men's Category */}
              <div className="group relative rounded-3xl overflow-hidden h-[500px] hover-lift reveal-animation">
                <div className="image-overlay h-full">
                <img 
                  src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2415&q=80" 
                  alt="Men's Shoes" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 z-20">
                  <Badge className="w-fit mb-4 bg-white/20 text-white border-white/30">For Him</Badge>
                  <h3 className="text-white text-3xl font-bold mb-3 text-shadow">Men's Collection</h3>
                  <p className="text-white/90 mb-6 text-shadow">Performance meets style in every step</p>
                  <Button asChild className="w-fit bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl">
                    <Link to="/men">
                      Explore Men's
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Women's Category */}
              <div className="group relative rounded-3xl overflow-hidden h-[500px] hover-lift reveal-animation" style={{animationDelay: '0.2s'}}>
                <div className="image-overlay h-full">
                <img 
                  src="https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80" 
                  alt="Women's Shoes" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 z-20">
                  <Badge className="w-fit mb-4 bg-white/20 text-white border-white/30">For Her</Badge>
                  <h3 className="text-white text-3xl font-bold mb-3 text-shadow">Women's Collection</h3>
                  <p className="text-white/90 mb-6 text-shadow">Elegance and comfort redefined</p>
                  <Button asChild className="w-fit bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl">
                    <Link to="/women">
                      Explore Women's
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* New Arrivals Category */}
              <div className="group relative rounded-3xl overflow-hidden h-[500px] hover-lift reveal-animation" style={{animationDelay: '0.4s'}}>
                <div className="image-overlay h-full">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="New Arrivals" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 z-20">
                  <Badge className="w-fit mb-4 bg-brand text-white pulse-glow">New</Badge>
                  <h3 className="text-white text-3xl font-bold mb-3 text-shadow">New Arrivals</h3>
                  <p className="text-white/90 mb-6 text-shadow">Latest trends, fresh perspectives</p>
                  <Button asChild className="w-fit bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl">
                    <Link to="/collections">
                      See What's New
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Featured Products */}
        <section className="py-24 bg-white">
          <div className="container-custom">
            <div className="flex justify-between items-end mb-16 reveal-animation">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">Featured Products</h2>
                <p className="text-xl text-neutral-600">Handpicked favorites from our premium collection</p>
              </div>
              <Link to="/shoes" className="hidden md:flex items-center text-brand hover:text-brand-dark font-semibold group">
                View All Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredShoes.map((shoe, index) => (
                <div key={shoe.id} className="reveal-animation" style={{animationDelay: `${index * 0.1}s`}}>
                  <ProductCard product={shoe} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 md:hidden">
              <Link to="/shoes" className="inline-flex items-center text-brand hover:text-brand-dark font-semibold group">
                View All Collection
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Enhanced Special Offer Banner */}
        <section className="relative py-24 bg-gradient-to-r from-brand via-brand-dark to-blue-600 text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl floating-element"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl floating-element" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="container-custom text-center relative z-10 reveal-animation">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-6 py-2">
              🔥 Limited Time Offer
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 text-shadow">
              Summer Collection
              <span className="block">Up to 50% Off</span>
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white/90 text-shadow">
              Don't miss out on our biggest sale of the year. Premium styles at unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-brand hover:bg-neutral-100 px-8 py-4 rounded-xl text-lg">
                <Link to="/sale">
                  Shop Sale Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 text-lg border-white text-brand hover:bg-white hover:text-brand px-8 py-4 rounded-xl">
                <Link to="/collections">
                  Browse Collection
                  <ArrowRight className="ml-2 h-5 w-5 " />
                </Link>
            </Button>
            </div>
          </div>
        </section>
        
        {/* Enhanced Benefits Section */}
        <section className="py-24 bg-neutral-50">
          <div className="container-custom">
            <div className="text-center mb-16 reveal-animation">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">Why Choose SoleVenture?</h2>
              <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                We're committed to providing you with the best shopping experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card text-center reveal-animation">
                <div className="bg-brand/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Truck className="w-10 h-10 text-brand" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neutral-900">Free Shipping</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Complimentary shipping on all orders over $99. International delivery available to 50+ countries.
                </p>
              </div>
              
              <div className="feature-card text-center reveal-animation" style={{animationDelay: '0.2s'}}>
                <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neutral-900">Easy Returns</h3>
                <p className="text-neutral-600 leading-relaxed">
                  60-day return policy with free return shipping. Exchange or return any item, hassle-free.
                </p>
              </div>
              
              <div className="feature-card text-center reveal-animation" style={{animationDelay: '0.4s'}}>
                <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-neutral-900">Secure Payment</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Bank-level security with multiple payment options. Your data is always protected.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Enhanced Testimonials Carousel */}
        <section className="py-24 bg-neutral-900 text-white overflow-hidden">
          <div className="container-custom">
            <div className="text-center mb-16 reveal-animation">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">What Our Customers Say</h2>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust SoleVenture
              </p>
            </div>
            
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-neutral-800 rounded-3xl p-8 md:p-12 reveal-animation">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-brand"
                    />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-lg md:text-xl text-neutral-200 mb-6 leading-relaxed">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <p className="font-bold text-white text-lg">
                      {testimonials[currentTestimonial].name}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex justify-center items-center mt-8 gap-4">
                <button 
                  onClick={() => setCurrentTestimonial((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)}
                  className="p-2 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial ? 'bg-brand' : 'bg-neutral-600'
                      }`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="p-2 rounded-full bg-neutral-700 hover:bg-neutral-600 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 bg-gradient-to-br from-brand/5 to-blue-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center reveal-animation">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-neutral-900">
                Stay in the Loop
              </h2>
              <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
                Be the first to know about new arrivals, exclusive offers, and style tips from our experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-grow px-6 py-2 rounded-xl border border-neutral-200 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/20"
                />
                <Button size="lg" className="bg-brand hover:bg-brand-dark text-white px-5 text-sm  rounded-xl transition-all duration-300">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-neutral-500 mt-4">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
