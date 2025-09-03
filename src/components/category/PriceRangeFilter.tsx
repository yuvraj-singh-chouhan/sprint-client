
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';

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
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <DollarSign className="h-4 w-4 text-neutral-600" />
        <h3 className="font-semibold text-neutral-900">Price Range</h3>
      </div>
      <div className="space-y-3">
        {priceRanges.map((range) => (
          <div key={range.value} className="flex items-center space-x-3 group">
            <Checkbox
              id={`price-${range.value}`}
              checked={selectedPriceRanges.includes(range.value)}
              onCheckedChange={() => togglePriceRange(range.value)}
              className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
            />
            <Label
              htmlFor={`price-${range.value}`}
              className="cursor-pointer text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors flex-1"
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
