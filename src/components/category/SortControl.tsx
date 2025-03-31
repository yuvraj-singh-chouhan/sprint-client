
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SortControlProps {
  sortOption: string;
  onSortChange: (value: string) => void;
}

const SortControl: React.FC<SortControlProps> = ({ sortOption, onSortChange }) => {
  return (
    <div className="flex items-center ml-auto">
      <span className="text-sm text-neutral-600 mr-2 hidden sm:inline">Sort by:</span>
      <Select value={sortOption} onValueChange={onSortChange}>
        <SelectTrigger className="w-[160px] h-9">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-low-high">Price: Low to High</SelectItem>
          <SelectItem value="price-high-low">Price: High to Low</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortControl;
