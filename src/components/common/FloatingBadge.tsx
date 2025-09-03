import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingBadgeProps {
  children: React.ReactNode;
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  className?: string;
  animationDelay?: string;
  animation?: 'floating' | 'pulse' | 'none';
  hidden?: 'sm' | 'md' | 'lg' | 'xl' | 'never';
}

const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  children,
  position = {},
  className,
  animationDelay = '0s',
  animation = 'floating',
  hidden = 'lg'
}) => {
  const positionClasses = [];
  if (position.top) positionClasses.push(`top-${position.top}`);
  if (position.bottom) positionClasses.push(`bottom-${position.bottom}`);
  if (position.left) positionClasses.push(`left-${position.left}`);
  if (position.right) positionClasses.push(`right-${position.right}`);

  const animationClass = {
    floating: 'floating-element',
    pulse: 'pulse-glow',
    none: ''
  }[animation];

  const hiddenClass = hidden !== 'never' ? `hidden ${hidden}:block` : '';

  return (
    <div 
      className={cn(
        'absolute z-20 glass-effect rounded-2xl shadow-xl',
        positionClasses.join(' '),
        animationClass,
        hiddenClass,
        className
      )}
      style={{ animationDelay }}
    >
      {children}
    </div>
  );
};

// Specific floating badge variants
export const FloatingStatsBadge: React.FC<{
  rating: number;
  reviews: string;
  position?: FloatingBadgeProps['position'];
  animationDelay?: string;
}> = ({ rating, reviews, position, animationDelay }) => (
  <FloatingBadge position={position} animationDelay={animationDelay} className="px-4 py-3">
    <div className="text-center">
      <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-2">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
      <p className="text-xs font-bold text-neutral-900">{rating}/5</p>
      <p className="text-xs text-neutral-600">{reviews}</p>
    </div>
  </FloatingBadge>
);

export const FloatingProductBadge: React.FC<{
  label: string;
  title: string;
  price: string;
  icon?: LucideIcon;
  position?: FloatingBadgeProps['position'];
  animationDelay?: string;
}> = ({ label, title, price, icon: Icon, position, animationDelay }) => (
  <FloatingBadge position={position} animationDelay={animationDelay} className="px-5 py-4">
    <div className="flex items-center space-x-3">
      {Icon && (
        <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center">
          <Icon className="h-5 w-5 text-brand" />
        </div>
      )}
      <div>
        <p className="text-xs text-neutral-600">{label}</p>
        <p className="font-semibold text-sm text-neutral-900">{title}</p>
        <p className="text-brand font-bold text-sm">{price}</p>
      </div>
    </div>
  </FloatingBadge>
);

export const FloatingCountBadge: React.FC<{
  count: string;
  label: string;
  position?: FloatingBadgeProps['position'];
  animationDelay?: string;
}> = ({ count, label, position, animationDelay }) => (
  <FloatingBadge position={position} animationDelay={animationDelay} className="px-4 py-3">
    <div className="text-center">
      <p className="text-lg font-bold text-neutral-900">{count}</p>
      <p className="text-xs text-neutral-600">{label}</p>
    </div>
  </FloatingBadge>
);

export default FloatingBadge; 