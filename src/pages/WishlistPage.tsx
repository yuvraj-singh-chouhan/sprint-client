
import React, { useMemo } from 'react';
import { useWishlist } from '@/hooks/use-wishlist';
import { getShoesData } from '@/data/shoes'; 
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, HeartOff, ArrowLeft } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const WishlistPage: React.FC = () => {
  const { items: wishlistItems, clearWishlist } = useWishlist();
  
  const allShoes = getShoesData();
  const wishlistProducts = useMemo(() => {
    return allShoes.filter(shoe => wishlistItems.includes(shoe.id));
  }, [allShoes, wishlistItems]);

  return (
    <div className="container-custom py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Link to="/" className="inline-flex items-center text-neutral-600 hover:text-brand mb-2 text-sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold flex items-center">
            My Wishlist
            <Heart className="ml-3 h-6 w-6 text-red-500" />
          </h1>
        </div>
        
        {wishlistItems.length > 0 && (
          <Button 
            variant="outline" 
            className="border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={clearWishlist}
          >
            <HeartOff className="mr-2 h-4 w-4" />
            Clear Wishlist
          </Button>
        )}
      </div>
      
      <Separator className="mb-8" />
      
      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
            <HeartOff className="h-8 w-8 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-medium text-neutral-700 mb-2">Your wishlist is empty</h2>
          <p className="text-neutral-500 mb-6">Items added to your wishlist will be saved here</p>
          <Link to="/shoes">
            <Button className="bg-brand hover:bg-brand/90">
              Discover Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
