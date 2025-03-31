
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Shoe } from '@/data/shoes';

interface ProductCardProps {
  product: Shoe;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, originalPrice, images, isNew, onSale } = product;
  
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="overflow-hidden rounded-lg bg-gray-100 mb-3 aspect-square relative">
        <img 
          src={images[0]} 
          alt={name} 
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Sale or New tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-brand hover:bg-brand-dark text-white">
              New
            </Badge>
          )}
          {onSale && originalPrice && (
            <Badge className="bg-red-500 hover:bg-red-600 text-white">
              Sale
            </Badge>
          )}
        </div>
      </div>
      
      <h3 className="font-medium text-lg mb-1 transition-colors group-hover:text-brand">
        {name}
      </h3>
      
      <div className="flex items-center">
        <span className="font-semibold text-neutral-900">
          ${price.toFixed(2)}
        </span>
        
        {originalPrice && (
          <span className="ml-2 text-neutral-500 line-through text-sm">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
