module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing',
  ],
  rules: {
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
