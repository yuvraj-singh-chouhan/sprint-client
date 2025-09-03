
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PriceRangeFilter, { PriceRange } from './PriceRangeFilter';
import ColorFilter from './ColorFilter';

interface FilterSidebarProps {
  priceRanges: PriceRange[];
  allColors: string[];
  priceRange: string[];
  selectedColors: string[];
  togglePriceRange: (value: string) => void;
  toggleColor: (color: string) => void;
  resetFilters: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  priceRanges,
  allColors,
  priceRange,
  selectedColors,
  togglePriceRange,
  toggleColor,
  resetFilters,
}) => {
  return (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div>
        <PriceRangeFilter
          priceRanges={priceRanges}
          selectedPriceRanges={priceRange}
          togglePriceRange={togglePriceRange}
        />
      </div>

      <Separator className="bg-neutral-200" />

      {/* Color Filter */}
      <div>
        <ColorFilter
          colors={allColors}
          selectedColors={selectedColors}
          toggleColor={toggleColor}
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
