
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export interface PriceRange {
  label: string;
  value: string;
}

interface PriceRangeFilterProps {
  priceRanges: PriceRange[];
  selectedPriceRanges: string[];
  togglePriceRange: (value: string) => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  priceRanges,
  selectedPriceRanges,
  togglePriceRange,
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3">Price Range</h3>
      <div className="space-y-2">
        {priceRanges.map((range) => (
          <div key={range.value} className="flex items-center space-x-2">
            <Checkbox
              id={`price-${range.value}`}
              checked={selectedPriceRanges.includes(range.value)}
              onCheckedChange={() => togglePriceRange(range.value)}
            />
            <Label
              htmlFor={`price-${range.value}`}
              className="cursor-pointer"
            >
              {range.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceRangeFilter;
