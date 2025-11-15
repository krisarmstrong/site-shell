import type { ReactNode, ElementType } from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface TextElementProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}

const TextElement = ({ as: Component = 'p', className, children, ...props }: TextElementProps) => (
  <Component className={className} {...props}>
    {children}
  </Component>
);

interface HeadingProps {
  children: ReactNode;
  className?: string;
  accentColorClass?: string;
  icon?: ReactNode;
  [key: string]: unknown;
}

const LEADING_CLASS_MAP: Record<'relaxed' | 'normal' | 'loose', string> = {
  relaxed: 'leading-relaxed',
  normal: 'leading-normal',
  loose: 'leading-loose',
};

export function H1({ children, className = '', accentColorClass, icon, ...props }: HeadingProps) {
  const colorClass = accentColorClass || 'text-[color:var(--theme-text-primary,#f1f5f9)]';
  return (
    <TextElement
      as="h1"
      className={`text-3xl sm:text-4xl font-extrabold ${colorClass} mb-6 sm:mb-8 flex items-center gap-2 ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </TextElement>
  );
}

export function H2({ children, className = '', accentColorClass, icon, ...props }: HeadingProps) {
  const colorClass = accentColorClass || 'text-[color:var(--theme-text-primary,#f1f5f9)]';
  return (
    <TextElement
      as="h2"
      className={`text-2xl font-semibold ${colorClass} mb-4 flex items-center gap-2 ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </TextElement>
  );
}

interface SimpleHeadingProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  [key: string]: unknown;
}

export function ArticleTitle({ children, className = '', ...props }: SimpleHeadingProps) {
  return (
    <TextElement
      as='h2'
      className={`text-2xl lg:text-3xl font-bold text-[color:var(--theme-text-primary,#f1f5f9)] mb-3 ${className}`}
      {...props}
    >
      {children}
    </TextElement>
  );
}

export function SubSectionTitle({ children, className = '', icon, ...props }: SimpleHeadingProps) {
  return (
    <TextElement
      as='h3'
      className={`text-xl font-semibold text-[color:var(--theme-text-primary,#f1f5f9)] border-b border-[color:var(--theme-surface-border,#334155)] pb-2 mb-3 flex items-center gap-2 ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </TextElement>
  );
}

export function CardTitle({ children, className = '', ...props }: SimpleHeadingProps) {
  return (
    <TextElement
      as='h3'
      className={`text-lg font-semibold text-[color:var(--theme-text-primary,#f1f5f9)] mb-1 ${className}`}
      {...props}
    >
      {children}
    </TextElement>
  );
}

interface ParagraphProps {
  children: ReactNode;
  className?: string;
  leading?: 'relaxed' | 'normal' | 'loose';
  size?: 'sm' | 'base';
  color?: string;
  as?: ElementType;
  [key: string]: unknown;
}

export function P({
  children,
  className = '',
  leading = 'relaxed',
  size = 'base',
  color = 'text-[color:var(--theme-text-muted,#94a3b8)]',
  as,
  ...props
}: ParagraphProps) {
  const sizeClass = size === 'sm' ? 'text-sm' : 'text-base';
  const leadingClass = LEADING_CLASS_MAP[leading] || LEADING_CLASS_MAP.relaxed;
  return (
    <TextElement
      as={as || 'p'}
      className={`${color} ${sizeClass} ${leadingClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </TextElement>
  );
}

interface SmallTextProps {
  children: ReactNode;
  className?: string;
  color?: string;
  leading?: 'relaxed' | 'normal' | 'loose';
  [key: string]: unknown;
}

export function SmallText({
  children,
  className = '',
  color = 'text-[color:var(--theme-text-muted,#94a3b8)]',
  leading = 'normal',
  ...props
}: SmallTextProps) {
  return (
    <TextElement
      as="p"
      className={`${color} text-sm ${
        LEADING_CLASS_MAP[leading] || LEADING_CLASS_MAP.normal
      } ${className}`.trim()}
      {...props}
    >
      {children}
    </TextElement>
  );
}

interface MutedTextProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

export function MutedText({ children, className = '', ...props }: MutedTextProps) {
  return (
    <TextElement
      as="p"
      className={`text-sm text-[color:var(--theme-text-muted,#94a3b8)] ${className}`}
      {...props}
    >
      {children}
    </TextElement>
  );
}

interface AccentLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  [key: string]: unknown;
}

export function AccentLink({ to, children, className = '', iconLeft, iconRight, ...props }: AccentLinkProps) {
  return (
    <RouterLink
      to={to}
      className={`inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-500 hover:underline transition-colors ${className}`}
      {...props}
    >
      {iconLeft && <span>{iconLeft}</span>}
      {children}
      {iconRight && <span>{iconRight}</span>}
    </RouterLink>
  );
}

interface TagProps {
  children: ReactNode;
  className?: string;
  colorScheme?: 'blue' | 'green' | 'purple' | 'violet' | 'red' | 'yellow' | 'gray';
}

export function Tag({ children, className = '', colorScheme = 'blue' }: TagProps) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-900/50 text-blue-300 border border-blue-700/50',
    green: 'bg-green-900/50 text-green-300 border border-green-700/50',
    purple: 'bg-purple-900/50 text-purple-300 border border-purple-700/50',
    violet: 'bg-violet-900/50 text-violet-300 border border-violet-700/50',
    red: 'bg-red-900/50 text-red-300 border border-red-700/50',
    yellow: 'bg-yellow-900/50 text-yellow-300 border border-yellow-700/50',
    gray: 'bg-gray-700 text-gray-300 border border-gray-600',
  };
  const baseStyles = 'inline-flex items-center text-xs rounded-full font-medium px-2.5 py-0.5';

  return (
    <span className={`${baseStyles} ${colorClasses[colorScheme] || colorClasses.blue} ${className}`}>
      {children}
    </span>
  );
}

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}

export function Badge({ children, className = '', variant = 'default' }: BadgeProps) {
  const variantClasses: Record<string, string> = {
    default: 'bg-blue-600 text-blue-100',
    secondary: 'bg-gray-700 text-gray-100',
    success: 'bg-green-600 text-green-100',
    warning: 'bg-yellow-600 text-yellow-100',
    danger: 'bg-red-600 text-red-100',
    info: 'bg-violet-600 text-violet-100',
  };
  const baseStyles = 'inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full';

  return (
    <span className={`${baseStyles} ${variantClasses[variant] || variantClasses.default} ${className}`}>
      {children}
    </span>
  );
}
