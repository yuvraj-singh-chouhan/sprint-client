
import { useState, useEffect } from 'react';
import { Shoe } from '@/data/shoes';
import { PriceRange } from '@/components/category/PriceRangeFilter';

export const useCategoryFilters = (
  allShoes: Shoe[],
  initialCategory?: string
) => {
  const [filteredShoes, setFilteredShoes] = useState<Shoe[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  
  // Get all unique colors from shoes
  const allColors = Array.from(new Set(allShoes.flatMap(shoe => shoe.colors)));
  
  // Get price ranges
  const priceRanges: PriceRange[] = [
    { label: 'Under $75', value: 'under-75' },
    { label: '$75 - $125', value: '75-125' },
    { label: '$125 - $175', value: '125-175' },
    { label: 'Over $175', value: 'over-175' },
  ];
  
  const togglePriceRange = (value: string) => {
    setPriceRange(prev => 
      prev.includes(value) 
        ? prev.filter(p => p !== value) 
        : [...prev, value]
    );
  };
  
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };
  
  const resetFilters = () => {
    setPriceRange([]);
    setSelectedColors([]);
  };
  
  // Filter and sort the shoes
  useEffect(() => {
    let result = [...allShoes];
    
    // Filter by category if specified
    if (initialCategory && initialCategory !== 'shoes') {
      result = result.filter(shoe => shoe.category === initialCategory);
    }
    
    // Filter by price range
    if (priceRange.length > 0) {
      result = result.filter(shoe => {
        const price = shoe.price;
        return priceRange.some(range => {
          if (range === 'under-75') return price < 75;
          if (range === '75-125') return price >= 75 && price < 125;
          if (range === '125-175') return price >= 125 && price < 175;
          if (range === 'over-175') return price >= 175;
          return true;
        });
      });
    }
    
    // Filter by colors
    if (selectedColors.length > 0) {
      result = result.filter(shoe => 
        shoe.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Sort the results
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.filter(shoe => shoe.isNew).concat(
          result.filter(shoe => !shoe.isNew)
        );
        break;
      default: // 'featured' or anything else
        // No specific sorting applied
        break;
    }
    
    setFilteredShoes(result);
  }, [initialCategory, sortOption, priceRange, selectedColors, allShoes]);

  return {
    filteredShoes,
    sortOption,
    setSortOption,
    priceRange,
    selectedColors,
    allColors,
    priceRanges,
    togglePriceRange,
    toggleColor,
    resetFilters
  };
};
