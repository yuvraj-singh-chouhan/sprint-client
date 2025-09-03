
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { EmptyState } from '@/components/common';
import { Shoe } from '@/data/shoes';

interface ProductGridProps {
  products: Shoe[];
  resetFilters: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, resetFilters }) => {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={Tag}
        title="No products found"
        description="Try adjusting your filters or search criteria to find what you're looking for."
        actions={[
          {
            label: 'Reset Filters',
            onClick: resetFilters,
            variant: 'default'
          },
          {
            label: 'View All Products',
            onClick: () => window.location.href = '/shoes',
            variant: 'outline'
          }
        ]}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className="reveal-animation" 
          style={{animationDelay: `${index * 0.05}s`}}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
