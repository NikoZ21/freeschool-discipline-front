import { useState } from "react";

interface CustomInputProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  required?: boolean;
  label: string;
  errorMessage?: string;
  showError?: boolean;
}

export default function CustomInput({
  id,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  required = false,
  label,
  errorMessage,
  showError = false,
}: CustomInputProps) {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={type}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            showError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 hover:border-gray-400"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
        />

        {showError && errorMessage && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold cursor-help"
            title={errorMessage}
          >
            !
          </div>
        )}
      </div>
    </div>
  );
}
