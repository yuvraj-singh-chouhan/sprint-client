import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import BackButton from './BackButton';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
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

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs = [],
  currentPage,
  showBackButton = true,
  backButtonLabel,
  actions,
  badges,
  className
}) => {
  return (
    <div className={cn('bg-white border-b border-neutral-200', className)}>
      <div className="container-custom py-6">
        {/* Back Button */}
        {showBackButton && (
          <div className="mb-4">
            <BackButton label={backButtonLabel} />
          </div>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <div className="mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink asChild>
                          <Link to={item.href} className="text-neutral-600 hover:text-brand transition-colors">
                            {item.label}
                          </Link>
                        </BreadcrumbLink>
                      ) : (
                        <span className="text-neutral-600">{item.label}</span>
                      )}
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </React.Fragment>
                ))}
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-neutral-900 font-medium">
                    {currentPage}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}

        {/* Title and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-2 flex items-center">
              {title}
            </h1>
            {subtitle && (
              <p className="text-neutral-600">{subtitle}</p>
            )}
          </div>
          
          {(actions || badges) && (
            <div className="flex items-center space-x-3">
              {badges}
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader; 