import React from "react";
import { status, form, text, border, neutral } from "../theme/colors";

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
          <div
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold cursor-help z-10 transition-colors group"
            style={{
              backgroundColor: status.error,
              color: text.white,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = status.errorDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = status.error;
            }}
          >
            !{/* Custom red tooltip */}
            <div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50"
              style={{
                backgroundColor: status.error,
                color: text.white,
              }}
            >
              {errorMessage}
              {/* Tooltip arrow */}
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                style={{ borderTopColor: status.error }}
              ></div>
            </div>
          </div>
        )}

        <input
          className={`w-100 py-4 rounded-lg focus:outline-none transition-all ${
            showError ? "pl-12 pr-12" : children ? "pl-4 pr-12" : "px-4"
          } ${className || ""}`}
          style={{
            color: text.primary,
            backgroundColor: showError ? status.errorBg : form.inputBg,
            border: `1px solid ${
              showError ? status.errorBorder : form.inputBorder
            }`,
            boxShadow: showError ? `0 0 0 2px ${status.errorFocus}` : "none",
          }}
          onFocus={(e) => {
            const target = e.target as HTMLInputElement;
            target.style.backgroundColor = form.inputBgFocus;
            target.style.borderColor = form.inputBorderFocus;
            target.style.boxShadow = `0 0 0 3px ${border.focus}1A`;
          }}
          onBlur={(e) => {
            const target = e.target as HTMLInputElement;
            target.style.backgroundColor = showError
              ? status.errorBg
              : form.inputBg;
            target.style.borderColor = showError
              ? status.errorBorder
              : form.inputBorder;
            target.style.boxShadow = showError
              ? `0 0 0 2px ${status.errorFocus}`
              : "none";
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLInputElement;
            if (target !== document.activeElement) {
              target.style.backgroundColor = showError
                ? status.errorBg
                : neutral.gray100;
              target.style.borderColor = showError
                ? status.errorBorder
                : form.inputBorderHover;
            }
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLInputElement;
            if (target !== document.activeElement) {
              target.style.backgroundColor = showError
                ? status.errorBg
                : form.inputBg;
              target.style.borderColor = showError
                ? status.errorBorder
                : form.inputBorder;
            }
          }}
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
