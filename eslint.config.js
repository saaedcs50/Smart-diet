import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'public/**', 'scripts/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}', 'api/**/*.ts', 'server.ts', 'vite.config.ts'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // قواعد صحة فعلية كأخطاء، والباقي تحذيرات لا توقف العمل
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'react-refresh/only-export-components': 'off',
      // دين تقني موثق (تحذيرات حتى تُعالج تدريجيًا، لا أخطاء):
      // - set-state-in-effect: نمط مزامنة حالة من التخزين المحلي منتشر ومقصود حاليًا
      // - purity/immutability: توليد IDs بـ Date.now/Math.random داخل handlers، وترتيب تعريفات
      // - no-useless-assignment: قيم افتراضية حية في حسابات سريرية (cycleTracking/medicalConditions)
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/immutability': 'warn',
      'no-useless-assignment': 'warn',
    },
  }
);
