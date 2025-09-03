import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  icon?: LucideIcon;
}

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actions?: EmptyStateAction[];
  iconClassName?: string;
  className?: string;
  cardClassName?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actions = [],
  iconClassName = 'text-neutral-400',
  className,
  cardClassName = 'max-w-lg mx-auto'
}) => {
  return (
    <Card className={cn(cardClassName, className)}>
      <CardContent className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-neutral-100 rounded-full flex items-center justify-center">
          <Icon className={cn('h-12 w-12', iconClassName)} />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-neutral-900">{title}</h2>
        <p className="text-neutral-600 mb-8 max-w-sm mx-auto">
          {description}
        </p>
        {actions.length > 0 && (
          <div className="space-y-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                onClick={action.onClick}
                variant={action.variant || 'default'}
                className={cn(
                  'w-full',
                  index === 0 && !action.variant ? 'bg-brand hover:bg-brand-dark text-white hover-lift' : 'hover:bg-gray-100'
                )}
                size="lg"
              >
                {action.icon && <action.icon className="mr-2 h-5 w-5" />}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EmptyState; 