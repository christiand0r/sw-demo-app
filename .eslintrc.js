module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['plugin:react/jsx-runtime', 'standard', 'eslint-config-prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'spaced-comment': 'off',
    'react/prop-types': 'off',
    'no-throw-literal': 'off',
    'jsx-uses-vars': 'on',
    'jsx-uses-react': 'on',
    camelcase: 'off',
  },
};
