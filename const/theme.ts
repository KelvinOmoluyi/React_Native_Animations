/**
 * Design System Constants
 * This file contains the shared theme tokens for the project.
 * Recruiter Tip: Centralizing theme tokens makes the app easily skinnable and maintainable.
 */

export const COLORS = {
  // Brand Colors
  primary: '#6C5CE7',
  secondary: '#00B894',
  accent: '#FD79A8',
  
  // Neutral Colors
  background: '#1A1A2E',
  surface: 'rgba(255, 255, 255, 0.1)',
  text: '#FFFFFF',
  textSecondary: '#B6B6B6',
  border: '#96AE8CFF',
  
  // Glassmorphism Defaults
  glassGradient: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)'] as [string, string, ...string[]],
  darkGlass: ['#898d99', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#43423d', '#898d99'] as [string, string, ...string[]],
  
  // Status Colors
  success: '#00B894',
  warning: '#FDCB6E',
  error: '#E17055',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 30,
  round: 9999,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 40,
    fontWeight: '500' as const,
    color: COLORS.text,
  },
  h2: {
    fontSize: 32,
    fontWeight: '600' as const,
    color: COLORS.text,
  },
  title: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: COLORS.text,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    color: COLORS.text,
  },
  caption: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
};

/**
 * Common Animation Configurations
 */
export const ANIMATION_CONFIGS = {
  spring: {
    damping: 18,
    stiffness: 200,
    mass: 0.8,
  },
  timing: {
    duration: 300,
  },
};
