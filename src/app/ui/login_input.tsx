import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps {
  label: string;
  iconColor: string;
  icon: JSX.Element; // Accept the icon as a prop
  maxLength: number;
  placeholder: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  warning?: string;
}

export function LoginInput({
  icon,
  iconColor,
  maxLength,
  placeholder,
  onChange,
  warning,
  type = 'text',
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordInput = type === 'password';

  return (
    <div className="relative w-full mb-4"> {/* Added margin bottom for spacing */}
      <div className="flex items-center">
        <span className={`absolute left-3 ${iconColor}`}>
          {icon} {/* Render the passed icon */}
        </span>
        <input
          type={isPasswordInput && showPassword ? 'text' : type}
          placeholder={placeholder}
          className="border rounded-md p-2 w-full text-white pl-10 pr-10 bg-transparent"
          maxLength={maxLength}
          onChange={onChange}
          required
        />
        {isPasswordInput ? (
          showPassword ? (
            <EyeOff
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <Eye
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )
        ) : null}
      </div>
      {warning && <p className="text-red-500 text-sm">{warning}</p>} {/* Moved warning outside of input container */}
    </div>
  );
}
