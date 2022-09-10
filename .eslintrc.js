module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'no-console': 'off',
    'no-process-env': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-underscore-dangle': 'off',
    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   {
    //     selector: 'interface',
    //     format: ['PascalCase'],
    //     custom: {
    //       regex: '^I[A-Z]',
    //       match: true,
    //     },
    //   },
    // ],
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
