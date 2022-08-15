module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  ignorePatterns: [
    'src/stories/components/StateOfChargeLinearChart/data*.ts',
    '.eslintrc.js',
    'webpack.config.js',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    indent: ['error', 'tab'],
    'prettier/prettier': [2, { useTabs: true, tabWidth: 2 }],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
};
