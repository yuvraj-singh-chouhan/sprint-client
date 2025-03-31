
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { shoes } from '@/data/shoes';
import FilterSidebar from '@/components/category/FilterSidebar';
import MobileFilterMenu from '@/components/category/MobileFilterMenu';
import SortControl from '@/components/category/SortControl';
import ProductGrid from '@/components/category/ProductGrid';
import { useCategoryFilters } from '@/hooks/use-category-filters';

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
  
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  const {
    filteredShoes,
    sortOption,
    setSortOption,
    priceRange,
    selectedColors,
    allColors,
    priceRanges,
    togglePriceRange,
    toggleColor,
    resetFilters
  } = useCategoryFilters(shoes, category);
  
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
            <FilterSidebar
              priceRanges={priceRanges}
              allColors={allColors}
              priceRange={priceRange}
              selectedColors={selectedColors}
              togglePriceRange={togglePriceRange}
              toggleColor={toggleColor}
              resetFilters={resetFilters}
            />
            
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
                
                <SortControl 
                  sortOption={sortOption} 
                  onSortChange={setSortOption} 
                />
              </div>
              
              {/* Mobile Filter Slide-in */}
              <MobileFilterMenu
                isOpen={filterMenuOpen}
                priceRanges={priceRanges}
                allColors={allColors}
                priceRange={priceRange}
                selectedColors={selectedColors}
                togglePriceRange={togglePriceRange}
                toggleColor={toggleColor}
                resetFilters={resetFilters}
                closeFilterMenu={() => setFilterMenuOpen(false)}
              />
              
              {/* Products */}
              <ProductGrid 
                products={filteredShoes} 
                resetFilters={resetFilters} 
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
