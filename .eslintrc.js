module.exports = {
  root: true,

  ignorePatterns: ['cjs', 'esm', 'esnext', 'coverage', 'benchmark/dist'],

  extends: ['@react-hookz/eslint-config/base', '@react-hookz/eslint-config/typescript'],

  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },

  rules: {
    'no-plusplus': 'off',
    'no-cond-assign': 'off',
    'no-continue': 'off',
    'no-restricted-syntax': 'off',
  },
};
