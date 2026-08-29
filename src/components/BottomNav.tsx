import React from 'react';
import { ClipboardList, Ruler, BarChart3 } from 'lucide-react';
import { ActiveTab, PlanConfig } from '../types';
import { isSectionVisible } from '../utils/storage';

interface BottomNavProps {
  plan?: PlanConfig;
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ plan, activeTab, onChangeTab }) => {
  const showBody = isSectionVisible(plan, 'bodyTab');
  const showReports = isSectionVisible(plan, 'reportsTab');

  const allNavItems: { id: ActiveTab; label: string; icon: React.ReactNode; show: boolean }[] = [
    {
      id: 'today',
      label: 'اليوميات',
      icon: <ClipboardList className="w-5 h-5" />,
      show: true,
    },
    {
      id: 'body',
      label: 'الجسم والقياسات',
      icon: <Ruler className="w-5 h-5" />,
      show: showBody,
    },
    {
      id: 'reports',
      label: 'التقارير والإحصاء',
      icon: <BarChart3 className="w-5 h-5" />,
      show: showReports,
    },
  ];

  const visibleItems = allNavItems.filter((i) => i.show);

  // If only 1 tab is visible, don't show navigation bar
  if (visibleItems.length <= 1) {
    return null;
  }

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center">
      <nav className="pointer-events-auto w-full max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 rounded-3xl shadow-xl p-1.5 transition-colors">
        <div 
          className="grid h-14 items-center"
          style={{ gridTemplateColumns: `repeat(${visibleItems.length}, minmax(0, 1fr))` }}
        >
          {visibleItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeTab(item.id)}
                className={`flex flex-col items-center justify-center gap-1 py-1 px-2 rounded-2xl transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-black scale-102'
                    : 'text-slate-500 dark:text-slate-400 font-bold hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                {item.icon}
                <span className="text-[11px] leading-none tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
