const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

prettierOptions.endOfLine = 'auto';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'prettier'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
};
