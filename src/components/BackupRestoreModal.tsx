import React, { useState, useMemo } from 'react';
import { BRAND } from '../config/brand';
import {
  Download,
  Upload,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  AlertTriangle,
  Archive,
  Calendar,
  User,
  ShieldCheck,
  ClipboardPaste,
} from 'lucide-react';
import { PlanConfig } from '../types';
import { extractPlanFromText } from '../utils/planShare';
import {
  exportFullBackupJSON,
  importFullBackupJSON,
  downloadJsonFile,
  getBackupSummary,
} from '../utils/storage';
import { BottomSheetModal } from './BottomSheetModal';

interface BackupRestoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (msg: string) => void;
  onImportPlan?: (imported: Partial<PlanConfig>) => void;
  onFullBackupRestored?: () => void;
  defaultTab?: 'export' | 'import' | 'text';
}

export const BackupRestoreModal: React.FC<BackupRestoreModalProps> = ({
  isOpen,
  onClose,
  onNotify,
  onImportPlan,
  onFullBackupRestored,
  defaultTab = 'export',
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'text'>(defaultTab);
  const [copied, setCopied] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [pendingBackupData, setPendingBackupData] = useState<{
    rawJson: string;
    clientName: string;
    dayCount: number;
    exportedAt: string;
  } | null>(null);

  const backupSummary = useMemo(() => {
    return getBackupSummary();
  }, [isOpen]);

  // Detected plan from text tab
  const detectedPlan = useMemo(() => {
    if (!pasteText.trim()) return null;
    return extractPlanFromText(pasteText);
  }, [pasteText]);

  const handleExportDownload = () => {
    const jsonStr = exportFullBackupJSON();
    const dateStr = new Date().toISOString().split('T')[0];
    const filename = `nutrition-backup-${backupSummary.clientName.replace(/\s+/g, '_')}-${dateStr}.json`;
    downloadJsonFile(filename, jsonStr);
    onNotify('تم تنزيل ملف النسخة الاحتياطية بنجاح 💾');
  };

  const handleCopyBackup = async () => {
    try {
      const jsonStr = exportFullBackupJSON();
      await navigator.clipboard.writeText(jsonStr);
      setCopied(true);
      onNotify('تم نسخ بيانات النسخة الاحتياطية إلى الحافظة');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      onNotify('تعذر النسخ التلقائي، يمكنك تحميل الملف بدلاً من ذلك');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        // Check if full backup format
        if (parsed.dailyLogs || parsed.plan) {
          const clientName = parsed.plan?.clientName || 'غير محدد';
          const dayCount = parsed.dailyLogs ? Object.keys(parsed.dailyLogs).length : 0;
          const exportedAt = parsed.exportedAt
            ? new Date(parsed.exportedAt).toLocaleDateString('ar-EG')
            : 'غير معروف';

          setPendingBackupData({
            rawJson: text,
            clientName,
            dayCount,
            exportedAt,
          });
        } else {
          // Check if plan text/json
          const planData = extractPlanFromText(text);
          if (planData && onImportPlan) {
            onImportPlan(planData);
            onNotify('تم استيراد الخطة الغذائية من الملف بنجاح');
            onClose();
          } else {
            alert('الملف لا يحتوي على نسخة احتياطية صالحة');
          }
        }
      } catch (err) {
        alert('تعذر قراءة الملف، تأكد من أنه ملف JSON سليم');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleConfirmFullRestore = () => {
    if (!pendingBackupData) return;
    const ok = importFullBackupJSON(pendingBackupData.rawJson);
    if (ok) {
      if (onFullBackupRestored) {
        onFullBackupRestored();
      }
      onNotify('تم استرجاع النسخة الاحتياطية وتحديث السجلات بنجاح ✅');
      setPendingBackupData(null);
      onClose();
    } else {
      alert('فشل استرجاع النسخة الاحتياطية');
    }
  };

  const handleApplyPasteText = () => {
    const raw = pasteText.trim();
    if (!raw) return;

    // Check if pasted raw JSON backup
    if (raw.startsWith('{') && raw.includes('dailyLogs')) {
      const ok = importFullBackupJSON(raw);
      if (ok) {
        if (onFullBackupRestored) onFullBackupRestored();
        onNotify('تم استعادة النسخة الاحتياطية الكاملة بنجاح ✅');
        onClose();
        return;
      }
    }

    const planData = extractPlanFromText(raw);
    if (!planData || (!planData.meals && !planData.clientName && !planData.dailyWaterGoalMl)) {
      alert('تعذر قراءة الخطة من النص المدخل. يرجى التأكد من نسخ كود الخطة أو رسالة الواتساب بالكامل.');
      return;
    }

    if (onImportPlan) {
      onImportPlan(planData);
      onNotify(`تم استيراد خطة (${planData.clientName || 'المتدرب'}) بنجاح 🎯`);
    }
    onClose();
  };

  return (
    <BottomSheetModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-xl"
      icon={
        <div className="w-10 h-10 rounded-2xl bg-[var(--app-hero)]/10 text-[var(--app-hero)] flex items-center justify-center font-bold">
          <Archive className="w-5 h-5" />
        </div>
      }
      title="النسخ الاحتياطي واستعادة البيانات"
      subtitle="حماية سجلات المريض ونقلها بين الأجهزة والمتصفحات"
    >
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex bg-[var(--app-card-muted)] p-1 rounded-2xl border border-[var(--app-border)] text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'export'
                ? 'bg-[var(--app-card)] text-[var(--app-hero)] shadow-xs border border-[var(--app-border)]'
                : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)]'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>تصدير نسخة (JSON)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'import'
                ? 'bg-[var(--app-card)] text-[var(--app-hero)] shadow-xs border border-[var(--app-border)]'
                : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>استرجاع نسخة</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'text'
                ? 'bg-[var(--app-card)] text-[var(--app-hero)] shadow-xs border border-[var(--app-border)]'
                : 'text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>نص الخطة</span>
          </button>
        </div>

        {/* Tab 1: Export Backup */}
        {activeTab === 'export' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Summary Card */}
            <div className="p-4 rounded-2xl bg-[var(--app-card-muted)] border border-[var(--app-border)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--app-text-secondary)]">
                  بيانات النسخة الاحتياطية الحالية:
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  محفوظة محلياً 100%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="bg-[var(--app-card)] p-2.5 rounded-xl border border-[var(--app-border)] text-center">
                  <div className="text-[11px] text-[var(--app-text-secondary)]">اسم المريض</div>
                  <div className="font-extrabold text-[var(--app-text-primary)] text-sm mt-0.5 truncate">
                    {backupSummary.clientName}
                  </div>
                </div>
                <div className="bg-[var(--app-card)] p-2.5 rounded-xl border border-[var(--app-border)] text-center">
                  <div className="text-[11px] text-[var(--app-text-secondary)]">السجلات اليومية</div>
                  <div className="font-extrabold text-[var(--app-hero)] text-sm mt-0.5">
                    {backupSummary.dayCount} يوماً مسجلاً
                  </div>
                </div>
                <div className="bg-[var(--app-card)] p-2.5 rounded-xl border border-[var(--app-border)] text-center col-span-2 sm:col-span-1">
                  <div className="text-[11px] text-[var(--app-text-secondary)]">تاريخ اليوم</div>
                  <div className="font-bold text-[var(--app-text-primary)] text-xs mt-1">
                    {backupSummary.exportedAt}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[var(--app-text-secondary)] leading-relaxed">
                يحتوي ملف النسخة الاحتياطية على كافة تفاصيل الخطة الغذائية، سجلات الوجبات، الماء،
                الوزن والقياسات، ساعات الصيام، وجدول الأدوية والتنبيهات.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleExportDownload}
                className="flex-1 py-3 px-4 rounded-2xl bg-[var(--app-hero)] hover:bg-[var(--app-hero-hover)] text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>تحميل ملف النسخة الاحتياطية (.json)</span>
              </button>

              <button
                type="button"
                onClick={handleCopyBackup}
                className="py-3 px-4 rounded-2xl bg-[var(--app-card-muted)] hover:bg-[var(--app-border)] text-[var(--app-text-primary)] font-bold text-xs border border-[var(--app-border)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم النسخ' : 'نسخ للحافظة'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Import Backup JSON */}
        {activeTab === 'import' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {!pendingBackupData ? (
              <div className="space-y-3">
                <label className="border-2 border-dashed border-[var(--app-border)] hover:border-[var(--app-hero)] rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center gap-3 cursor-pointer bg-[var(--app-card-muted)]/50 hover:bg-[var(--app-card-muted)] transition-all text-center group">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--app-hero)]/10 text-[var(--app-hero)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[var(--app-text-primary)] text-sm">
                      انقر لاختيار ملف النسخة الاحتياطية (.json)
                    </div>
                    <div className="text-xs text-[var(--app-text-secondary)] mt-1">
                      أو اسحب الملف وأفلته هنا مباشرة
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".json,text/plain"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>

                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    عند استرجاع نسخة احتياطية كاملة، سيتم تحديث الخطة الغذائية ودمج السجلات اليومية
                    بدقة وأمان.
                  </span>
                </div>
              </div>
            ) : (
              /* Pending Confirmation Card */
              <div className="p-4 rounded-2xl bg-[var(--app-card-muted)] border border-[var(--app-border)] space-y-4 animate-in zoom-in-95">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>تم فحص الملف والتحقق من صحته بنجاح:</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[var(--app-card)] p-2.5 rounded-xl border border-[var(--app-border)]">
                    <span className="text-[var(--app-text-secondary)]">المريض:</span>{' '}
                    <b className="text-[var(--app-text-primary)]">{pendingBackupData.clientName}</b>
                  </div>
                  <div className="bg-[var(--app-card)] p-2.5 rounded-xl border border-[var(--app-border)]">
                    <span className="text-[var(--app-text-secondary)]">السجلات:</span>{' '}
                    <b className="text-[var(--app-hero)]">{pendingBackupData.dayCount} يوم</b>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleConfirmFullRestore}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    تأكيد واسترجاع كافة البيانات
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingBackupData(null)}
                    className="px-4 py-2.5 rounded-xl bg-[var(--app-card)] border border-[var(--app-border)] text-xs text-[var(--app-text-secondary)] hover:text-[var(--app-text-primary)] cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Text / WhatsApp Plan Import */}
        {activeTab === 'text' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--app-text-secondary)]">
                الصق نص الخطة الغذائية أو رسالة الواتساب:
              </span>
              <button
                type="button"
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    if (text) setPasteText(text);
                  } catch {
                    onNotify('الصق النص يدوياً في المربع أدناه');
                  }
                }}
                className="text-xs text-[var(--app-hero)] font-bold flex items-center gap-1 cursor-pointer hover:underline"
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                لصق من الحافظة
              </button>
            </div>

            <textarea
              value={pasteText}
              onChange={(e) => setPasteText(e.target.value)}
              dir="rtl"
              rows={5}
              placeholder="الصق رسالة الواتساب أو كود الخطة هنا..."
              className="w-full p-3 text-xs rounded-2xl border border-[var(--app-border)] bg-[var(--app-card)] text-[var(--app-text-primary)] focus:outline-hidden focus:ring-2 focus:ring-[var(--app-hero)]"
            />

            {detectedPlan && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                <span>تم التعرف على خطة: <b>{detectedPlan.clientName || 'المتدرب'}</b></span>
                <span>الوجبات: <b>{detectedPlan.meals?.length || 0}</b></span>
              </div>
            )}

            <button
              type="button"
              onClick={handleApplyPasteText}
              disabled={!pasteText.trim()}
              className="w-full py-3 rounded-2xl bg-[var(--app-hero)] hover:bg-[var(--app-hero-hover)] disabled:opacity-40 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              تطبيق الخطة في التطبيق
            </button>
          </div>
        )}
      </div>
    </BottomSheetModal>
  );
};
