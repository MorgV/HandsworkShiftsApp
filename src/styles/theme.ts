// src/styles/theme.ts
export const colors = {
  primary: '#4A90E2',
  textPrimary: '#000',
  textSecondary: '#555',
  textMuted: '#777',
  background: '#fff',
  error: 'red',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
};

export const typography = {
  title: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.textPrimary,
  },
  body: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: colors.primary,
  },
  error: {
    fontSize: 16,
    color: colors.error,
  },
};
