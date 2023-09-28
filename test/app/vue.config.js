//
const path = require('path');

const DIR_ROOT = path.join(__dirname, './../../');

const aliasObj = {
  // Этот alias нужен для корректной работы тестового приложения
  'vue-form-element': DIR_ROOT,
  
  // вспомогательные alias 
  '@field':           path.join(DIR_ROOT, './example/plugin-install/Field'),
  '@fieldHelper':     path.join(DIR_ROOT, './example/plugin-install/FieldHelper'),
  // Этот алиас просто для удобства
  '@dependency':      path.join(DIR_ROOT, './example/plugin-install/dependency'),
};


//
const config = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '',
  // outputDir: process.env.NODE_ENV === 'production' ? __dirname + '/lib-build' : __dirname + '/demo',
  css: {
    extract: false
  },
  
  // Без этого тестовый проект сыпет ошибки и работает не корректно...
  // (внешним папкам требуется зависимость от vue)
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        vue: path.resolve('./node_modules/vue')
      }
    }
  },
  chainWebpack: (config) => {
    // добавляем свои alias
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
