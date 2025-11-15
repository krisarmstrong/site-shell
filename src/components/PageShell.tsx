import type { ReactNode } from 'react';
import type { BreadcrumbItem, Theme } from '../types';
import { Breadcrumbs } from './Breadcrumbs';
import { layoutTokens, themeTokens } from '../tokens';

interface PageShellProps {
  breadcrumbs?: BreadcrumbItem[];
  children: ReactNode;
  skipLinkLabel?: string;
  skipLinkTarget?: string;
  className?: string;
  theme?: Theme;
}

export function PageShell({
  breadcrumbs,
  children,
  skipLinkLabel = 'Skip to content',
  skipLinkTarget = '#main-content',
  className = '',
  theme = 'dark',
}: PageShellProps) {
  const palette = themeTokens[theme] || themeTokens.dark;
  return (
    <div
      className={`flex min-h-screen flex-col transition-colors duration-200 ${className}`}
      style={{ backgroundColor: palette.surfaceBase, color: palette.textPrimary }}
    >
      <a
        href={skipLinkTarget}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:px-4 focus:py-2 focus:shadow-lg"
        style={{ backgroundColor: palette.accent, color: '#fff' }}
      >
        {skipLinkLabel}
      </a>
      <main
        id={skipLinkTarget.replace('#', '')}
        className="flex-grow px-4 py-8 sm:px-6 lg:px-8"
        style={{ maxWidth: layoutTokens.contentMaxWidth, width: '100%', margin: '0 auto' }}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} className="mb-6" theme={theme} />
        )}
        {children}
      </main>
    </div>
  );
}
