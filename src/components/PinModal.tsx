import React, { useState } from 'react';
import { brandCopy } from '../config/brand';
import { BrandLogo } from './BrandLogo';
import { BottomSheetModal } from './BottomSheetModal';

interface PinModalProps {
  /** @deprecated لم يعد يُقارن محليًا: التحقق عبر السيرفر من الأب */
  correctPin?: string;
  onSuccess: (pin: string) => void | boolean | Promise<void | boolean | string>;
  onClose: () => void;
}

export const PinModal: React.FC<PinModalProps> = ({ onSuccess, onClose }) => {
  const [enteredPin, setEnteredPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredPin.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const result = await onSuccess(enteredPin.trim());
      if (result === false) {
        setError(brandCopy.pinWrong);
        setEnteredPin('');
      } else if (typeof result === 'string' && result) {
        setError(result);
        setEnteredPin('');
      }
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : brandCopy.pinWrong);
      setEnteredPin('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BottomSheetModal
      isOpen={true}
      onClose={onClose}
      maxWidth="max-w-sm"
      icon={<BrandLogo size={32} rounded="rounded-xl" />}
      title={brandCopy.coachPanelNamed}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        <p className="text-xs text-[var(--app-text-secondary)] text-center">
          أدخل الرقم السري (PIN) للدخول وتعديل الخطة الغذائية والأهداف
        </p>
        <input
          type="password"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={8}
          value={enteredPin}
          onChange={(e) => setEnteredPin(e.target.value)}
          className="w-full text-center text-lg tracking-[0.35em] font-bold min-h-[48px] p-3 rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] text-[var(--app-text-primary)] focus:outline-hidden focus:ring-2 focus:ring-[var(--app-hero)]"
          placeholder="•••••"
          autoFocus
        />
        {error && (
          <p className="text-xs text-rose-600 dark:text-rose-400 text-center font-bold leading-relaxed">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting || !enteredPin.trim()}
          className="w-full min-h-[44px] rounded-2xl bg-[var(--app-hero)] hover:bg-[var(--app-hero-hover)] disabled:opacity-50 text-white text-sm font-black cursor-pointer transition-all"
        >
          {submitting ? 'جاري التحقق...' : 'دخول'}
        </button>
      </form>
    </BottomSheetModal>
  );
};
