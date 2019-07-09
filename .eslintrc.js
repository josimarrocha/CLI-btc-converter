module.exports = {
  env: {
    //   node: true,
    browser: true
    //   es6: true,
  },
  extends: 'airbnb-base',
  // globals: {
  //   Atomics: 'readonly',
  //   SharedArrayBuffer: 'readonly',
  // },
  // parserOptions: {
  //   ecmaVersion: 2018,
  //   sourceType: 'module',
  // },
  rules: {
    "linebreak-style": 0,
    'no-use-before-define': ["error", { "variables": false }]
  },

};
