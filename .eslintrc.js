module.exports = {
  rules: {
    'require-jsdoc': 0,
    'no-console': 0,
    'max-len': [2, { 'code': 100}],
    'import/order': 0,
    'no-underscore-dangle': [
      'error', {
        'allow': [
          '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
          '_invoke'
        ]
      }
    ],
    'flowtype/no-weak-types': 0
  },
  extends: 'sky'
};
