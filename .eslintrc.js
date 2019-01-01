module.exports = {
  extends: ['airbnb-base'],
  plugins: ['babel'],
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
    'arrow-body-style': 0,
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'arrow-parens': ['error', 'always'],
    'space-before-function-paren': 0,
    'function-paren-newline': ['error', 'consistent'],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
        caughtErrors: 'all',
      },
    ],
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
    'no-underscore-dangle': 0,
    'object-curly-newline': ['error', { consistent: true }],
    'operator-linebreak': 0,
    'implicit-arrow-linebreak': 0,
    'no-confusing-arrow': 0,
  },
};
