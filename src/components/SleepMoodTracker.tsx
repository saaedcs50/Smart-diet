import React, { useState } from 'react';
import { Moon, Smile, Activity, Sparkles, Clock, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { DayLog, PlanConfig } from '../types';
import { getEffectiveSleepHours, parseSleepHours, formatDurationString } from '../utils/calculations';
import { isSectionVisible } from '../utils/storage';

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
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 shadow-xs transition-colors space-y-5">
      {/* 1. Sleep Section */}
      {showSleep && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs ${
                isSleepLogged
                  ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}>
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                  ساعات النوم والاستشفاء
                </h3>
                <span className="text-[11px] text-slate-400">
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
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : currentSleepHours >= 6
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {currentSleepHours >= 7 && currentSleepHours <= 9
                  ? 'نوم مثالي ✨'
                  : currentSleepHours >= 6
                  ? 'نوم كافٍ 👍'
                  : 'يحتاج تحسين ⚠️'}
              </span>
            ) : (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                غير مسجل اليوم
              </span>
            )}
          </div>

          {/* Stepper / Direct Hours Selector */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                حدد ساعات النوم الإجمالية:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAdjustHours(-0.5)}
                  className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer shadow-2xs"
                  title="تقليل نصف ساعة"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <div className="min-w-[80px] text-center">
                  <span className="text-base font-black text-indigo-600 dark:text-indigo-400">
                    {isSleepLogged ? `${currentSleepHours} ساعة` : 'حدد الساعات'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdjustHours(0.5)}
                  className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer shadow-2xs"
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
                        ? 'bg-indigo-600 text-white shadow-xs scale-102'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
                    }`}
                  >
                    {hrs} س
                  </button>
                );
              })}
            </div>

            {/* Optional Bedtime & Wake Time Picker Toggle */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
              <button
                type="button"
                onClick={() => setShowTimePicker(!showTimePicker)}
                className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{showTimePicker ? 'إخفاء تحديد وقت النوم والاستيقاظ' : 'أو حدد وقت النوم والاستيقاظ بالتحديد'}</span>
              </button>

              {showTimePicker && (
                <div className="grid grid-cols-2 gap-2.5 mt-2.5 animate-in fade-in">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      وقت النوم:
                    </label>
                    <input
                      type="time"
                      value={day.sleep || ''}
                      onChange={(e) => handleSleepTimeChange(e.target.value)}
                      className="w-full text-xs font-bold p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">
                      وقت الاستيقاظ:
                    </label>
                    <input
                      type="time"
                      value={day.wake || ''}
                      onChange={(e) => handleWakeTimeChange(e.target.value)}
                      className="w-full text-xs font-bold p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sleep Quality Chips */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5">
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
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs scale-102'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
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
        <div className={`space-y-2 ${showSleep ? 'pt-3.5 border-t border-slate-100 dark:border-slate-800/80' : ''}`}>
          <div className="flex items-center justify-between">
            <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
              المزاج ومستوى الطاقة اليوم:
            </label>
            {day.mood && (
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
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
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs scale-105'
                      : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-300'
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
        <div className={`space-y-2.5 ${(showSleep || showMood) ? 'pt-3.5 border-t border-slate-100 dark:border-slate-800/80' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs">
                  النشاط البدني والتمارين
                </h4>
                <span className="text-[11px] text-slate-400">
                  {day.exercise > 0 ? `حرق تقديري: ~${day.exercise * 7} كالوري` : 'سجل دقائق الرياضة اليوم'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <input
                type="number"
                min="0"
                step="5"
                value={day.exercise || 0}
                onChange={(e) => onUpdateDay({ ...day, exercise: Math.max(0, parseInt(e.target.value, 10) || 0) })}
                className="w-14 text-center text-xs font-bold bg-transparent outline-none text-slate-800 dark:text-slate-100"
              />
              <span className="text-xs font-bold text-slate-500 pr-1">دقيقة</span>
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
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
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
