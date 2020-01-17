module.exports = {
  extends: ['airbnb'],
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': 'off',
  },
  env: {
    browser: true,
  },
};
