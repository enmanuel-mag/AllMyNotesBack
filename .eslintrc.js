module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    'no-undef': 0,
    'no-case-declarations': 0,
    'node/no-callback-literal': 0,
    quotes: ['error', 'single'],
    'object-property-newline': ['error'],
    'semi': 'error',
    'comma-dangle': ['error', 'never'],
    'no-nested-ternary': 'error',
    'no-extra-semi': 'error',
    'no-shadow': ['error', { 'allow': ['err', 'cb'] }],
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'keyword-spacing': ['error', {
      'before': true,
      'after': true
    }],
    'space-before-blocks': 'error',
    'arrow-spacing': 'error',
    'indent': ['error', 2, {
      'ignoredNodes': ['TemplateLiteral']
    }],
    'no-multiple-empty-lines': ['error', { 'max': 2,
      'maxEOF': 1 }],
    'object-curly-spacing': ['error', 'always'],
    'key-spacing': ['error', { 'beforeColon': false }],
    'callback-return': ['error', ['done', 'callback']],
    'no-console': ['error', { allow: ['warn', 'error', 'log'] }],
    'no-else-return': ['error', { 'allowElseIf': false }],
    'no-useless-escape': 'off'
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  }
};
