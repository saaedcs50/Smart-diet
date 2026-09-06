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
      <nav className="pointer-events-auto w-full max-w-md bg-white/95 dark:bg-[#2D103E]/95 backdrop-blur-xl border border-[#D8C4E9]/80 dark:border-[#542870]/80 rounded-3xl shadow-xl p-1.5 transition-colors">
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
                className={`flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-2xl transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-[#F1E9F8] dark:bg-[#3D1B53] text-[#E21B6D] dark:text-[#FF4099] font-bold scale-[1.02] shadow-xs'
                    : 'text-[#6F5A7D] dark:text-[#B792D4] font-medium hover:text-[#3A124D] dark:hover:text-[#EDE5F5] hover:bg-[#F8F7F9] dark:hover:bg-[#3D1B53]/40'
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

