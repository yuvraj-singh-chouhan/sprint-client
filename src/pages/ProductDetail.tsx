
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, RotateCcw, Shield, Minus, Plus, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getShoeById } from '@/data/shoes';
import { useCart } from '@/hooks/use-cart';
import ProductCard from '@/components/ProductCard';
import { shoes } from '@/data/shoes';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = getShoeById(id || '');
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  const similarProducts = shoes
    .filter(shoe => 
      shoe.id !== id && 
      (shoe.category === product?.category || 
       shoe.tags.some(tag => product?.tags.includes(tag)))
    )
    .slice(0, 4);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-8 text-neutral-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/shoes')}>
            Return to Shop
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      // Show error if no size is selected
      alert('Please select a size');
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-6">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-neutral-500 hover:text-brand transition"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-24 h-24 rounded border-2 ${
                        selectedImage === idx ? 'border-brand' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} view ${idx + 1}`} 
                        className="w-full h-full object-cover object-center rounded"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <div className="flex flex-col space-y-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-neutral-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                
                <p className="text-neutral-600">
                  {product.description}
                </p>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-2 border rounded-md min-w-[3rem] ${
                          selectedSize === size 
                            ? 'border-brand bg-brand text-white' 
                            : 'border-neutral-300 hover:border-brand'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="font-medium mb-2">Available Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map(color => (
                      <div 
                        key={color} 
                        className="px-3 py-1 border border-neutral-300 rounded-md"
                      >
                        {color}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-l-md"
                    >
                      <Minus size={16} />
                    </button>
                    <div className="w-14 h-10 flex items-center justify-center border-t border-b border-neutral-300">
                      {quantity}
                    </div>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-r-md"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-brand hover:bg-brand-dark text-white"
                    size="lg"
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="w-12 h-12"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Product Details */}
                <div className="pt-8">
                  <h3 className="font-medium mb-2">Product Details</h3>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
                
                <Separator className="my-6" />
                
                {/* Shipping Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-start">
                    <Truck className="h-5 w-5 mr-2 text-brand" />
                    <div>
                      <h4 className="font-medium">Free Shipping</h4>
                      <p className="text-sm text-neutral-500">On orders over $99</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <RotateCcw className="h-5 w-5 mr-2 text-brand" />
                    <div>
                      <h4 className="font-medium">Easy Returns</h4>
                      <p className="text-sm text-neutral-500">30-day return policy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 mr-2 text-brand" />
                    <div>
                      <h4 className="font-medium">Secure Checkout</h4>
                      <p className="text-sm text-neutral-500">Safe & Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar Products */}
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {similarProducts.map(shoe => (
                <ProductCard key={shoe.id} product={shoe} />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
