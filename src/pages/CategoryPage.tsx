
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Filter, Grid3X3, LayoutGrid, Settings2, ChevronDown, X, Tag, Palette, DollarSign } from 'lucide-react';
import { shoes } from '@/data/shoes';
import FilterSidebar from '@/components/category/FilterSidebar';
import MobileFilterMenu from '@/components/category/MobileFilterMenu';
import SortControl from '@/components/category/SortControl';
import { useCategoryFilters } from '@/hooks/use-category-filters';

// Import new common components
import {
  PageLayout,
  PageHeader,
  SectionHeader,
  EmptyState,
  ProductGrid as CommonProductGrid
} from '@/components/common';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [gridSize, setGridSize] = useState<3 | 4>(3);

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

  // Get page info based on category
  const getPageInfo = () => {
    const baseInfo = {
      title: "All Shoes",
      subtitle: "Discover our complete collection of premium footwear",
      breadcrumbs: [
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/shoes' }
      ]
    };

    switch (category) {
      case 'men':
        return {
          title: "Men's Collection",
          subtitle: "Premium footwear designed for the modern gentleman",
          breadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shoes' },
            { label: 'Men', href: '/men' }
          ]
        };
      case 'women':
        return {
          title: "Women's Collection",
          subtitle: "Elegant and comfortable shoes for every occasion",
          breadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shoes' },
            { label: 'Women', href: '/women' }
          ]
        };
      case 'sale':
        return {
          title: "Sale Items",
          subtitle: "Amazing deals on premium footwear - Limited time offers",
          breadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shoes' },
            { label: 'Sale', href: '/sale' }
          ]
        };
      case 'collections':
        return {
          title: "Our Collections",
          subtitle: "Curated collections for every style and season",
          breadcrumbs: [
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shoes' },
            { label: 'Collections', href: '/collections' }
          ]
        };
      default:
        return baseInfo;
    }
  };

  const pageInfo = getPageInfo();
  const hasActiveFilters = priceRange.length > 0 || selectedColors.length > 0;
  const totalActiveFilters = priceRange.length + selectedColors.length;

  // Clear individual filters
  const clearPriceFilters = () => {
    priceRange.forEach(range => togglePriceRange(range));
  };

  const clearColorFilters = () => {
    selectedColors.forEach(color => toggleColor(color));
  };

  return (
    <PageLayout className="bg-neutral-50">
      {/* Enhanced Page Header with Breadcrumbs */}
      <PageHeader
        title={pageInfo.title}
        subtitle={`${filteredShoes.length} ${filteredShoes.length === 1 ? 'product' : 'products'} available`}
        breadcrumbs={pageInfo.breadcrumbs}
        currentPage={pageInfo.title}
        showBackButton={false}
      />

      {/* Category Description */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container-custom py-8">
          <div className="max-w-3xl">
            <p className="text-lg text-neutral-600 leading-relaxed">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Filter Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Filter Header */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <Settings2 className="h-5 w-5 text-neutral-600" />
                    <h2 className="text-lg font-bold text-neutral-900">Filters</h2>
                    {totalActiveFilters > 0 && (
                      <Badge className="bg-brand text-white text-xs">
                        {totalActiveFilters}
                      </Badge>
                    )}
                  </div>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-neutral-600 hover:text-white transition-all duratin-300"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="mb-6 p-4 bg-neutral-50 rounded-xl">
                    <h4 className="text-sm font-medium text-neutral-700 mb-3">Active Filters:</h4>
                    <div className="space-y-2">
                      {priceRange.length > 0 && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-neutral-500" />
                            <span className="text-sm text-neutral-600">
                              {priceRange.length} price range{priceRange.length > 1 ? 's' : ''}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearPriceFilters}
                            className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {selectedColors.length > 0 && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Palette className="h-4 w-4 text-neutral-500" />
                            <span className="text-sm text-neutral-600">
                              {selectedColors.length} color{selectedColors.length > 1 ? 's' : ''}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearColorFilters}
                            className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <FilterSidebar
                  priceRanges={priceRanges}
                  allColors={allColors}
                  priceRange={priceRange}
                  selectedColors={selectedColors}
                  togglePriceRange={togglePriceRange}
                  toggleColor={toggleColor}
                  resetFilters={resetFilters}
                />
              </div>

              {/* Category Quick Stats */}
              {/* <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm">
                <h3 className="font-bold text-neutral-900 mb-4">Collection Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Total Products</span>
                    <span className="text-sm font-semibold text-neutral-900">{shoes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Showing</span>
                    <span className="text-sm font-semibold text-brand">{filteredShoes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-neutral-600">Categories</span>
                    <span className="text-sm font-semibold text-neutral-900">5</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Enhanced Controls Bar */}
            <div className="bg-white rounded-2xl p-4 lg:p-6 border border-neutral-200 shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left Side - Results and Mobile Filter */}
                <div className="flex items-center justify-between sm:justify-start space-x-4">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    className="lg:hidden flex items-center space-x-2 border-2"
                    onClick={() => setFilterMenuOpen(true)}
                  >
                    <Filter size={16} />
                    <span>Filters</span>
                    {totalActiveFilters > 0 && (
                      <Badge className="bg-brand text-white text-xs ml-1">
                        {totalActiveFilters}
                      </Badge>
                    )}
                  </Button>

                  {/* Results Count */}
                  <div className="hidden sm:flex items-center space-x-2">
                    <span className="text-sm text-neutral-600">Showing</span>
                    <Badge variant="outline" className="text-neutral-900 font-medium">
                      {filteredShoes.length} {filteredShoes.length === 1 ? 'product' : 'products'}
                    </Badge>
                  </div>
                </div>

                {/* Right Side - View Controls and Sort */}
                <div className="flex items-center space-x-4">
                  {/* View Mode Toggle */}
                  <div className="hidden lg:flex items-center space-x-2 bg-neutral-100 rounded-lg p-1">
                    <Button
                      variant={gridSize === 3 ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setGridSize(3)}
                      className={`h-8 w-8 p-0 ${gridSize === 3 ? 'bg-white shadow-sm' : ''}`}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={gridSize === 4 ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setGridSize(4)}
                      className={`h-8 w-8 p-0 ${gridSize === 4 ? 'bg-white shadow-sm' : ''}`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sort Control */}
                  <SortControl
                    sortOption={sortOption}
                    onSortChange={setSortOption}
                  />
                </div>
              </div>

              {/* Active Filters Tags - Mobile */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-neutral-200 lg:hidden">
                  <div className="flex flex-wrap gap-2">
                    {priceRange.map((range) => (
                      <Badge
                        key={range}
                        variant="secondary"
                        className="flex items-center space-x-1 bg-brand/10 text-brand hover:bg-brand/20"
                      >
                        <span className="text-xs">{priceRanges.find(pr => pr.value === range)?.label}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePriceRange(range)}
                          className="h-4 w-4 p-0 hover:bg-brand/30"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {selectedColors.map((color) => (
                      <Badge
                        key={color}
                        variant="secondary"
                        className="flex items-center space-x-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
                      >
                        <span className="text-xs">{color}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleColor(color)}
                          className="h-4 w-4 p-0 hover:bg-purple-300"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
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

            {/* Products Display */}
            {filteredShoes.length === 0 ? (
              /* Enhanced Empty State */
              <EmptyState
                icon={Tag}
                title="No products found"
                description="Try adjusting your filters or search criteria to find what you're looking for."
                actions={[
                  {
                    label: 'Reset Filters',
                    onClick: resetFilters,
                    variant: 'default'
                  },
                  {
                    label: 'View All Products',
                    onClick: () => window.location.href = '/shoes',
                    variant: 'outline'
                  }
                ]}
              />
            ) : (
              /* Products Grid with Enhanced Layout */
              <div className="space-y-8">
                <CommonProductGrid
                  products={filteredShoes}
                  columns={{
                    sm: 2,
                    lg: gridSize,
                    xl: gridSize === 3 ? 3 : 4
                  }}
                  gap="gap-6 lg:gap-8"
                  animateItems={true}
                  animationDelay={0.05}
                />

                {/* Load More / Pagination Placeholder */}
                {filteredShoes.length > 12 && (
                  <div className="text-center py-8">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 hover:bg-brand hover:text-white hover:border-brand transition-all duration-300"
                    >
                      Load More Products
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CategoryPage;
