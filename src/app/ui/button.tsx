// src/components/ui/button.tsx
import React, { ReactNode } from "react";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';


interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "md" | "lg";
  variant?: "primary" | "secondary";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  size = "md",
  variant = "primary",
}) => {
  const baseStyle =
    "rounded-md font-semibold transition duration-200 focus:outline-none";
  const sizeStyle = size === "lg" ? "px-6 py-2" : "px-4 py-2";
  const variantStyle =
    variant === "secondary"
      ? "bg-gray-200 text-gray-800"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${sizeStyle} ${variantStyle} ${className}`}
    >
      {children}
    </button>
  );
};

interface ReturnButtonProps {
  href: string;
  className?: string; // Optional className to customize the button further
}

export const ReturnButton: React.FC<ReturnButtonProps> = ({ href, className = '' }) => {
  return (
    <Link href={href}>
      <div
        className={`absolute top-4 left-4 flex items-center space-x-2 text-white hover:text-gray-300 cursor-pointer p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition ease-in-out duration-200 shadow-lg ${className}`}
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Return</span>
      </div>
    </Link>
  );
};

interface LoginButtonProps {
  label: string;
  buttonColor: string;
};

export function LoginButton({ label, buttonColor }: LoginButtonProps) {
  return (
    <button
      className={`text-white rounded-md p-2 w-full ${buttonColor}`}
      style={{ userSelect: 'none' }}
    >
      Login as {label}
    </button>
  );
}


