import React from 'react';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import { Shoe } from '@/data/shoes';

interface ProductGridProps {
  products: Shoe[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  className?: string;
  animateItems?: boolean;
  animationDelay?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = { sm: 2, lg: 3, xl: 4 },
  gap = 'gap-6',
  className,
  animateItems = true,
  animationDelay = 0.1
}) => {
  const getGridClasses = () => {
    const classes = ['grid', 'grid-cols-1'];
    
    if (columns.sm) classes.push(`sm:grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    
    classes.push(gap);
    
    return classes.join(' ');
  };

  return (
    <div className={cn(getGridClasses(), className)}>
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className={animateItems ? 'reveal-animation' : ''}
          style={animateItems ? { animationDelay: `${index * animationDelay}s` } : {}}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid; 