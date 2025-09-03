
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Palette } from 'lucide-react';

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
  // Color mapping for visual swatches
  const getColorStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      'Black': '',
      'White': '',
      'Brown': '',
      'Blue': '',
      'Red': '',
      'Green': '',
      'Gray': '',
      'Navy': '',
      'Beige': '',
      'Pink': '',
      'Purple': '',
      'Yellow': '',
      'Orange': '',
    };
    return colorMap[color] || '';
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="h-4 w-4 text-neutral-600" />
        <h3 className="font-semibold text-neutral-900">Colors</h3>
      </div>
      <div className="space-y-3">
        {colors.map((color) => (
          <div key={color} className="flex items-center space-x-3 group">
            <Checkbox
              id={`color-${color}`}
              checked={selectedColors.includes(color)}
              onCheckedChange={() => toggleColor(color)}
              className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
            />
            <div className="flex items-center space-x-2 flex-1">

              <Label 
                htmlFor={`color-${color}`} 
                className="cursor-pointer text-sm text-neutral-700 group-hover:text-neutral-900 transition-colors"
              >
                {color}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter;
