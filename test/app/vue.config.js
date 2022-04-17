//
const path = require('path');

const DIR_ROOT = path.join(__dirname, './../../');

const aliasObj = {
  'vue-form-element': DIR_ROOT,
  // вспомогательные алиасы
  '@field': path.join(DIR_ROOT, './example/plugin-install/Element'),
};


//
const config = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '',
  // outputDir: process.env.NODE_ENV === 'production' ? __dirname + '/lib-build' : __dirname + '/demo',
  css: {
    extract: false
  },
  chainWebpack: (config) => {
    // добавляем свои алиасы
    for (const aliasName in aliasObj) {
      config.resolve.alias.set(aliasName, aliasObj[aliasName]);
    }
  },
};

// fix github page deploy
if(process.env.BUILD_SETTINGS === 'gh-page') {
  config.publicPath = '/vue-form-element/';
}

module.exports = config;
