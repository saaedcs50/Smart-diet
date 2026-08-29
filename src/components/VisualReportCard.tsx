import React, { useRef, useEffect, useState } from 'react';
import { Download, Share2, Sparkles, X, Check } from 'lucide-react';
import { DayLog, PlanConfig } from '../types';
import { calculateDayScore, calculateStreak, calculateEffectiveWaterGoal } from '../utils/calculations';

interface VisualReportCardProps {
  plan: PlanConfig;
  day: DayLog;
  currentDate: string;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

export const VisualReportCard: React.FC<VisualReportCardProps> = ({
  plan,
  day,
  currentDate,
  onClose,
  onNotify,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageGenerated, setImageGenerated] = useState<string | null>(null);

  const score = calculateDayScore(plan, day).total;
  const streak = calculateStreak(currentDate, plan);
  const waterGoal = calculateEffectiveWaterGoal(plan, day);

  useEffect(() => {
    generateCard();
  }, [plan, day, currentDate]);

  const generateCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1080;
    const height = 1350; // Instagram Story / Portrait ratio
    canvas.width = width;
    canvas.height = height;

    // 1. Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#064e3b'); // dark emerald
    bgGrad.addColorStop(0.5, '#0f172a'); // slate dark
    bgGrad.addColorStop(1, '#022c22'); // deep forest
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative shapes
    ctx.save();
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.15, 260, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width * 0.15, height * 0.85, 300, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(20, 184, 166, 0.08)';
    ctx.fill();
    ctx.restore();

    // 2. Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 36px "Cairo", system-ui, sans-serif';
    ctx.fillText('🥗 Smart Diet - Dr. Shimaa', width / 2, 110);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px "Cairo", system-ui, sans-serif';
    ctx.fillText(plan.clientName || 'المتدرب', width / 2, 195);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 32px "Cairo", system-ui, sans-serif';
    ctx.fillText(`📅 يوميات وتطور: ${currentDate}`, width / 2, 255);

    // 3. Central Big Score Circle
    const circleX = width / 2;
    const circleY = 460;
    const circleR = 140;

    ctx.beginPath();
    ctx.arc(circleX, circleY, circleR, 0, Math.PI * 2);
    ctx.lineWidth = 20;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.stroke();

    ctx.beginPath();
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * (score / 100));
    ctx.arc(circleX, circleY, circleR, startAngle, endAngle);
    ctx.lineWidth = 20;
    ctx.strokeStyle = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 90px "Cairo", system-ui, sans-serif';
    ctx.fillText(`${score}%`, circleX, circleY + 25);

    ctx.fillStyle = '#a7f3d0';
    ctx.font = 'bold 30px "Cairo", system-ui, sans-serif';
    ctx.fillText(day.isFreeze ? 'يوم فري ❄️' : score >= 80 ? 'أداء أسطوري 🔥' : 'يوم حلو وملتزم 👍', circleX, circleY + 70);

    // 4. Metrics Grid Box (Weight, Water, Sleep, Habits)
    const boxY = 680;
    const boxH = 360;
    const boxW = width - 160;
    const boxX = 80;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 40);
    ctx.fill();
    ctx.stroke();

    // 4 Key Stats inside box
    // Stat 1: Weight
    const col1X = boxX + boxW * 0.25;
    const col2X = boxX + boxW * 0.75;
    const row1Y = boxY + 100;
    const row2Y = boxY + 250;

    // Weight
    ctx.fillStyle = '#94a3b8';
    ctx.font = '30px "Cairo", system-ui';
    ctx.fillText('⚖️ الوزن المسجل', col1X, row1Y - 30);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 46px "Cairo", system-ui';
    ctx.fillText(day.weight ? `${day.weight} كجم` : '—', col1X, row1Y + 25);

    // Streak
    ctx.fillStyle = '#94a3b8';
    ctx.font = '30px "Cairo", system-ui';
    ctx.fillText('🔥 سلسلة الالتزام', col2X, row1Y - 30);
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 46px "Cairo", system-ui';
    ctx.fillText(`${streak} أيام ورا بعض`, col2X, row1Y + 25);

    // Water
    ctx.fillStyle = '#94a3b8';
    ctx.font = '30px "Cairo", system-ui';
    ctx.fillText('💧 شرب المية', col1X, row2Y - 30);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 46px "Cairo", system-ui';
    ctx.fillText(`${day.water} / ${waterGoal} مل`, col1X, row2Y + 25);

    // Meals
    const committedMeals = plan.meals.filter((m) => day.meals[m.id]?.eval === 'yes').length;
    ctx.fillStyle = '#94a3b8';
    ctx.font = '30px "Cairo", system-ui';
    ctx.fillText('🍽️ الوجبات الملتزمة', col2X, row2Y - 30);
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 46px "Cairo", system-ui';
    ctx.fillText(`${committedMeals} من ${plan.meals.length} وجبات`, col2X, row2Y + 25);

    // 5. Motivational Quote Footer
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'italic 500 32px "Cairo", system-ui';
    ctx.fillText('"الاستمرارية مش معناها المثالية، الاستمرارية إنك متوقفش!" 💪', width / 2, 1140);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '500 24px "Cairo", system-ui';
    ctx.fillText('🔒 بياناتك وخصوصيتك محفوظة محلياً 100% بدون سحابة', width / 2, 1240);

    const dataUrl = canvas.toDataURL('image/png');
    setImageGenerated(dataUrl);
  };

  const handleDownload = () => {
    if (!imageGenerated) return;
    const a = document.createElement('a');
    a.href = imageGenerated;
    a.download = `فورمة_${plan.clientName || 'كارت'}_${currentDate}.png`;
    a.click();
    onNotify('تم تنزيل كارت اليوم كصورة بجودة عالية 📸');
  };

  const handleShareNative = () => {
    if (!imageGenerated) return;
    if (navigator.share) {
      fetch(imageGenerated)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], `تقرير_${currentDate}.png`, { type: 'image/png' });
          navigator.share({
            title: `إنجاز اليوم - ${plan.clientName}`,
            files: [file],
          }).then(() => onNotify('تمت المشاركة بنجاح!'));
        })
        .catch(() => handleDownload());
    } else {
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                كارت إنجاز اليوم كصورة ستوري 📸
              </h3>
              <p className="text-[11px] text-slate-400">جاهز للمشاركة على ستوري الواتساب أو انستجرام</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden Canvas */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Preview image */}
        <div className="flex-1 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 flex items-center justify-center my-auto max-h-[380px]">
          {imageGenerated ? (
            <img
              src={imageGenerated}
              alt="كارت اليوم"
              className="h-full w-auto object-contain"
            />
          ) : (
            <span className="text-xs text-slate-400">جاري تصميم الكارت...</span>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 mt-4 pt-2">
          <button
            onClick={handleDownload}
            className="py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            تنزيل الصورة 💾
          </button>

          <button
            onClick={handleShareNative}
            className="py-2.5 px-3 rounded-2xl bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            مشاركة ستوري 📤
          </button>
        </div>
      </div>
    </div>
  );
};
