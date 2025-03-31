
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Shoe } from '@/data/shoes';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { toast } from "@/components/ui/use-toast";

interface ProductCardProps {
  product: Shoe;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, originalPrice, images, isNew, onSale, sizes } = product;
  const { addItem } = useCart();
  
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
  
  return (
    <div className="group h-full flex flex-col bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${id}`} className="block relative overflow-hidden">
        <div className="aspect-square overflow-hidden">
          <img 
            src={images[0]} 
            alt={name} 
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
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
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${id}`} className="block">
          <h3 className="font-medium text-lg mb-1 transition-colors group-hover:text-brand line-clamp-1">
            {name}
          </h3>
          
          <div className="flex items-center mb-3">
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
        
        <div className="mt-auto pt-2">
          <Button 
            onClick={handleQuickAdd}
            className="w-full bg-neutral-800 hover:bg-black text-white flex items-center justify-center gap-2"
            size="sm"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
