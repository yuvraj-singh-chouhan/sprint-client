
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ColorFilterProps {
  colors: string[];
  selectedColors: string[];
  toggleColor: (color: string) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  colors,
  selectedColors,
  toggleColor,
}) => {
  return (
    <div>
      <h3 className="font-medium mb-3">Colors</h3>
      <div className="space-y-2">
        {colors.map((color) => (
          <div key={color} className="flex items-center space-x-2">
            <Checkbox
              id={`color-${color}`}
              checked={selectedColors.includes(color)}
              onCheckedChange={() => toggleColor(color)}
            />
            <Label htmlFor={`color-${color}`} className="cursor-pointer">
              {color}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
