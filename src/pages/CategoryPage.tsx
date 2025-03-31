
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { shoes } from '@/data/shoes';
import { Shoe } from '@/data/shoes';
import { ChevronDown, Filter, SlidersHorizontal, X } from 'lucide-react';

interface CategoryPageProps {
  params?: {
    category: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = ({ params: propParams }) => {
  const urlParams = useParams<{ category?: string }>();
  const location = useLocation();
  
  // Use category from props if provided, otherwise from URL params
  const category = propParams?.category || urlParams.category;
  
  const [filteredShoes, setFilteredShoes] = useState<Shoe[]>([]);
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  // Get all unique colors from shoes
  const allColors = Array.from(new Set(shoes.flatMap(shoe => shoe.colors)));
  
  // Get price ranges
  const priceRanges = [
    { label: 'Under $75', value: 'under-75' },
    { label: '$75 - $125', value: '75-125' },
    { label: '$125 - $175', value: '125-175' },
    { label: 'Over $175', value: 'over-175' },
  ];
  
  const togglePriceRange = (value: string) => {
    setPriceRange(prev => 
      prev.includes(value) 
        ? prev.filter(p => p !== value) 
        : [...prev, value]
    );
  };
  
  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };
  
  const resetFilters = () => {
    setPriceRange([]);
    setSelectedColors([]);
  };
  
  // Filter and sort the shoes
  useEffect(() => {
    let result = [...shoes];
    
    // Filter by category if specified
    if (category && category !== 'shoes') {
      result = result.filter(shoe => shoe.category === category);
    }
    
    // Filter by price range
    if (priceRange.length > 0) {
      result = result.filter(shoe => {
        const price = shoe.price;
        return priceRange.some(range => {
          if (range === 'under-75') return price < 75;
          if (range === '75-125') return price >= 75 && price < 125;
          if (range === '125-175') return price >= 125 && price < 175;
          if (range === 'over-175') return price >= 175;
          return true;
        });
      });
    }
    
    // Filter by colors
    if (selectedColors.length > 0) {
      result = result.filter(shoe => 
        shoe.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Sort the results
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.filter(shoe => shoe.isNew).concat(
          result.filter(shoe => !shoe.isNew)
        );
        break;
      default: // 'featured' or anything else
        // No specific sorting applied
        break;
    }
    
    setFilteredShoes(result);
  }, [category, sortOption, priceRange, selectedColors]);
  
  // Get page title based on category
  const getPageTitle = () => {
    if (category === 'men') return "Men's Shoes";
    if (category === 'women') return "Women's Shoes";
    if (category === 'sale') return "Sale Items";
    if (category === 'collections') return "Our Collections";
    return "All Shoes";
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{getPageTitle()}</h1>
            <p className="text-neutral-600">
              {filteredShoes.length} products
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar - Desktop */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg border border-neutral-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">Filters</h2>
                  {(priceRange.length > 0 || selectedColors.length > 0) && (
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
                
                {/* Price Range Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <div key={range.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`price-${range.value}`}
                          checked={priceRange.includes(range.value)}
                          onCheckedChange={() => togglePriceRange(range.value)}
                        />
                        <Label htmlFor={`price-${range.value}`} className="cursor-pointer">
                          {range.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Color Filter */}
                <div>
                  <h3 className="font-medium mb-3">Colors</h3>
                  <div className="space-y-2">
                    {allColors.map(color => (
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
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort and Filter Controls */}
              <div className="flex justify-between items-center mb-6">
                <Button 
                  variant="outline" 
                  className="lg:hidden flex items-center"
                  onClick={() => setFilterMenuOpen(true)}
                >
                  <Filter size={16} className="mr-2" />
                  Filters
                </Button>
                
                <div className="flex items-center ml-auto">
                  <span className="text-sm text-neutral-600 mr-2 hidden sm:inline">Sort by:</span>
                  <Select value={sortOption} onValueChange={setSortOption}>
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
              </div>
              
              {/* Mobile Filter Slide-in */}
              {filterMenuOpen && (
                <div className="fixed inset-0 bg-neutral-900/50 z-50 lg:hidden overflow-hidden">
                  <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform animate-slide-left p-4 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-bold">Filters</h2>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setFilterMenuOpen(false)}
                      >
                        <X size={20} />
                      </Button>
                    </div>
                    
                    {/* Price Range Filter Mobile */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <div className="space-y-3">
                        {priceRanges.map(range => (
                          <div key={range.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-price-${range.value}`}
                              checked={priceRange.includes(range.value)}
                              onCheckedChange={() => togglePriceRange(range.value)}
                            />
                            <Label htmlFor={`mobile-price-${range.value}`} className="cursor-pointer">
                              {range.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Color Filter Mobile */}
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Colors</h3>
                      <div className="space-y-3">
                        {allColors.map(color => (
                          <div key={color} className="flex items-center space-x-2">
                            <Checkbox
                              id={`mobile-color-${color}`}
                              checked={selectedColors.includes(color)}
                              onCheckedChange={() => toggleColor(color)}
                            />
                            <Label htmlFor={`mobile-color-${color}`} className="cursor-pointer">
                              {color}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      {(priceRange.length > 0 || selectedColors.length > 0) && (
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={resetFilters}
                        >
                          Reset Filters
                        </Button>
                      )}
                      <Button 
                        className="flex-1 bg-brand hover:bg-brand-dark text-white"
                        onClick={() => setFilterMenuOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Products */}
              {filteredShoes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredShoes.map(shoe => (
                    <ProductCard key={shoe.id} product={shoe} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-neutral-50 rounded-lg">
                  <h2 className="text-xl font-medium mb-2">No products found</h2>
                  <p className="text-neutral-600 mb-6">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <Button onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
