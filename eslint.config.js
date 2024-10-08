import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Reglas para hacer que ESLint sea más permisivo con any, unknown, null y undefined
      '@typescript-eslint/no-explicit-any': 'off', // Permitir any
      '@typescript-eslint/no-unsafe-assignment': 'off', // Permitir asignaciones inseguras
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off', // Permitir expresiones booleanas estrictas
      '@typescript-eslint/no-non-null-assertion': 'off', // Permitir null assertions
      '@typescript-eslint/no-unused-vars': 'off', // Variables no usadas
      '@typescript-eslint/no-extra-semi': 'off', // Ignorar punto y coma extra
      'react-refresh/only-export-components': 'off',
      // Reglas adicionales
      'no-unused-expressions': 'off', // Desactivar no-unused-expressions
      'react-hooks/exhaustive-deps': 'off', // Desactivar dependencias exhaustivas en hooks
      'no-useless-escape': 'off', // Desactivar caracteres escapados innecesarios
      '@typescript-eslint/no-unused-expressions': 'off', // Desactivar TS no-unused-expressions
    },
  }
);
