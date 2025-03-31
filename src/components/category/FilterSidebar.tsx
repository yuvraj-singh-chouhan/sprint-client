
import React from 'react';
import { Button } from '@/components/ui/button';
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
  const showResetButton = priceRange.length > 0 || selectedColors.length > 0;
  
  return (
    <div className="hidden lg:block">
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Filters</h2>
          {showResetButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-neutral-600 hover:text-brand"
            >
              Reset
            </Button>
          )}
        </div>

        <PriceRangeFilter
          priceRanges={priceRanges}
          selectedPriceRanges={priceRange}
          togglePriceRange={togglePriceRange}
        />

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
