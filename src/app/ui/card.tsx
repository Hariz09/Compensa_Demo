import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};
export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`border-b pb-2 ${className}`}>
      {children}
    </div>
  );
};
export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`text-lg font-semibold ${className}`}>
      {children}
    </div>
  );
};
export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`pt-2 ${className}`}>
      {children}
    </div>
  );
};
export const CardDescription: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`text-sm text-gray-500 ${className}`}>
      {children}
    </div>
  );
};
