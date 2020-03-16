module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  plugins: ['react-hooks', 'prettier', 'import', 'simple-import-sort'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'simple-import-sort/sort': 'error',
    'import/no-duplicates': 'error',
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': 'off',
    'sort-imports': 'off',
    'import/order': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': 'webpack',
  },
  env: {
    browser: true,
  },
};
