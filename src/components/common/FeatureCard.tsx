import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
  animationDelay?: string;
  centered?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  iconBgColor = 'bg-brand/10',
  iconColor = 'text-brand',
  className,
  animationDelay = '0s',
  centered = true
}) => {
  return (
    <div 
      className={cn(
        'feature-card reveal-animation',
        centered ? 'text-center' : '',
        className
      )}
      style={{ animationDelay }}
    >
      <div className={cn(
        'w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform',
        iconBgColor,
        centered ? 'mx-auto' : ''
      )}>
        <Icon className={cn('w-10 h-10', iconColor)} />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-neutral-900">{title}</h3>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard; 