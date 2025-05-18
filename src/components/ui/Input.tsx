import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    helperText, 
    error, 
    className, 
    leftIcon, 
    rightIcon, 
    fullWidth = false,
    ...props 
  }, ref) => {
    const inputClasses = twMerge(
      'flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors',
      'file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-gray-400',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0',
      'disabled:cursor-not-allowed disabled:opacity-50',
      error ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300',
      leftIcon ? 'pl-10' : '',
      rightIcon ? 'pr-10' : '',
      fullWidth ? 'w-full' : '',
      'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-500',
      className
    );

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label 
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-200"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={inputClasses}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error ? (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;