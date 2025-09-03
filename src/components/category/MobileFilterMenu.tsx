
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Filter, Settings2 } from 'lucide-react';
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
  const totalActiveFilters = priceRange.length + selectedColors.length;
  const hasActiveFilters = totalActiveFilters > 0;

  const handleApplyFilters = () => {
    closeFilterMenu();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
        onClick={closeFilterMenu}
      />
      
      {/* Filter Panel */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-white">
            <div className="flex items-center space-x-3">
              <Settings2 className="h-5 w-5 text-neutral-600" />
              <h2 className="text-lg font-bold text-neutral-900">Filters</h2>
              {totalActiveFilters > 0 && (
                <Badge className="bg-brand text-white text-xs">
                  {totalActiveFilters}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeFilterMenu}
              className="h-8 w-8 p-0 hover:bg-neutral-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-neutral-700">Active Filters</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-xs text-neutral-600 hover:text-red-600 h-auto p-1"
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {priceRange.map((range) => (
                      <Badge key={range} variant="secondary" className="text-xs bg-brand/10 text-brand">
                        {priceRanges.find(pr => pr.value === range)?.label}
                      </Badge>
                    ))}
                    {selectedColors.map((color) => (
                      <Badge key={color} variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="bg-white">
                <PriceRangeFilter
                  priceRanges={priceRanges}
                  selectedPriceRanges={priceRange}
                  togglePriceRange={togglePriceRange}
                />
              </div>

              <Separator className="bg-neutral-200" />

              {/* Color Filter */}
              <div className="bg-white">
                <ColorFilter
                  colors={allColors}
                  selectedColors={selectedColors}
                  toggleColor={toggleColor}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-neutral-200 bg-white">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex-1 border-2 hover:bg-neutral-50"
                disabled={!hasActiveFilters}
              >
                Reset
              </Button>
              <Button
                onClick={handleApplyFilters}
                className="flex-1 bg-brand hover:bg-brand-dark text-white"
              >
                Apply Filters
                {totalActiveFilters > 0 && (
                  <Badge className="ml-2 bg-white/20 text-white text-xs">
                    {totalActiveFilters}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFilterMenu;
