import React from 'react';
import { Flame, Snowflake, Trophy, Sparkles, AlertCircle, Share2, Image as ImageIcon } from 'lucide-react';
import { ScoreBreakdown, countFreezeDaysInMonth } from '../utils/calculations';
import { PlanConfig } from '../types';

interface ScoreCardProps {
  score: ScoreBreakdown;
  streak: number;
  isFreeze: boolean;
  currentDate: string;
  plan: PlanConfig;
  onToggleFreeze: () => void;
  onOpenReportModal: () => void;
  onOpenStoryCard: () => void;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  score,
  streak,
  isFreeze,
  currentDate,
  plan,
  onToggleFreeze,
  onOpenReportModal,
  onOpenStoryCard,
}) => {
  const freezeLimit = plan.freezeDaysPerMonth ?? 2;
  const usedFreezes = countFreezeDaysInMonth(currentDate);
  const remainingFreezes = Math.max(0, freezeLimit - usedFreezes);

  // Feedback based on score
  let feedbackText = 'سجل التزامك بالوجبات والعادات المقررة اليوم.';
  let feedbackColor = 'text-slate-500 dark:text-slate-400';
  let badgeEmoji = '📋';

  if (isFreeze) {
    feedbackText = 'يوم راحة مسجل (Free Day).';
    feedbackColor = 'text-cyan-600 dark:text-cyan-400';
    badgeEmoji = '❄️';
  } else if (score.total >= 90) {
    feedbackText = 'أداء متميز والتزام كامل بالخطة الصحية!';
    feedbackColor = 'text-emerald-600 dark:text-emerald-400';
    badgeEmoji = '👑';
  } else if (score.total >= 75) {
    feedbackText = 'معدل التزام رائع جداً، استمر!';
    feedbackColor = 'text-emerald-600 dark:text-emerald-400';
    badgeEmoji = '🎯';
  } else if (score.total >= 50) {
    feedbackText = 'معدل التزام جيد، استكمل باقي الأهداف اليوم.';
    feedbackColor = 'text-amber-600 dark:text-amber-400';
    badgeEmoji = '📊';
  } else if (score.total > 0) {
    feedbackText = 'بداية جيدة، تابع تسجيل الوجبات والماء.';
    feedbackColor = 'text-rose-500 dark:text-rose-400';
    badgeEmoji = '📌';
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs transition-colors space-y-5">
      {/* Top Banner with Score and Streak */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Circular Score display & Feedback */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`transition-all duration-700 ${
                  isFreeze
                    ? 'text-cyan-500'
                    : score.total >= 75
                    ? 'text-emerald-500'
                    : score.total >= 50
                    ? 'text-amber-500'
                    : 'text-rose-500'
                }`}
                strokeDasharray={`${score.total}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                {score.total}%
              </span>
              <span className="text-[9px] text-slate-400 font-bold">الالتزام</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">{badgeEmoji}</span>
              <h2 className="font-black text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                معدل الالتزام اليومي
              </h2>
            </div>
            <p className={`text-xs sm:text-sm font-bold mt-0.5 ${feedbackColor}`}>
              {feedbackText}
            </p>
          </div>
        </div>

        {/* Streak & Freeze Controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          {streak >= 1 && (
            <div className="px-3 py-1.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs font-black flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              <span>{streak} {streak === 1 ? 'يوم' : streak === 2 ? 'يومان' : 'أيام'} متتالية</span>
            </div>
          )}

          <button
            onClick={onToggleFreeze}
            className={`px-3 py-1.5 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
              isFreeze
                ? 'bg-cyan-500 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5" />
            <span>{isFreeze ? 'إلغاء يوم الراحة' : `يوم راحة (${remainingFreezes} متبقي)`}</span>
          </button>
        </div>
      </div>

      {/* Breakdown mini-progress */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold block mb-1">🍽️ وجبات الخطة</span>
          <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100">
            {score.meals} / {plan.scoreWeights.meals}
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold block mb-1">💧 شرب الماء</span>
          <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100">
            {score.water} / {plan.scoreWeights.water}
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold block mb-1">✅ العادات والمكملات</span>
          <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100">
            {score.checklist} / {plan.scoreWeights.checklist}
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl text-center border border-slate-100 dark:border-slate-800">
          <span className="text-[11px] text-slate-400 font-bold block mb-1">😴 النوم والنشاط</span>
          <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-slate-100">
            {score.sleep} / {plan.scoreWeights.sleep}
          </span>
        </div>
      </div>

      {/* Share Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={onOpenReportModal}
          className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>إرسال تقرير اليوم لـ د. شيماء (واتساب) 📤</span>
        </button>

        <button
          onClick={onOpenStoryCard}
          className="w-full py-3 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 cursor-pointer"
        >
          <ImageIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>تصدير بطاقة تقرير (صورة) 📸</span>
        </button>
      </div>
    </div>
  );
};
