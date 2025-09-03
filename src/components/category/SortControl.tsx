
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown } from 'lucide-react';

interface SortControlProps {
  sortOption: string;
  onSortChange: (value: string) => void;
}

const SortControl: React.FC<SortControlProps> = ({ sortOption, onSortChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <ArrowUpDown className="h-4 w-4 text-neutral-500 hidden sm:block" />
      <span className="text-sm text-neutral-600 hidden sm:inline font-medium">Sort by:</span>
      <Select value={sortOption} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px] h-10 border-2 border-neutral-200 hover:border-neutral-300 focus:border-brand transition-colors outline-0">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured" className="cursor-pointer">
            <div className="flex items-center space-x-2">
              <span>✨</span>
              <span>Featured</span>
            </div>
          </SelectItem>
          <SelectItem value="price-low-high" className="cursor-pointer">
            <div className="flex items-center space-x-2">
              <span>💲</span>
              <span>Price: Low to High</span>
            </div>
          </SelectItem>
          <SelectItem value="price-high-low" className="cursor-pointer">
            <div className="flex items-center space-x-2">
              <span>💰</span>
              <span>Price: High to Low</span>
            </div>
          </SelectItem>
          <SelectItem value="newest" className="cursor-pointer">
            <div className="flex items-center space-x-2">
              <span>🆕</span>
              <span>Newest First</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortControl;
