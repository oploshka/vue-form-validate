'use strict'

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:oploshka/recommended',
    'plugin:oploshka/overrides-test-jest',
  ],
  globals: {
    "DateTime": true,
    "FileClass": true
  },
};
