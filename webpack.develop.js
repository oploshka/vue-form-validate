
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'vue-form-element': path.join(__dirname, './'),
      // вспомогательные алиасы
      '@field': path.join(__dirname, './example/plugin-install/Element'),
    },
  },
};
