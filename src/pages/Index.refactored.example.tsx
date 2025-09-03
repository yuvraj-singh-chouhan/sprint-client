import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, RefreshCw, Shield, Play, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import the new common components
import {
  PageLayout,
  SectionHeader,
  FeatureCard,
  ProductGrid,
  FloatingStatsBadge,
  FloatingProductBadge,
  FloatingCountBadge
} from '@/components/common';

import ProductCard from '@/components/ProductCard';
import { shoes, getNewArrivals, getSaleItems } from '@/data/shoes';

const IndexRefactored = () => {
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

  const brands = [
    { name: "Nike" },
    { name: "Adidas" },
    { name: "Puma" },
    { name: "Reebok" },
    { name: "Converse" }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <PageLayout>
      {/* Hero Section - Using floating components */}
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
              <Button asChild size="lg" className="bg-neutral-900 hover:bg-black text-white px-8 py-4 rounded-xl hover-lift">
                <Link to="/shoes">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-brand text-brand hover:bg-brand hover:text-white px-8 py-4 rounded-xl hover-lift">
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
          
          {/* Right Column - Modern Product Showcase with Floating Elements */}
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
            
            {/* Using the new Floating Badge components */}
            <FloatingStatsBadge
              rating={5}
              reviews="12k+ Reviews"
              position={{ top: '8', right: '4' }}
            />

            <FloatingProductBadge
              label="New Arrival"
              title="Ultra Boost 22"
              price="$229.99"
              icon={ShoppingCart}
              position={{ bottom: '8', left: '4' }}
              animationDelay="1s"
            />

            <FloatingCountBadge
              count="500+"
              label="Styles"
              position={{ bottom: '20', right: '4' }}
              animationDelay="0.7s"
            />
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
      
      {/* Enhanced Featured Categories - Using SectionHeader component */}
      <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
        <div className="container-custom">
          <SectionHeader
            title="Shop by Style"
            description="Discover our curated collections designed for every lifestyle and occasion"
          />
          
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
                <p className="text-white/90 mb-6 text-shadow">Elegance and comfort combined</p>
                <Button asChild className="w-fit bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl">
                  <Link to="/women">
                    Explore Women's
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Kids Category */}
            <div className="group relative rounded-3xl overflow-hidden h-[500px] hover-lift reveal-animation" style={{animationDelay: '0.4s'}}>
              <div className="image-overlay h-full">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="Kids Shoes" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 z-20">
                <Badge className="w-fit mb-4 bg-white/20 text-white border-white/30 pulse-glow">New</Badge>
                <h3 className="text-white text-3xl font-bold mb-3 text-shadow">Kids Collection</h3>
                <p className="text-white/90 mb-6 text-shadow">Growing feet, growing dreams</p>
                <Button asChild className="w-fit bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl">
                  <Link to="/collections">
                    Explore Kids
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Enhanced Featured Products - Using SectionHeader and ProductGrid components */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <SectionHeader
            title="Featured Products"
            description="Handpicked favorites from our premium collection"
          />
          
          <ProductGrid
            products={featuredShoes}
            columns={{ sm: 2, lg: 4 }}
            animateItems={true}
          />
          
          <div className="text-center mt-12 reveal-animation">
            <Button asChild size="lg" variant="outline" className="hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 hover-lift">
              <Link to="/shoes">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Enhanced Benefits Section - Using FeatureCard components */}
      <section className="py-24 bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            title="Why Choose SoleVenture?"
            description="We're committed to providing you with the best shopping experience"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Truck}
              title="Free Shipping"
              description="Complimentary shipping on all orders over $99. International delivery available to 50+ countries."
              iconBgColor="bg-brand/10"
              iconColor="text-brand"
            />
            
            <FeatureCard
              icon={RefreshCw}
              title="Easy Returns"
              description="60-day return policy with free return shipping. Exchange or return any item, hassle-free."
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
              animationDelay="0.2s"
            />
            
            <FeatureCard
              icon={Shield}
              title="Secure Payment"
              description="Bank-level security with multiple payment options. Your data is always protected."
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
              animationDelay="0.4s"
            />
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same... */}
    </PageLayout>
  );
};

export default IndexRefactored; 