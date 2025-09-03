import React from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  mainClassName?: string;
  withFooter?: boolean;
  withNavbar?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  mainClassName,
  withFooter = true,
  withNavbar = true
}) => {
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {withNavbar && <Navbar />}
      <main className={cn('flex-grow', mainClassName)}>
        {children}
      </main>
      {withFooter && <Footer />}
    </div>
  );
};

export default PageLayout; 