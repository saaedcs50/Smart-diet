import { describe, it, expect } from 'vitest';
import {
  encryptBackupJSON,
  decryptBackupJSON,
  isEncryptedBackup,
} from '../src/utils/backupCrypto';

const PLAIN = JSON.stringify({ plan: { clientName: 'اختبار' }, dailyLogs: { '2026-01-01': {} } });

describe('backupCrypto — encrypted backups', () => {
  it('roundtrips: encrypt then decrypt returns the original JSON', async () => {
    const encrypted = await encryptBackupJSON(PLAIN, 'correct horse battery');
    expect(isEncryptedBackup(encrypted)).toBe(true);
    expect(encrypted).not.toContain('اختبار');
    const back = await decryptBackupJSON(encrypted, 'correct horse battery');
    expect(back).toBe(PLAIN);
  });

  it('rejects a wrong passphrase', async () => {
    const encrypted = await encryptBackupJSON(PLAIN, 'right-pass');
    await expect(decryptBackupJSON(encrypted, 'wrong-pass')).rejects.toThrow();
  });

  it('rejects passphrases shorter than 6 chars at encrypt time', async () => {
    await expect(encryptBackupJSON(PLAIN, '12345')).rejects.toThrow();
  });

  it('plain backups are not flagged as encrypted', () => {
    expect(isEncryptedBackup(PLAIN)).toBe(false);
    expect(isEncryptedBackup('not json')).toBe(false);
  });

  it('each encryption uses a fresh salt/IV (outputs differ)', async () => {
    const a = await encryptBackupJSON(PLAIN, 'same-pass-1');
    const b = await encryptBackupJSON(PLAIN, 'same-pass-1');
    expect(a).not.toBe(b);
  });
});
