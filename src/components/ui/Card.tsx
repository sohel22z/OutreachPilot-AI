import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <div className={twMerge("rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950", className)}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={twMerge("px-6 py-4 flex flex-col space-y-1.5", className)}>
      {children}
    </div>
  );
};

const CardTitle = ({ 
  children, 
  className,
  as: Component = 'h3'
}: CardTitleProps) => {
  return (
    <Component className={twMerge("font-semibold text-lg text-gray-900 dark:text-white", className)}>
      {children}
    </Component>
  );
};

const CardDescription = ({ children, className }: CardDescriptionProps) => {
  return (
    <p className={twMerge("text-sm text-gray-500 dark:text-gray-400", className)}>
      {children}
    </p>
  );
};

const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={twMerge("px-6 py-4", className)}>
      {children}
    </div>
  );
};

const CardFooter = ({ children, className }: CardFooterProps) => {
  return (
    <div className={twMerge("px-6 py-4 flex items-center border-t border-gray-200 dark:border-gray-800", className)}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };