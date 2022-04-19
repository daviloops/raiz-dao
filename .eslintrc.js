module.exports = {
  extends: ['airbnb', 'next/core-web-vitals'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-props-no-spreading': 'off',
    '@next/next/no-img-element': 'off',
    'react/jsx-no-useless-fragment': [
      'error',
      {
        allowExpressions: true,
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
    },
  },
  // "extends": ["plugin:@typescript-eslint/recommended", "airbnb", "next/core-web-vitals"],
  // "parser": "@typescript-eslint/parser",
  // "env": {
  //   "es2022": true,
  //   "node": true
  // },
  // "parserOptions":{
  //   "ecmaVersion": 13,
  //   "sourceType": "module"
  // },
  // "plugins": ["@typescript-eslint"]
};
