module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'babel'
  ],
  rules: {
    "react/jsx-filename-extension": [0, { "extensions": [".js", ".jsx"] }],
    "camelcase":"off",
    "linebreak-style": [0, "error", "windows"],
  },
};
