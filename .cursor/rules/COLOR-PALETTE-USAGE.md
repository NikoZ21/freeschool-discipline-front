# Color Palette Usage Guide

This document explains how to use the centralized color palette in your Free School Discipline application.

## Files Created

1. **`color-palette.json`** - JSON configuration file with all colors
2. **`src/theme/colors.ts`** - TypeScript/JavaScript file for easy imports
3. **`COLOR-PALETTE-USAGE.md`** - This usage guide

## How to Use

### In React Components (TypeScript/JavaScript)

Import the colors you need from the theme file:

```typescript
// Import the entire color palette
import { colors } from "../theme/colors";

// Or import specific color groups
import { primary, text, background, status } from "../theme/colors";

// Or import utility functions
import { getDisciplineStatusColor, formatCurrency } from "../theme/colors";
```

### Example Usage in Components

#### Basic Color Usage

```typescript
// Instead of hardcoded colors
const buttonStyle = {
  backgroundColor: "#3b82f6", // ❌ Don't do this
  color: "#ffffff",
};

// Use semantic color names
const buttonStyle = {
  backgroundColor: primary.blue, // ✅ Better
  color: text.white,
};
```

#### In CSS-in-JS or Styled Components

```typescript
import styled from "styled-components";
import { primary, text, shadow } from "../theme/colors";

const StyledButton = styled.button`
  background-color: ${primary.blue};
  color: ${text.white};
  box-shadow: ${shadow.button};

  &:hover {
    background-color: ${primary.blueHover};
    box-shadow: ${shadow.buttonHover};
  }
`;
```

#### In CSS Files

For CSS files, you can use CSS custom properties. First, create a CSS file that exports the colors:

```css
/* src/theme/colors.css */
:root {
  /* Primary Colors */
  --color-primary-blue: #3b82f6;
  --color-primary-blue-hover: #2563eb;
  --color-primary-blue-light: #1d4ed8;
  --color-primary-blue-focus: rgba(59, 130, 246, 0.1);

  /* Text Colors */
  --color-text-primary: #374151;
  --color-text-secondary: #6b7280;
  --color-text-white: #ffffff;

  /* Background Colors */
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8f9fa;
  --color-bg-hover: #e0f2fe;

  /* Add more colors as needed */
}

/* Usage in your CSS */
.my-button {
  background-color: var(--color-primary-blue);
  color: var(--color-text-white);
}

.my-button:hover {
  background-color: var(--color-primary-blue-hover);
}
```

## Color Categories

### Primary Colors

- `primary.blue` - Main brand color
- `primary.blueHover` - Hover state for primary elements
- `primary.blueLight` - Lighter variant
- `primary.blueFocus` - Focus ring color (with transparency)

### Status Colors

- `status.success` - Success states (green)
- `status.warning` - Warning states (orange)
- `status.error` - Error states (red)
- `status.paid` / `status.unpaid` - Payment status indicators

### Text Colors

- `text.primary` - Main text color
- `text.secondary` - Secondary text color
- `text.tertiary` - Muted text color
- `text.white` - White text for dark backgrounds

### Background Colors

- `background.primary` - Main background (white)
- `background.secondary` - Page background
- `background.hover` - Hover states
- `background.selected` - Selected states

### Form Colors

- `form.inputBg` - Input background
- `form.inputBorder` - Input borders
- `form.inputBorderFocus` - Focused input borders

### Utility Functions

#### Discipline Status Colors

```typescript
import { getDisciplineStatusColor } from "../theme/colors";

// Usage in component
const disciplineColor = getDisciplineStatusColor(student.disciplines.length);

// Usage in style
<span style={{ backgroundColor: getDisciplineStatusColor(disciplineCount) }}>
  {disciplineCount}
</span>;
```

#### Currency Formatting

```typescript
import { formatCurrency } from "../theme/colors";

const formattedAmount = formatCurrency(1500); // "₾1500"
```

#### Date Formatting

```typescript
import { formatDate } from "../theme/colors";

const formattedDate = formatDate("2023.12.25"); // "25.12.2023"
```

## Migration Guide

### Step 1: Replace Hardcoded Colors

Find and replace hardcoded hex colors with semantic color names:

```typescript
// Before
backgroundColor: "#3b82f6";
color: "#374151";

// After
backgroundColor: primary.blue;
color: text.primary;
```

### Step 2: Update CSS Files

Replace hardcoded colors in CSS files with CSS custom properties or import the theme colors.

### Step 3: Use Utility Functions

Replace inline utility functions with the centralized ones:

```typescript
// Before
const getDisciplineStatusColor = (disciplineCount: number) => {
  if (disciplineCount === 0) return "#4caf50";
  if (disciplineCount <= 2) return "#ff9800";
  return "#f44336";
};

// After
import { getDisciplineStatusColor } from "../theme/colors";
```

## Best Practices

1. **Always use semantic names** instead of color values
2. **Import only what you need** to keep bundle size small
3. **Use the utility functions** for consistent formatting
4. **Group related colors** when importing
5. **Update this palette** when adding new colors to maintain consistency

## Example Component Migration

### Before (StudentsTable.tsx)

```typescript
const getDisciplineStatusColor = (disciplineCount: number) => {
  if (disciplineCount === 0) return "#4caf50";
  if (disciplineCount <= 2) return "#ff9800";
  return "#f44336";
};

// Inline styles with hardcoded colors
<span
  style={{
    backgroundColor: getDisciplineStatusColor(student.disciplines.length),
    color: "#ffffff",
  }}
>
  {student.disciplines.length}
</span>;
```

### After (StudentsTable.tsx)

```typescript
import { getDisciplineStatusColor, text } from "../theme/colors";

// Clean usage with semantic colors
<span
  style={{
    backgroundColor: getDisciplineStatusColor(student.disciplines.length),
    color: text.white,
  }}
>
  {student.disciplines.length}
</span>;
```

## Adding New Colors

When you need to add new colors:

1. Add them to both `color-palette.json` and `src/theme/colors.ts`
2. Use semantic names that describe their purpose, not their appearance
3. Group them in the appropriate category
4. Update this documentation

Example:

```typescript
// Good naming
accent: '#ff6b35',        // ✅ Semantic
buttonDanger: '#dc2626',  // ✅ Purpose-based

// Bad naming
orange: '#ff6b35',        // ❌ Appearance-based
color1: '#dc2626',        // ❌ Non-descriptive
```

This color palette system will help maintain visual consistency across your entire application and make it easier to implement design changes in the future.
