import React, { useState } from 'react';
import { Lock, KeyRound, X } from 'lucide-react';

interface PinModalProps {
  correctPin: string;
  onSuccess: () => void;
  onClose: () => void;
}

export const PinModal: React.FC<PinModalProps> = ({ correctPin, onSuccess, onClose }) => {
  const [enteredPin, setEnteredPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === (correctPin || '1234')) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setEnteredPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
              لوحة تحكم الطبيبة (د. شيماء)
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            أدخل الرقم السري (PIN) للدخول وتعديل الخطة الغذائية والأهداف
          </p>

          <div className="relative">
            <input
              type="password"
              inputMode="numeric"
              maxLength={8}
              placeholder="••••"
              autoFocus
              value={enteredPin}
              onChange={(e) => {
                setError(false);
                setEnteredPin(e.target.value);
              }}
              className={`w-full text-center text-xl font-bold tracking-widest py-3 px-4 rounded-2xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none transition-all ${
                error
                  ? 'border-rose-500 ring-2 ring-rose-500/20'
                  : 'border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500'
              }`}
            />
          </div>

          {error && (
            <p className="text-xs font-bold text-rose-500 text-center animate-shake">
              ⚠️ الرقم السري غير صحيح!
            </p>
          )}

          <button
            type="submit"
            disabled={!enteredPin}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <KeyRound className="w-4 h-4" />
            دخول للوحة التحكم
          </button>

          <p className="text-[11px] text-slate-400 text-center">
            الرمز الافتراضي: 1234 (يمكنك تغييره من الإعدادات)
          </p>
        </form>
      </div>
    </div>
  );
};
