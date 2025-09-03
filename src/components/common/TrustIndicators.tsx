import React from 'react';
import { Truck, Shield, Package, RefreshCw, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustIndicator {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

interface TrustIndicatorsProps {
  variant?: 'default' | 'cart' | 'wishlist';
  className?: string;
  columns?: number;
}

const defaultIndicators: TrustIndicator[] = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $99',
    iconBgColor: 'bg-brand/10',
    iconColor: 'text-brand'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% protected',
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: Package,
    title: 'Easy Returns',
    description: '60-day policy',
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  }
];

const cartIndicators: TrustIndicator[] = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $99',
    iconBgColor: 'bg-brand/10',
    iconColor: 'text-brand'
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '100% protected',
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: Package,
    title: 'Easy Returns',
    description: '60-day policy',
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  }
];

const wishlistIndicators: TrustIndicator[] = [
  {
    icon: Heart,
    title: 'Save Your Favorites',
    description: 'Keep track of products you love and shop them later',
    iconBgColor: 'bg-brand/10',
    iconColor: 'text-brand'
  },
  {
    icon: Star,
    title: 'Personalized Picks',
    description: 'Get recommendations based on your saved items',
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    icon: Package,
    title: 'Quick Add to Cart',
    description: 'Easily move your wishlist items to cart when ready',
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
];

const TrustIndicators: React.FC<TrustIndicatorsProps> = ({
  variant = 'default',
  className,
  columns = 3
}) => {
  const getIndicators = () => {
    switch (variant) {
      case 'cart':
        return cartIndicators;
      case 'wishlist':
        return wishlistIndicators;
      default:
        return defaultIndicators;
    }
  };

  const indicators = getIndicators();

  return (
    <div className={cn(
      'grid gap-6 py-8',
      columns === 1 ? 'grid-cols-1' :
      columns === 2 ? 'grid-cols-1 md:grid-cols-2' :
      'grid-cols-1 md:grid-cols-3',
      className
    )}>
      {indicators.map((indicator, index) => (
        <div key={index} className="text-center p-6 bg-white rounded-2xl border border-neutral-200">
          <div className={cn(
            'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center',
            indicator.iconBgColor
          )}>
            <indicator.icon className={cn('h-8 w-8', indicator.iconColor)} />
          </div>
          <h4 className="font-semibold text-neutral-900 mb-2">{indicator.title}</h4>
          <p className="text-neutral-600 text-sm">{indicator.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustIndicators; 