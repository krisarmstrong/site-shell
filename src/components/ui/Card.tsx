import type { ReactNode } from 'react';
import type { Theme } from '../../types';
import { themeTokens } from '../../tokens';

interface CardProps {
  children: ReactNode;
  className?: string;
  theme?: Theme;
}

export function Card({ children, className = '', theme = 'dark' }: CardProps) {
  const palette = themeTokens[theme] || themeTokens.dark;
  return (
    <div
      className={`rounded-lg border shadow-lg ${className}`}
      style={{ backgroundColor: palette.surfaceRaised, borderColor: palette.border, color: palette.textPrimary }}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: CardProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
