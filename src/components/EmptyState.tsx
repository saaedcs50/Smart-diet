import React from 'react';
import { LucideIcon } from 'lucide-react';

type EmptyStateProps = {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

/**
 * Empty state موحد حسب DESIGN_RULES:
 * نص مباشر، بدون إيموجي، بدون ظل، أيقونة monochrome.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`p-5 text-center rounded-xl border border-dashed border-[var(--app-border)] bg-[var(--app-card-muted)] space-y-2 ${className}`}
    >
      {Icon ? (
        <Icon className="w-8 h-8 text-[var(--app-text-secondary)] mx-auto" strokeWidth={1.5} />
      ) : null}
      <p className="text-sm font-bold text-[var(--app-text-primary)]">{title}</p>
      {description ? (
        <p className="text-[12px] text-[var(--app-text-secondary)] max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      ) : null}
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="text-[12px] font-bold text-[var(--app-hero)] hover:underline cursor-pointer pt-1"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};
