module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'plugin:boundaries/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  settings: {
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true
      }
    }
  },
  plugins: ['react-refresh', 'boundaries', "fsd-import"],
  rules: {
    "fsd-import/fsd-relative-path": "error",
    "fsd-import/public-api-imports": "error",
    "fsd-import/layer-imports": "error",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn'
  },
}
