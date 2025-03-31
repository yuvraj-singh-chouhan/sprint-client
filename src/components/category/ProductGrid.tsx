
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Shoe } from '@/data/shoes';
import { useCart } from '@/hooks/use-cart';
import { toast } from "@/components/ui/use-toast";

interface ProductGridProps {
  products: Shoe[];
  resetFilters: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, resetFilters }) => {
  const { addItem } = useCart();

  const handleQuickAdd = (product: Shoe, e: React.MouseEvent) => {
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
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-neutral-50 rounded-lg">
        <h2 className="text-xl font-medium mb-2">No products found</h2>
        <p className="text-neutral-600 mb-6">
          Try adjusting your filters to find what you're looking for.
        </p>
        <Button onClick={resetFilters}>Reset Filters</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="relative group">
          <ProductCard product={product} />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              className="w-full bg-white text-black hover:bg-neutral-100"
              onClick={(e) => handleQuickAdd(product, e)}
            >
              Quick Add
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
