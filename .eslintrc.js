'use strict'

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:oploshka/recommended',
    'plugin:oploshka/overrides-test-jest',
  ],
  globals: {
    "CONST": true,
    "ENUM": true,
    "VueApp": true,
    "RequestManager": true,
    "DateTime": true,
    "FileClass": true
  },
};
