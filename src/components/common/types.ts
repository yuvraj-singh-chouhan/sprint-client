import { LucideIcon } from 'lucide-react';
import { Shoe } from '@/data/shoes';

// SectionHeader Types
export interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  centered?: boolean;
  animationDelay?: string;
}

// FeatureCard Types
export interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
  animationDelay?: string;
  centered?: boolean;
}

// EmptyState Types
export interface EmptyStateAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
  icon?: LucideIcon;
}

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actions?: EmptyStateAction[];
  iconClassName?: string;
  className?: string;
  cardClassName?: string;
}

// PageLayout Types
export interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  mainClassName?: string;
  withFooter?: boolean;
  withNavbar?: boolean;
}

// PageHeader Types
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  currentPage: string;
  showBackButton?: boolean;
  backButtonLabel?: string;
  actions?: React.ReactNode;
  badges?: React.ReactNode;
  className?: string;
}

// BackButton Types
export interface BackButtonProps {
  label?: string;
  className?: string;
  onClick?: () => void;
}

// ProductGrid Types
export interface ProductGridProps {
  products: Shoe[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
  className?: string;
  animateItems?: boolean;
  animationDelay?: number;
}

// TrustIndicators Types
export interface TrustIndicatorsProps {
  variant?: 'default' | 'cart' | 'wishlist';
  className?: string;
  columns?: number;
}

// FloatingBadge Types
export interface FloatingBadgeProps {
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