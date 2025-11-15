import type { LucideIcon } from 'lucide-react';
import type { Theme } from '../types';
import { themeTokens } from '../tokens';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  theme?: Theme;
}

export function PageHeader({ icon: Icon, title, description, className = '', theme = 'dark' }: PageHeaderProps) {
  const palette = themeTokens[theme] || themeTokens.dark;
  return (
    <div className={`mb-8 transition duration-300 ease-out ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg shadow-lg ring-2 ring-violet-500/30">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold"
          style={{ color: palette.textPrimary }}
        >
          {title}
        </h1>
      </div>
      <p
        className="text-sm sm:text-base ml-[60px]"
        style={{ color: palette.textMuted }}
      >
        {description}
      </p>
    </div>
  );
}
