import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { X } from 'lucide-react';

interface BottomSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  headerAction?: ReactNode;
  children: ReactNode;
  maxWidth?: string; // e.g. 'max-w-lg', 'max-w-2xl', 'max-w-4xl'
  showCloseButton?: boolean;
  className?: string;
  bodyClassName?: string;
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  headerAction,
  children,
  maxWidth = 'max-w-lg',
  showCloseButton = true,
  className = '',
  bodyClassName = '',
}) => {
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragTranslateY, setDragTranslateY] = useState<number>(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only track if touching the drag handle or header area
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    const touch = e.touches[0];
    const diff = touch.clientY - touchStartY;
    // Only allow pulling downwards
    if (diff > 0) {
      setDragTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (dragTranslateY > 80) {
      onClose();
    }
    setTouchStartY(null);
    setDragTranslateY(0);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-xs transition-opacity duration-200 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={sheetRef}
        style={{
          transform: dragTranslateY > 0 ? `translateY(${dragTranslateY}px)` : undefined,
          transition: touchStartY === null ? 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
        }}
        className={`w-full ${maxWidth} bg-[var(--app-card)] border-t sm:border border-[var(--app-border)] rounded-t-3xl sm:rounded-3xl app-overlay-shadow max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 duration-200 ${className}`}
      >
        {/* Mobile Swipe Drag Handle */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="w-full pt-2.5 pb-1 sm:hidden flex flex-col items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
        >
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[var(--app-border)] shrink-0 bg-[var(--app-card)] select-none"
          >
            <div className="flex items-center gap-3 min-w-0">
              {icon && <div className="shrink-0">{icon}</div>}
              <div className="min-w-0">
                {typeof title === 'string' ? (
                  <h3 className="font-bold text-[var(--app-text-primary)] text-sm sm:text-base truncate">
                    {title}
                  </h3>
                ) : (
                  title
                )}
                {subtitle && (
                  <div className="text-[12px] text-[var(--app-text-secondary)] mt-0.5 truncate">
                    {subtitle}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {headerAction}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] hover:bg-[var(--app-card-muted)] transition-colors cursor-pointer"
                  aria-label="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Modal Content Scrollable Area */}
        <div className={`overflow-y-auto overscroll-contain flex-1 p-4 sm:p-6 ${bodyClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
