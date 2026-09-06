import React from 'react';
import { Flame, Snowflake, Trophy, Sparkles, AlertCircle, Share2, Image as ImageIcon } from 'lucide-react';
import { ScoreBreakdown, countFreezeDaysInMonth } from '../utils/calculations';
import { PlanConfig } from '../types';
import { HelpButton } from './FeatureHelpModal';

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
  let feedbackColor = 'text-[#6F5A7D] dark:text-[#B792D4]';
  let badgeEmoji = '📋';

  if (isFreeze) {
    feedbackText = 'يوم راحة مسجل (Free Day).';
    feedbackColor = 'text-[#0284C7] dark:text-[#38BDF8]';
    badgeEmoji = '❄️';
  } else if (score.total >= 90) {
    feedbackText = 'أداء متميز والتزام كامل بالخطة الصحية!';
    feedbackColor = 'text-[#0D9488] dark:text-[#2DD4BF]';
    badgeEmoji = '👑';
  } else if (score.total >= 75) {
    feedbackText = 'معدل التزام رائع جداً، استمر!';
    feedbackColor = 'text-[#0D9488] dark:text-[#2DD4BF]';
    badgeEmoji = '🎯';
  } else if (score.total >= 50) {
    feedbackText = 'معدل التزام جيد، استكمل باقي الأهداف اليوم.';
    feedbackColor = 'text-[#E0922D] dark:text-[#F2C66D]';
    badgeEmoji = '📊';
  } else if (score.total > 0) {
    feedbackText = 'بداية جيدة، تابع تسجيل الوجبات والماء.';
    feedbackColor = 'text-[#E21B6D] dark:text-[#FF4099]';
    badgeEmoji = '📌';
  }

  return (
    <div className="bg-white dark:bg-[#2D103E] border border-[#D8C4E9]/80 dark:border-[#542870]/80 rounded-3xl p-5 sm:p-6 shadow-sm transition-colors space-y-5">
      {/* Top Banner with Score and Streak */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Circular Score display & Feedback */}
        <div className="flex items-center gap-4">
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#F1E9F8] dark:text-[#3D1B53]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={`transition-all duration-700 ${
                  isFreeze
                    ? 'text-[#0284C7]'
                    : score.total >= 75
                    ? 'text-[#0D9488]'
                    : score.total >= 50
                    ? 'text-[#E0922D]'
                    : 'text-[#E21B6D]'
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
              <span className="text-lg sm:text-xl font-black text-[#3A124D] dark:text-[#EDE5F5] leading-none">
                {score.total}%
              </span>
              <span className="text-[9px] text-[#6F5A7D] dark:text-[#B792D4] font-bold mt-0.5">الالتزام</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base">{badgeEmoji}</span>
              <h2 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-sm sm:text-base">
                معدل الالتزام اليومي
              </h2>
              <HelpButton featureId="scoreCard" size="sm" />
            </div>
            <p className={`text-xs sm:text-sm font-semibold mt-0.5 ${feedbackColor}`}>
              {feedbackText}
            </p>
          </div>
        </div>

        {/* Streak & Freeze Controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          {streak >= 1 && (
            <div className="px-3 py-1.5 rounded-2xl bg-[#E0922D]/10 dark:bg-[#E0922D]/20 border border-[#E0922D]/30 dark:border-[#E0922D]/40 text-[#E0922D] dark:text-[#F2C66D] text-xs font-bold flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-[#E0922D] text-[#E0922D] dark:fill-[#F2C66D] dark:text-[#F2C66D]" />
              <span>{streak} {streak === 1 ? 'يوم' : streak === 2 ? 'يومان' : 'أيام'} متتالية</span>
            </div>
          )}

          <button
            onClick={onToggleFreeze}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isFreeze
                ? 'bg-[#0284C7] text-white shadow-xs'
                : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#3A124D] dark:text-[#EDE5F5] hover:bg-[#F1E9F8] dark:hover:bg-[#3D1B53] border border-[#D8C4E9]/70 dark:border-[#542870]/70'
            }`}
          >
            <Snowflake className="w-3.5 h-3.5" />
            <span>{isFreeze ? 'إلغاء يوم الراحة' : `يوم راحة (${remainingFreezes} متبقي)`}</span>
          </button>
        </div>
      </div>

      {/* Breakdown mini-progress */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 border-t border-[#D8C4E9]/50 dark:border-[#542870]/50">
        <div className="bg-[#F8F7F9] dark:bg-[#3D1B53]/50 p-3 rounded-2xl text-center border border-[#D8C4E9]/40 dark:border-[#542870]/40">
          <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4] font-medium block mb-1">🍽️ وجبات الخطة</span>
          <span className="text-xs sm:text-sm font-bold text-[#3A124D] dark:text-[#EDE5F5]">
            {score.meals} / {plan.scoreWeights.meals}
          </span>
        </div>

        <div className="bg-[#F8F7F9] dark:bg-[#3D1B53]/50 p-3 rounded-2xl text-center border border-[#D8C4E9]/40 dark:border-[#542870]/40">
          <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4] font-medium block mb-1">💧 شرب الماء</span>
          <span className="text-xs sm:text-sm font-bold text-[#3A124D] dark:text-[#EDE5F5]">
            {score.water} / {plan.scoreWeights.water}
          </span>
        </div>

        <div className="bg-[#F8F7F9] dark:bg-[#3D1B53]/50 p-3 rounded-2xl text-center border border-[#D8C4E9]/40 dark:border-[#542870]/40">
          <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4] font-medium block mb-1">✅ العادات والمكملات</span>
          <span className="text-xs sm:text-sm font-bold text-[#3A124D] dark:text-[#EDE5F5]">
            {score.checklist} / {plan.scoreWeights.checklist}
          </span>
        </div>

        <div className="bg-[#F8F7F9] dark:bg-[#3D1B53]/50 p-3 rounded-2xl text-center border border-[#D8C4E9]/40 dark:border-[#542870]/40">
          <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4] font-medium block mb-1">😴 النوم والنشاط</span>
          <span className="text-xs sm:text-sm font-bold text-[#3A124D] dark:text-[#EDE5F5]">
            {score.sleep} / {plan.scoreWeights.sleep}
          </span>
        </div>
      </div>

      {/* Share Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <button
          onClick={onOpenReportModal}
          className="w-full py-3 px-4 rounded-2xl bg-[#E21B6D] hover:bg-[#C2135B] text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>إرسال تقرير اليوم لـ د. شيماء (واتساب) 📤</span>
        </button>

        <button
          onClick={onOpenStoryCard}
          className="w-full py-3 px-4 rounded-2xl bg-[#F8F7F9] dark:bg-[#3D1B53]/60 hover:bg-[#F1E9F8] dark:hover:bg-[#3D1B53] text-[#3A124D] dark:text-[#EDE5F5] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border border-[#D8C4E9]/70 dark:border-[#542870]/70 cursor-pointer"
        >
          <ImageIcon className="w-4 h-4 text-[#E21B6D] dark:text-[#FF4099]" />
          <span>تصدير بطاقة تقرير (صورة) 📸</span>
        </button>
      </div>
    </div>
  );
};

