
import React, { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWishlist } from '@/hooks/use-wishlist';
import { shoes } from '@/data/shoes'; 
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Heart, HeartOff, ArrowLeft, ShoppingCart, Package, Star } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { items: wishlistItems, clearWishlist } = useWishlist();
  
  const allShoes = shoes;
  const wishlistProducts = useMemo(() => {
    return allShoes.filter(shoe => wishlistItems.includes(shoe.id));
  }, [allShoes, wishlistItems]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-white border-b border-neutral-200">
          <div className="container-custom py-6">
            {/* Back Button */}
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="text-neutral-600 hover:text-brand hover:bg-brand/10 transition-all duration-300 p-2 rounded-full"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </Button>
            </div>

            {/* Breadcrumbs */}
            <div className="mb-4">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="text-neutral-600 hover:text-brand transition-colors">
                        Home
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/shoes" className="text-neutral-600 hover:text-brand transition-colors">
                        Shop
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-neutral-900 font-medium">
                      Wishlist
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            {/* Title and Actions */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2 flex items-center">
                  My Wishlist
                  <Heart className="ml-3 h-8 w-8 text-red-500 fill-red-500" />
                </h1>
                <p className="text-neutral-600">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
                </p>
              </div>
              
              {wishlistItems.length > 0 && (
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="px-3 py-1 hidden md:flex">
                    <Heart className="h-4 w-4 mr-2 text-red-500" />
                    {wishlistItems.length} Items
                  </Badge>
                  
                  <Button 
                    variant="outline" 
                    className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300"
                    onClick={clearWishlist}
                  >
                    <HeartOff className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Clear Wishlist</span>
                    <span className="sm:hidden">Clear</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          {wishlistItems.length === 0 ? (
            /* Enhanced Empty State */
            <Card className="max-w-lg mx-auto">
              <CardContent className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                  <HeartOff className="h-12 w-12 text-red-300" />
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-neutral-900">Your wishlist is empty</h2>
                <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
                  Save items you love by clicking the heart icon. Your favorites will appear here for easy shopping later.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/shoes')}
                    className="w-full bg-brand hover:bg-brand-dark text-white hover-lift"
                    size="lg"
                  >
                    <Package className="mr-2 h-5 w-5" />
                    Discover Products
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate('/collections')}
                    className="w-full"
                  >
                    Browse Collections
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Wishlist with Items */
            <div className="space-y-8">
              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-white rounded-2xl border border-neutral-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-neutral-900">
                      {wishlistItems.length} Saved Items
                    </h3>
                    <p className="text-neutral-600">Ready to add to cart</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={() => navigate('/shoes')}
                    className="flex-1 sm:flex-none hover:bg-brand/10 hover:border-brand"
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    onClick={() => navigate('/cart')}
                    className="flex-1 sm:flex-none bg-brand hover:bg-brand-dark text-white"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    View Cart
                  </Button>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistProducts.map((product, index) => (
                  <div key={product.id} className="reveal-animation" style={{animationDelay: `${index * 0.1}s`}}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Recommendations Section */}
              {wishlistItems.length > 0 && (
                <div className="mt-12 p-8 bg-white rounded-2xl border border-neutral-200">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">You might also like</h3>
                    <p className="text-neutral-600">Based on your wishlist preferences</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {shoes
                      .filter(shoe => !wishlistItems.includes(shoe.id))
                      .slice(0, 4)
                      .map((product, index) => (
                        <div key={product.id} className="reveal-animation" style={{animationDelay: `${index * 0.1}s`}}>
                          <ProductCard product={product} />
                        </div>
                      ))
                    }
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/shoes')}
                      className="px-8"
                    >
                      View All Products
                    </Button>
                  </div>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
                <div className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
                  <div className="w-16 h-16 mx-auto mb-4 bg-brand/10 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-brand" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Save Your Favorites</h4>
                  <p className="text-neutral-600 text-sm">
                    Keep track of products you love and shop them later
                  </p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Personalized Picks</h4>
                  <p className="text-neutral-600 text-sm">
                    Get recommendations based on your saved items
                  </p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-2">Quick Add to Cart</h4>
                  <p className="text-neutral-600 text-sm">
                    Easily move your wishlist items to cart when ready
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WishlistPage;
