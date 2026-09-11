import React from 'react';
import { PlanConfig } from '../types';
import { BackupRestoreModal } from './BackupRestoreModal';

interface ImportModalProps {
  onImportPlan: (imported: Partial<PlanConfig>) => void;
  onClose: () => void;
  onNotify: (msg: string) => void;
  onFullBackupRestored?: () => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  onImportPlan,
  onClose,
  onNotify,
  onFullBackupRestored,
}) => {
  return (
    <BackupRestoreModal
      isOpen={true}
      onClose={onClose}
      onNotify={onNotify}
      onImportPlan={onImportPlan}
      onFullBackupRestored={onFullBackupRestored}
      defaultTab="import"
    />
  );
};
