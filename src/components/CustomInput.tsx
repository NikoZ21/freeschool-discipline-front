import React from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  showError?: boolean;
  children?: React.ReactNode;
}

export default function CustomInput({
  errorMessage,
  showError = false,
  className,
  children,
  ...inputProps
}: CustomInputProps) {
  return (
    <div className="relative">
      <div className="relative">
        {showError && errorMessage && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold cursor-help z-10 hover:bg-red-600 transition-colors group">
            !{/* Custom red tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-red-500 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
              {errorMessage}
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-500"></div>
            </div>
          </div>
        )}

        <input
          className={`w-100 py-4 text-gray-800 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 transition-all placeholder:text-gray-600 ${
            showError
              ? "ring-2 ring-red-500 bg-red-100 border-red-400 pl-12 pr-12"
              : children
              ? "pl-4 pr-12"
              : "px-4"
          } hover:bg-gray-100 hover:border-gray-400 ${className || ""}`}
          {...inputProps}
        />

        {/* Right side icon slot (for eye icon) */}
        {children && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
