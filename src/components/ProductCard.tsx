
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Shoe } from '@/data/shoes';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Shoe;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, originalPrice, images, isNew, onSale, sizes } = product;
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(id);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add the product with default size
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0], // Use the first available size
      quantity: 1
    });
    
    toast({
      title: "Added to cart",
      description: `${name} (Size ${sizes[0]}) added to your cart.`,
    });
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(id, name);
    } else {
      addToWishlist(id, name);
    }
  };

  const discountPercentage = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  return (
    <div 
      className="group h-full flex flex-col bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover-lift transition-all duration-500 hover:shadow-xl hover:border-brand/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="block relative overflow-hidden">
        <div className="aspect-square overflow-hidden rounded-t-2xl relative">
          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 loading-shimmer"></div>
          )}
          
          <img 
            src={images[0]} 
            alt={name} 
            className={`w-full h-full object-cover object-center transition-all duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Hover overlay */}
          <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>

          {/* Image 2 on hover */}
          {images[1] && (
            <img 
              src={images[1]} 
              alt={`${name} alternate view`} 
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {isNew && (
            <Badge className="bg-brand text-white shadow-lg px-3 py-1 text-xs font-semibold">
              NEW
            </Badge>
          )}
          {onSale && originalPrice && (
            <Badge className="bg-red-500 text-white shadow-lg px-3 py-1 text-xs font-semibold">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          {/* Wishlist button */}
          <button 
            onClick={handleWishlist} 
            className={`p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg ${
              inWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-neutral-600 hover:bg-red-50 hover:text-red-500'
            } ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'}`}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? 'fill-white' : ''} transition-transform hover:scale-110`} />
          </button>

          {/* Quick view button */}
          <Link
            to={`/product/${id}`}
            className={`p-2.5 rounded-full bg-white/90 text-neutral-600 hover:bg-brand hover:text-white backdrop-blur-sm transition-all duration-300 shadow-lg ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
            style={{ transitionDelay: '50ms' }}
          >
            <Eye className="h-4 w-4 transition-transform hover:scale-110" />
          </Link>
        </div>

        {/* Quick add button */}
        <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <Button 
            onClick={handleQuickAdd}
            size="sm"
            className="bg-neutral-900 hover:bg-black text-white px-6 py-2 rounded-full shadow-lg transition-all duration-300 backdrop-blur-sm hover-lift"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        {/* Rating stars */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-current" />
            ))}
          </div>
          <span className="text-xs text-neutral-500 ml-2">(4.9)</span>
        </div>

        <Link to={`/product/${id}`} className="block group/link">
          <h3 className="font-semibold text-lg mb-2 transition-colors group-hover/link:text-brand line-clamp-2 text-neutral-900">
            {name}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="font-bold text-xl text-neutral-900">
                ${price.toFixed(2)}
              </span>
              
              {originalPrice && (
                <span className="ml-2 text-neutral-500 line-through text-sm">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {originalPrice && (
              <div className="text-right">
                <span className="text-xs text-neutral-500">Save</span>
                <div className="text-sm font-semibold text-green-600">
                  ${(originalPrice - price).toFixed(2)}
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Color options */}
        <div className="mb-4">
          <p className="text-xs text-neutral-500 mb-2">Colors:</p>
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-5 h-5 rounded-full border-2 border-neutral-200 hover:border-brand transition-colors cursor-pointer"
                style={{
                  backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                 color.toLowerCase() === 'black' ? '#000000' :
                                 color.toLowerCase() === 'red' ? '#ef4444' :
                                 color.toLowerCase() === 'blue' ? '#3b82f6' :
                                 color.toLowerCase() === 'brown' ? '#a16207' :
                                 color.toLowerCase() === 'tan' ? '#d2b48c' :
                                 '#64748b'
                }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-5 h-5 rounded-full border-2 border-neutral-200 bg-neutral-100 flex items-center justify-center">
                <span className="text-xs text-neutral-600">+{product.colors.length - 4}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-auto">
          <Button 
            onClick={handleQuickAdd}
            className="w-full bg-neutral-800 hover:bg-black text-white rounded-xl py-3 transition-all duration-300"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
