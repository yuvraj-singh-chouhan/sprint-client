
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import PriceRangeFilter, { PriceRange } from './PriceRangeFilter';
import ColorFilter from './ColorFilter';

interface MobileFilterMenuProps {
  isOpen: boolean;
  priceRanges: PriceRange[];
  allColors: string[];
  priceRange: string[];
  selectedColors: string[];
  togglePriceRange: (value: string) => void;
  toggleColor: (color: string) => void;
  resetFilters: () => void;
  closeFilterMenu: () => void;
}

const MobileFilterMenu: React.FC<MobileFilterMenuProps> = ({
  isOpen,
  priceRanges,
  allColors,
  priceRange,
  selectedColors,
  togglePriceRange,
  toggleColor,
  resetFilters,
  closeFilterMenu,
}) => {
  if (!isOpen) return null;

  const showResetButton = priceRange.length > 0 || selectedColors.length > 0;

  return (
    <div className="fixed inset-0 bg-neutral-900/50 z-50 lg:hidden overflow-hidden">
      <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform animate-slide-left p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Filters</h2>
          <Button variant="ghost" size="icon" onClick={closeFilterMenu}>
            <X size={20} />
          </Button>
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

        <div className="flex space-x-2 pt-4">
          {showResetButton && (
            <Button variant="outline" className="flex-1" onClick={resetFilters}>
              Reset Filters
            </Button>
          )}
          <Button
            className="flex-1 bg-brand hover:bg-brand-dark text-white"
            onClick={closeFilterMenu}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterMenu;
