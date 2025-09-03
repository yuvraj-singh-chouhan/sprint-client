
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, RotateCcw, Shield, Minus, Plus, Heart, ShoppingCart, Star, ZoomIn, Share2, Bookmark, Info, CheckCircle, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getShoeById } from '@/data/shoes';
import { useCart } from '@/hooks/use-cart';
import { useWishlist } from '@/hooks/use-wishlist';
import { shoes } from '@/data/shoes';
import { toast } from "@/components/ui/use-toast";

// Import new common components
import { 
  PageLayout, 
  PageHeader, 
  SectionHeader, 
  EmptyState, 
  ProductGrid,
  TrustIndicators 
} from '@/components/common';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  
  const product = getShoeById(id || '');
  const inWishlist = product ? isInWishlist(product.id) : false;
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  
  const similarProducts = shoes
    .filter(shoe => 
      shoe.id !== id && 
      (shoe.category === product?.category || 
       shoe.tags.some(tag => product?.tags.includes(tag)))
    )
    .slice(0, 4);

  // Mock reviews data (in a real app, this would come from an API)
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment: "Amazing quality! Super comfortable and exactly as described. Highly recommend!",
      verified: true
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "2024-01-10",
      comment: "Great shoes, but runs slightly small. I'd recommend going up half a size.",
      verified: true
    },
    {
      id: 3,
      name: "Emma Wilson",
      rating: 5,
      date: "2024-01-08",
      comment: "Perfect for both casual and semi-formal occasions. Love the design!",
      verified: true
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  if (!product) {
    return (
      <PageLayout>
        <EmptyState
          icon={ShoppingCart}
          title="Product Not Found"
          description="The product you're looking for doesn't exist or has been removed."
          actions={[
            {
              label: 'Return to Shop',
              onClick: () => navigate('/shoes'),
              variant: 'default'
            }
          ]}
        />
      </PageLayout>
    );
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart",
        variant: "destructive"
      });
      return;
    }
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} (Size ${selectedSize}) added to your cart.`,
    });
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id, product.name);
    } else {
      addToWishlist(product.id, product.name);
    }
  };

  // Define breadcrumbs
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shoes' },
    { label: product.category, href: `/${product.category}` }
  ];

  const discountPercentage = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <PageLayout className="bg-neutral-50">
      {/* Enhanced Page Header with Breadcrumbs */}
      <PageHeader
        title={product.name}
        breadcrumbs={breadcrumbs}
        currentPage={product.name}
        showBackButton={true}
        backButtonLabel="Back to Products"
        actions={
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-600 hover:text-brand"
            onClick={() => {
              navigator.share?.({ 
                title: product.name, 
                url: window.location.href 
              }) || navigator.clipboard.writeText(window.location.href);
              toast({ title: "Link copied to clipboard!" });
            }}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        }
      />

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Enhanced Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-neutral-200 relative group">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                  isImageZoomed ? 'scale-150' : 'scale-100'
                }`}
                onClick={() => setIsImageZoomed(!isImageZoomed)}
              />
              
              {/* Product Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-green-500 text-white shadow-lg">
                    New Arrival
                  </Badge>
                )}
                {product.onSale && discountPercentage > 0 && (
                  <Badge className="bg-red-500 text-white shadow-lg">
                    -{discountPercentage}% OFF
                  </Badge>
                )}
              </div>

              {/* Zoom Indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/50 text-white p-2 rounded-full">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === idx 
                        ? 'border-brand ring-2 ring-brand/20' 
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${idx + 1}`} 
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Enhanced Product Info */}
          <div className="space-y-6">
            {/* Product Title and Rating */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-3">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(averageRating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-neutral-600">
                  {averageRating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
            </div>
            
            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-neutral-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-neutral-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <Badge className="bg-red-100 text-red-700">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>
            
            {/* Product Description */}
            <p className="text-lg text-neutral-600 leading-relaxed">
              {product.description}
            </p>
            
            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-neutral-900">Size</h3>
                <Button variant="ghost" size="sm" className="text-brand text-sm">
                  Size Guide
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`aspect-square border-2 rounded-xl font-medium transition-all duration-300 ${
                      selectedSize === size 
                        ? 'border-brand bg-brand text-white shadow-lg' 
                        : 'border-neutral-300 hover:border-brand hover:bg-brand/5'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-neutral-900">Available Colors</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map(color => (
                  <div 
                    key={color} 
                    className="px-4 py-2 border-2 border-neutral-200 rounded-xl bg-white hover:border-brand transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-medium text-neutral-700">{color}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quantity Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-neutral-900">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border-2 border-neutral-200 rounded-xl overflow-hidden">
                  <button
                    onClick={decrementQuantity}
                    className="w-12 h-12 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <div className="w-16 h-12 flex items-center justify-center font-semibold bg-neutral-50">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    className="w-12 h-12 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-neutral-600">
                  {quantity > 1 ? `${quantity} items` : '1 item'}
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-4 pt-6">
              <div className="flex space-x-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-neutral-900 hover:bg-black text-white h-14 text-lg font-semibold hover-lift"
                  size="lg"
                >
                  <ShoppingCart className="mr-3 h-5 w-5" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className={`h-14 w-14 border-2 ${
                    inWishlist 
                      ? 'border-red-200 bg-red-50 hover:bg-red-100' 
                      : 'border-neutral-300 hover:border-red-300 hover:bg-red-50'
                  }`}
                  onClick={handleWishlist}
                >
                  <Heart className={`h-5 w-5 ${inWishlist ? 'text-red-500 fill-red-500' : 'text-neutral-600'}`} />
                </Button>
              </div>

              <Button 
                variant="outline" 
                className="w-full h-12 border-2 hover:bg-neutral-50"
                size="lg"
              >
                <Bookmark className="mr-2 h-4 w-4" />
                Buy Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="bg-neutral-50 rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-brand/10 rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-brand" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Free Shipping</h4>
                    <p className="text-xs text-neutral-600">On orders $99+</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <RotateCcw className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Easy Returns</h4>
                    <p className="text-xs text-neutral-600">60-day policy</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Secure Payment</h4>
                    <p className="text-xs text-neutral-600">Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details and Reviews Tabs */}
        <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm mb-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="details" className="text-base font-medium">Product Details</TabsTrigger>
              <TabsTrigger value="reviews" className="text-base font-medium">Reviews ({reviews.length})</TabsTrigger>
              <TabsTrigger value="shipping" className="text-base font-medium">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-brand" />
                  Product Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Features</h4>
                    <ul className="space-y-2">
                      {product.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Specifications</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Brand:</span>
                        <span className="font-medium">SoleVenture</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Category:</span>
                        <span className="font-medium capitalize">{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Material:</span>
                        <span className="font-medium">Premium Leather</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">SKU:</span>
                        <span className="font-medium">{product.id.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-400 fill-current" />
                  Customer Reviews
                </h3>
                <Button variant="outline">Write a Review</Button>
              </div>
              
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-neutral-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-semibold">{review.name}</h4>
                        {review.verified && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-neutral-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < review.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-neutral-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-neutral-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="space-y-6">
              <TrustIndicators variant="default" />
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Products */}
        <div>
          <SectionHeader
            title="You Might Also Like"
            description="Discover more products from our collection"
            centered={false}
          />
          
          <ProductGrid
            products={similarProducts}
            columns={{ sm: 2, lg: 4 }}
            animateItems={true}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetail;
