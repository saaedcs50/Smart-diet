import React, { useState } from 'react';
import { Moon, Smile, Activity, Sparkles, Clock, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { DayLog, PlanConfig } from '../types';
import { getEffectiveSleepHours, parseSleepHours, formatDurationString } from '../utils/calculations';
import { isSectionVisible } from '../utils/storage';
import { HelpButton } from './FeatureHelpModal';

interface SleepMoodTrackerProps {
  plan?: PlanConfig;
  day: DayLog;
  onUpdateDay: (updated: DayLog) => void;
}

export const SleepMoodTracker: React.FC<SleepMoodTrackerProps> = ({ plan, day, onUpdateDay }) => {
  const showSleep = isSectionVisible(plan, 'sleepTracker');
  const showMood = isSectionVisible(plan, 'moodTracker');
  const showExercise = isSectionVisible(plan, 'exerciseTracker');
  const [showTimePicker, setShowTimePicker] = useState(false);

  if (!showSleep && !showMood && !showExercise) {
    return null;
  }

  const currentSleepHours = getEffectiveSleepHours(day);
  const isSleepLogged = currentSleepHours > 0;

  const handleSetSleepHours = (hrs: number) => {
    const rounded = Math.max(0, Math.min(16, Number(hrs.toFixed(1))));
    onUpdateDay({
      ...day,
      sleepHours: rounded,
    });
  };

  const handleAdjustHours = (delta: number) => {
    const base = currentSleepHours > 0 ? currentSleepHours : 7;
    handleSetSleepHours(base + delta);
  };

  const handleSleepTimeChange = (sleepTime: string) => {
    const updated = { ...day, sleep: sleepTime };
    if (sleepTime && updated.wake) {
      const calculated = parseSleepHours(sleepTime, updated.wake);
      updated.sleepHours = calculated;
    }
    onUpdateDay(updated);
  };

  const handleWakeTimeChange = (wakeTime: string) => {
    const updated = { ...day, wake: wakeTime };
    if (updated.sleep && wakeTime) {
      const calculated = parseSleepHours(updated.sleep, wakeTime);
      updated.sleepHours = calculated;
    }
    onUpdateDay(updated);
  };

  const qualities = [
    { label: 'عميق ومريح جداً', emoji: '😴' },
    { label: 'جيد ومستقر', emoji: '😌' },
    { label: 'متقطع بعض الشيء', emoji: '🥱' },
    { label: 'أرق وقلة نوم', emoji: '😫' },
  ];

  const moods = [
    { val: 1, label: 'مرهق / متوتر', emoji: '😫' },
    { val: 2, label: 'طاقة منخفضة', emoji: '😔' },
    { val: 3, label: 'مستقر وعادي', emoji: '😐' },
    { val: 4, label: 'نشيط ومرتاح', emoji: '😊' },
    { val: 5, label: 'طاقة وحماس عالي', emoji: '🤩' },
  ];

  const quickSleepPresets = [5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 10];

  return (
    <div className="bg-white dark:bg-[#2D103E] border border-[#D8C4E9]/80 dark:border-[#542870]/80 rounded-3xl p-5 shadow-sm transition-colors space-y-5">
      {/* 1. Sleep Section */}
      {showSleep && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs ${
                isSleepLogged
                  ? 'bg-[#5B2482]/10 dark:bg-[#5B2482]/25 text-[#5B2482] dark:text-[#D8C4E9]'
                  : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#6F5A7D] dark:text-[#B792D4]'
              }`}>
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-sm">
                    ساعات النوم والاستشفاء
                  </h3>
                  <HelpButton featureId="sleepMood" size="sm" />
                </div>
                <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4]">
                  {isSleepLogged
                    ? `المسجل: ${formatDurationString(currentSleepHours)}`
                    : 'سجل عدد ساعات نومك لحساب نقاط الالتزام'}
                </span>
              </div>
            </div>

            {/* Health status badge based on actual hours */}
            {isSleepLogged ? (
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-xl shrink-0 ${
                  currentSleepHours >= 7 && currentSleepHours <= 9
                    ? 'bg-[#0D9488]/10 text-[#0D9488] dark:bg-[#0D9488]/20 dark:text-[#2DD4BF]'
                    : currentSleepHours >= 6
                    ? 'bg-[#5B2482]/10 text-[#5B2482] dark:bg-[#5B2482]/20 dark:text-[#D8C4E9]'
                    : 'bg-[#E0922D]/10 text-[#E0922D] dark:bg-[#E0922D]/20 dark:text-[#F2C66D]'
                }`}
              >
                {currentSleepHours >= 7 && currentSleepHours <= 9
                  ? 'نوم مثالي ✨'
                  : currentSleepHours >= 6
                  ? 'نوم كافٍ 👍'
                  : 'يحتاج تحسين ⚠️'}
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#6F5A7D] dark:text-[#B792D4]">
                غير مسجل اليوم
              </span>
            )}
          </div>

          {/* Stepper / Direct Hours Selector */}
          <div className="bg-[#F8F7F9] dark:bg-[#3D1B53]/50 p-3.5 rounded-2xl border border-[#D8C4E9]/60 dark:border-[#542870]/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3A124D] dark:text-[#EDE5F5]">
                حدد ساعات النوم الإجمالية:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAdjustHours(-0.5)}
                  className="w-8 h-8 rounded-xl bg-white dark:bg-[#2D103E] border border-[#D8C4E9] dark:border-[#542870] flex items-center justify-center text-[#3A124D] dark:text-[#EDE5F5] hover:bg-[#F1E9F8] cursor-pointer shadow-2xs"
                  title="تقليل نصف ساعة"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="min-w-[80px] text-center">
                  <span className="text-base font-black text-[#5B2482] dark:text-[#D8C4E9]">
                    {isSleepLogged ? `${currentSleepHours} ساعة` : 'حدد الساعات'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdjustHours(0.5)}
                  className="w-8 h-8 rounded-xl bg-white dark:bg-[#2D103E] border border-[#D8C4E9] dark:border-[#542870] flex items-center justify-center text-[#3A124D] dark:text-[#EDE5F5] hover:bg-[#F1E9F8] cursor-pointer shadow-2xs"
                  title="زيادة نصف ساعة"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickSleepPresets.map((hrs) => {
                const isSelected = currentSleepHours === hrs;
                return (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => handleSetSleepHours(hrs)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#5B2482] text-white shadow-xs scale-102'
                        : 'bg-white dark:bg-[#2D103E] text-[#6F5A7D] dark:text-[#B792D4] hover:bg-[#F1E9F8] dark:hover:bg-[#3D1B53] border border-[#D8C4E9]/70 dark:border-[#542870]/70'
                    }`}
                  >
                    {hrs} س
                  </button>
                );
              })}
            </div>

            {/* Optional Bedtime & Wake Time Picker Toggle */}
            <div className="pt-2 border-t border-[#D8C4E9]/50 dark:border-[#542870]/50">
              <button
                type="button"
                onClick={() => setShowTimePicker(!showTimePicker)}
                className="text-[11px] font-bold text-[#5B2482] dark:text-[#D8C4E9] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{showTimePicker ? 'إخفاء تحديد وقت النوم والاستيقاظ' : 'أو حدد وقت النوم والاستيقاظ بالتحديد'}</span>
              </button>

              {showTimePicker && (
                <div className="grid grid-cols-2 gap-2.5 mt-2.5 animate-in fade-in">
                  <div>
                    <label className="block text-[10px] font-bold text-[#6F5A7D] dark:text-[#B792D4] mb-1">
                      وقت النوم:
                    </label>
                    <input
                      type="time"
                      value={day.sleep || ''}
                      onChange={(e) => handleSleepTimeChange(e.target.value)}
                      className="w-full text-xs font-bold p-2 rounded-xl border border-[#D8C4E9] dark:border-[#542870] bg-white dark:bg-[#2D103E] text-[#3A124D] dark:text-[#EDE5F5] outline-none focus:ring-2 focus:ring-[#5B2482]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#6F5A7D] dark:text-[#B792D4] mb-1">
                      وقت الاستيقاظ:
                    </label>
                    <input
                      type="time"
                      value={day.wake || ''}
                      onChange={(e) => handleWakeTimeChange(e.target.value)}
                      className="w-full text-xs font-bold p-2 rounded-xl border border-[#D8C4E9] dark:border-[#542870] bg-white dark:bg-[#2D103E] text-[#3A124D] dark:text-[#EDE5F5] outline-none focus:ring-2 focus:ring-[#5B2482]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sleep Quality Chips */}
          <div>
            <label className="block text-[11px] font-bold text-[#6F5A7D] dark:text-[#B792D4] mb-1.5">
              كيف كانت جودة نومك؟
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {qualities.map((q) => {
                const isSelected = day.quality === q.label;
                return (
                  <button
                    key={q.label}
                    type="button"
                    onClick={() => onUpdateDay({ ...day, quality: isSelected ? '' : q.label })}
                    className={`py-2 px-2 rounded-2xl text-[11px] font-bold border transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#5B2482] text-white border-[#5B2482] shadow-xs scale-102'
                        : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 border-[#D8C4E9]/70 dark:border-[#542870]/70 text-[#3A124D] dark:text-[#EDE5F5] hover:bg-[#F1E9F8]'
                    }`}
                  >
                    <span className="block text-xs mb-0.5">{q.emoji}</span>
                    {q.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. Mood & Energy Section */}
      {showMood && (
        <div className={`space-y-2 ${showSleep ? 'pt-3.5 border-t border-[#D8C4E9]/50 dark:border-[#542870]/50' : ''}`}>
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-bold text-[#3A124D] dark:text-[#EDE5F5]">
              المزاج ومستوى الطاقة اليوم:
            </label>
            {day.mood && (
              <span className="text-[11px] font-bold text-[#0D9488] dark:text-[#2DD4BF]">
                {moods.find((m) => m.val === day.mood)?.label}
              </span>
            )}
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {moods.map((m) => {
              const isSelected = day.mood === m.val;
              return (
                <button
                  key={m.val}
                  type="button"
                  onClick={() => onUpdateDay({ ...day, mood: isSelected ? null : m.val })}
                  className={`py-2 rounded-2xl flex flex-col items-center gap-1 transition-all border cursor-pointer ${
                    isSelected
                      ? 'bg-[#0D9488] text-white border-[#0D9488] shadow-xs scale-105'
                      : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 border-[#D8C4E9]/70 dark:border-[#542870]/70 hover:bg-[#F1E9F8] text-[#3A124D] dark:text-[#EDE5F5]'
                  }`}
                >
                  <span className="text-lg">{m.emoji}</span>
                  <span className="text-[10px] font-bold">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Physical Exercise & Workout */}
      {showExercise && (
        <div className={`space-y-2.5 ${(showSleep || showMood) ? 'pt-3.5 border-t border-[#D8C4E9]/50 dark:border-[#542870]/50' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0D9488]/10 dark:bg-[#0D9488]/20 text-[#0D9488] dark:text-[#2DD4BF] flex items-center justify-center font-bold text-sm">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-[#3A124D] dark:text-[#EDE5F5] text-xs">
                  النشاط البدني والتمارين
                </h4>
                <span className="text-[11px] text-[#6F5A7D] dark:text-[#B792D4]">
                  {day.exercise > 0 ? `حرق تقديري: ~${day.exercise * 7} كالوري` : 'سجل دقائق الرياضة اليوم'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#F8F7F9] dark:bg-[#3D1B53]/60 p-1 rounded-xl border border-[#D8C4E9]/70 dark:border-[#542870]/70">
              <input
                type="number"
                min="0"
                step="5"
                value={day.exercise || 0}
                onChange={(e) => onUpdateDay({ ...day, exercise: Math.max(0, parseInt(e.target.value, 10) || 0) })}
                className="w-14 text-center text-xs font-bold bg-transparent outline-none text-[#3A124D] dark:text-[#EDE5F5]"
              />
              <span className="text-xs font-bold text-[#6F5A7D] dark:text-[#B792D4] pr-1">دقيقة</span>
            </div>
          </div>

          {/* Quick Exercise Preset Buttons */}
          <div className="grid grid-cols-4 gap-1.5">
            {[0, 20, 30, 45].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => onUpdateDay({ ...day, exercise: mins })}
                className={`py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  day.exercise === mins
                    ? 'bg-[#0D9488] text-white shadow-2xs'
                    : 'bg-[#F8F7F9] dark:bg-[#3D1B53]/60 text-[#6F5A7D] dark:text-[#B792D4] hover:bg-[#F1E9F8] dark:hover:bg-[#3D1B53]'
                }`}
              >
                {mins === 0 ? 'راحة / 0 د' : `${mins} دقيقة`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
