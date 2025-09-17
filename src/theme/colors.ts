// Color Palette Configuration
// Extracted from all components and organized semantically

export const colors = {
  // Primary brand colors
  primary: {
    blue: "#3b82f6",
    blueHover: "#2563eb",
    blueLight: "#1d4ed8",
    blueFocus: "rgba(59, 130, 246, 0.1)",
  },

  // Secondary colors
  secondary: {
    slate: "#334155",
    slateHover: "#475569",
    slateDark: "#0f172a",
  },

  // Neutral grays
  neutral: {
    white: "#ffffff",
    gray50: "#f9fafb",
    gray100: "#f3f4f6",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray500: "#6b7280",
    gray600: "#374151",
    gray700: "#1f2937",
    gray800: "#242424",
    gray900: "#333333",
  },

  // Background colors
  background: {
    primary: "#ffffff",
    secondary: "#f8f9fa",
    tertiary: "#f8fafc",
    hover: "#e0f2fe",
    selected: "#dbeafe",
    tableEven: "#e2e8f0",
    tableOdd: "#ffffff",
    modalOverlay: "rgba(0, 0, 0, 0.6)",
  },

  // Status and state colors
  status: {
    success: "#4caf50",
    successText: "#059669",
    successBg: "#d1fae5",
    successBorder: "#a7f3d0",
    successDark: "#065f46",
    warning: "#ff9800",
    warningAccent: "#ffd700",
    warningHover: "#ffcc00",
    error: "#f44336",
    errorText: "#dc2626",
    errorBg: "#fee2e2",
    errorBorder: "#fca5a5",
    errorDark: "#991b1b",
    errorFocus: "rgba(239, 68, 68, 0.1)",
    paid: "#059669",
    unpaid: "#dc2626",
  },

  // Text colors
  text: {
    primary: "#374151",
    secondary: "#6b7280",
    tertiary: "#9ca3af",
    dark: "#333333",
    darker: "#242424",
    white: "#ffffff",
    placeholder: "#9ca3af",
    disabled: "#6b7280",
  },

  // Border colors
  border: {
    light: "#e5e7eb",
    medium: "#d1d5db",
    focus: "#3b82f6",
    error: "#ef4444",
    table: "#f3f4f6",
    tableRow: "#f1f5f9",
    selected: "#3b82f6",
  },

  // Shadow definitions
  shadow: {
    light: "0 1px 3px rgba(0, 0, 0, 0.1)",
    medium: "0 2px 8px rgba(0, 0, 0, 0.1)",
    large: "0 2px 12px rgba(0, 0, 0, 0.08)",
    xlarge: "0 8px 32px rgba(0, 0, 0, 0.1)",
    button: "0 2px 8px rgba(59, 130, 246, 0.3)",
    buttonHover: "0 6px 20px rgba(59, 130, 246, 0.4)",
    tableHover: "0 2px 8px rgba(0, 0, 0, 0.1)",
    cardHover: "0 8px 25px rgba(255, 215, 0, 0.2)",
    modal: "0 20px 60px rgba(0, 0, 0, 0.3)",
  },

  // Gradient definitions
  gradient: {
    buttonPrimary: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    buttonPrimaryHover: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
    shimmer:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
    headerShine:
      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
  },

  // Form-specific colors
  form: {
    inputBg: "#f8fafc",
    inputBgFocus: "#ffffff",
    inputBgDisabled: "#f9fafb",
    inputBorder: "#d1d5db",
    inputBorderHover: "#9ca3af",
    inputBorderFocus: "#3b82f6",
    inputBorderError: "#ef4444",
    selectBg: "#ffffff",
  },

  // Button-specific colors
  button: {
    primaryBg: "#3b82f6",
    primaryHover: "#2563eb",
    primaryText: "#ffffff",
    secondaryBg: "#f3f4f6",
    secondaryHover: "#e5e7eb",
    secondaryText: "#374151",
    secondaryBorder: "#d1d5db",
    disabledBg: "#9ca3af",
    disabledText: "#ffffff",
    closeBg: "none",
    closeText: "#6b7280",
    closeHover: "#374151",
  },

  // Discipline status colors
  disciplines: {
    none: "#4caf50", // Green for no disciplines
    few: "#ff9800", // Orange for few disciplines
    many: "#f44336", // Red for many disciplines
  },
} as const;

// Export individual color groups for easier access
export const {
  primary,
  secondary,
  neutral,
  background,
  status,
  text,
  border,
  shadow,
  gradient,
  form,
  button,
  disciplines,
} = colors;

// Type definitions for better TypeScript support
export type ColorPalette = typeof colors;
export type PrimaryColors = typeof primary;
export type SecondaryColors = typeof secondary;
export type NeutralColors = typeof neutral;
export type BackgroundColors = typeof background;
export type StatusColors = typeof status;
export type TextColors = typeof text;
export type BorderColors = typeof border;
export type ShadowColors = typeof shadow;
export type GradientColors = typeof gradient;
export type FormColors = typeof form;
export type ButtonColors = typeof button;
export type DisciplineColors = typeof disciplines;

// Utility function to get discipline status color
export const getDisciplineStatusColor = (disciplineCount: number): string => {
  if (disciplineCount === 0) return disciplines.none;
  if (disciplineCount <= 2) return disciplines.few;
  return disciplines.many;
};

// Utility function to format currency
export const formatCurrency = (amount: number): string => {
  return `₾${amount.toFixed(0)}`;
};

// Utility function to format date
export const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split(".");
  return `${day}.${month}.${year}`;
};

export default colors;
