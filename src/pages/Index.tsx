
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { shoes, getNewArrivals, getSaleItems } from '@/data/shoes';

const Index = () => {
  const newArrivals = getNewArrivals().slice(0, 4);
  const saleItems = getSaleItems().slice(0, 4);
  const featuredShoes = shoes.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Professional Hero Section */}
        <section className="relative h-[90vh] bg-neutral-50 overflow-hidden">
          <div className="container-custom h-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Text Content */}
            <div className="z-10 max-w-xl pt-16 lg:pt-0 order-2 lg:order-1 animate-fade-in">
              <h5 className="text-brand font-medium tracking-wide mb-2">PREMIUM QUALITY</h5>
              <h1 className="text-neutral-900 font-bold mb-6 leading-tight">
                Discover Exceptional <br/><span className="text-brand">Footwear</span> Collection
              </h1>
              <p className="text-neutral-600 text-lg mb-8 max-w-md">
                Elevate your style with our curated selection of premium shoes, handcrafted for comfort and designed for distinction.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-neutral-900 hover:bg-black text-white px-8">
                  <Link to="/shoes">Explore Collection</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-neutral-300 text-neutral-800 hover:bg-neutral-100 px-8">
                  <Link to="/collections">New Season</Link>
                </Button>
              </div>
              
              {/* Featured Stats */}
              <div className="grid grid-cols-3 gap-4 mt-12 border-t border-neutral-200 pt-8">
                <div>
                  <p className="text-3xl font-bold text-neutral-900">350+</p>
                  <p className="text-neutral-600 text-sm">Premium Models</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-neutral-900">15k+</p>
                  <p className="text-neutral-600 text-sm">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-neutral-900">25+</p>
                  <p className="text-neutral-600 text-sm">Brand Partners</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative z-10 mx-auto max-w-md lg:max-w-full">
                <img 
                  src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80"
                  alt="Premium footwear" 
                  className="w-full h-auto object-cover shadow-2xl rounded-lg"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand/10 rounded-full -z-10 blur-3xl"></div>
              <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-brand/20 rounded-full -z-10 blur-2xl"></div>
              
              {/* Featured product label */}
              <div className="absolute bottom-8 right-8 z-20 bg-white px-6 py-4 rounded-lg shadow-lg hidden lg:block">
                <p className="text-neutral-500 text-sm">Featured Product</p>
                <p className="font-medium text-neutral-900">Premium Leather Oxford</p>
                <p className="text-brand font-bold">$189.99</p>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-100 -z-20"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-neutral-50 to-transparent -z-10"></div>
        </section>
        
        {/* Featured Categories */}
        <section className="py-20 bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">Shop By Category</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Men's Category */}
              <div className="relative rounded-lg overflow-hidden h-[400px] group">
                <img 
                  src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2415&q=80" 
                  alt="Men's Shoes" 
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Men's Collection</h3>
                  <p className="text-neutral-200 mb-4">Discover style and comfort for every occasion</p>
                  <Button asChild className="w-fit bg-white text-neutral-900 hover:bg-neutral-200">
                    <Link to="/men">Shop Men</Link>
                  </Button>
                </div>
              </div>
              
              {/* Women's Category */}
              <div className="relative rounded-lg overflow-hidden h-[400px] group">
                <img 
                  src="https://images.unsplash.com/photo-1581101767113-1677fc2beaa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80" 
                  alt="Women's Shoes" 
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">Women's Collection</h3>
                  <p className="text-neutral-200 mb-4">Elegance and comfort in every step</p>
                  <Button asChild className="w-fit bg-white text-neutral-900 hover:bg-neutral-200">
                    <Link to="/women">Shop Women</Link>
                  </Button>
                </div>
              </div>
              
              {/* New Arrivals Category */}
              <div className="relative rounded-lg overflow-hidden h-[400px] group">
                <img 
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="New Arrivals" 
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-white text-2xl font-bold mb-2">New Arrivals</h3>
                  <p className="text-neutral-200 mb-4">The latest styles fresh off the shelves</p>
                  <Button asChild className="w-fit bg-white text-neutral-900 hover:bg-neutral-200">
                    <Link to="/collections">See New</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="py-20">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <Link to="/shoes" className="flex items-center text-brand hover:text-brand-dark">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredShoes.map(shoe => (
                <ProductCard key={shoe.id} product={shoe} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Special Offer Banner */}
        <section className="py-16 bg-brand text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Special Summer Sale</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Enjoy up to 40% off on selected styles. Limited time only.
            </p>
            <Button asChild size="lg" className="bg-white text-brand hover:bg-neutral-100">
              <Link to="/sale">Shop the Sale</Link>
            </Button>
          </div>
        </section>
        
        {/* New Arrivals */}
        <section className="py-20 bg-neutral-50">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">New Arrivals</h2>
              <Link to="/collections" className="flex items-center text-brand hover:text-brand-dark">
                View All <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {newArrivals.map(shoe => (
                <ProductCard key={shoe.id} product={shoe} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
                <p className="text-neutral-600">
                  On all orders over $99. International shipping available.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
                <p className="text-neutral-600">
                  30-day return policy. Hassle-free returns and exchanges.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-neutral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-brand">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
                <p className="text-neutral-600">
                  Multiple secure payment options and data encryption.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20 bg-neutral-900 text-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-neutral-800 p-6 rounded-lg">
                <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="mb-4">
                  "Absolutely love my new running shoes! They're so comfortable and supportive - perfect for my marathon training. Fast shipping too!"
                </p>
                <div className="font-bold">Sarah M.</div>
              </div>
              
              <div className="bg-neutral-800 p-6 rounded-lg">
                <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="mb-4">
                  "The leather loafers I purchased are incredible. The quality is outstanding and they look even better in person. Will definitely shop here again."
                </p>
                <div className="font-bold">James T.</div>
              </div>
              
              <div className="bg-neutral-800 p-6 rounded-lg">
                <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="mb-4">
                  "Customer service was exceptional when I needed to exchange a pair for a different size. The process was quick and hassle-free. Plus, the shoes are amazing!"
                </p>
                <div className="font-bold">Emma R.</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
