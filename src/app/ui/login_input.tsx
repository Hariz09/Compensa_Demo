import React, { useState } from 'react';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

interface InputProps {
  label: string;
  iconColor: string;
  maxLength: number;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  warning?: string;
}

export function LoginInput({ label, iconColor, maxLength, placeholder, onChange, warning }: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      <span className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconColor}`}>
        <KeyRound />
      </span>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className="border rounded-md p-2 w-full text-white pl-10 pr-10 bg-transparent"
        maxLength={maxLength}
        onChange={onChange}
        required
      />
      {warning && <p className="text-red-500 text-sm mt-1 absolute">{warning}</p>}
      {showPassword ? (
        <EyeOff
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      ) : (
        <Eye
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
    </div>
  );
}
