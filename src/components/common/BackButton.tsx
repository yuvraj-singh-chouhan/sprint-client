import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  label?: string;
  className?: string;
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({
  label = 'Back',
  className,
  onClick
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className={cn(
        'text-neutral-600 hover:text-brand hover:bg-brand/10 transition-all duration-300 p-2 rounded-full',
        className
      )}
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      {label}
    </Button>
  );
};

export default BackButton; 