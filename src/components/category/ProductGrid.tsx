
import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Shoe } from '@/data/shoes';

interface ProductGridProps {
  products: Shoe[];
  resetFilters: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, resetFilters }) => {
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
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
