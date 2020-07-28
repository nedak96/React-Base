// Created by Kaden Badalian on April 6, 2020

module.exports = {
  parser: 'babel-eslint',
  env: {
      browser: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  rules: {
      'import/no-cycle': 0,
      'camelcase': 0,
      'no-console': 0,
      'no-underscore-dangle': 0,
      'react/jsx-props-no-spreading': 0,
      'no-unneeded-ternary': 0,
  },
}
