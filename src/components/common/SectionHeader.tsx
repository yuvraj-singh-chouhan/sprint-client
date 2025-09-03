import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  centered?: boolean;
  animationDelay?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  centered = true,
  animationDelay = '0s'
}) => {
  return (
    <div 
      className={cn(
        'reveal-animation',
        centered ? 'text-center mb-16' : 'mb-12',
        className
      )}
      style={{ animationDelay }}
    >
      <h2 className={cn(
        'text-4xl lg:text-5xl font-bold mb-4 text-neutral-900',
        titleClassName
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          'text-xl text-neutral-600',
          centered ? 'max-w-2xl mx-auto' : '',
          descriptionClassName
        )}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader; 