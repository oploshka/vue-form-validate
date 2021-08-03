const aliasObj = require('./vue.alias');
const path = require("path");

// const fs = require('fs');

// eslint-disable-next-line no-unused-vars
function relayRequestHeaders(proxyReq, req) {}
// eslint-disable-next-line no-unused-vars
function relayResponseHeaders(proxyRes, req, res) {}
// eslint-disable-next-line no-unused-vars
function bypassFunction(req, res, proxyOptions) {}

let testDomainProtocol  = process.env.DOMAIN_PROTOCOL;
let testDomainName      = process.env.DOMAIN_NAME;
let testDomainPort      = process.env.DOMAIN_PORT;
let testDomainFull      = testDomainProtocol + '://' + testDomainName + ':' + testDomainPort;

let publicPath = '/';
let outputDir  = path.resolve(__dirname, "./web");

console.log("=========================================")
console.log("mode: " + process.env.NODE_ENV, process.env.BUILD_MODE )
console.log("=========================================")

if(process.env.BUILD_MODE === 'demo') {
  publicPath  = '/vue-form-validate/';
  outputDir   = path.resolve(__dirname, "./demo");
}

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',

  devServer: {
    port: testDomainPort,
    public: `${testDomainName}:${testDomainPort}`,
    proxy: {
      [`${testDomainName}:${testDomainPort}`]: {
        target: testDomainFull,
        secure: false,
        changeOrigin: true,
        bypass: bypassFunction,
        onProxyReq: relayRequestHeaders,
        onProxyRes: relayResponseHeaders,
        // router: routedRoutes
      },
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
  },

  // рендерим все в папку
  // entry: {
  //   app: path.resolve(__dirname, "./test/serve/main.js"),
  // },
  pages: {
    index: {
      entry: path.resolve(__dirname, "./test/serve/main.js"),
      template: './public/index.html',
    },
  },

  publicPath: publicPath,
  outputDir : outputDir,
  assetsDir : "./resource/",

  filenameHashing: true,

  chainWebpack: (config) => {
    for (const aliasName in aliasObj) {
      config.resolve.alias.set(aliasName, aliasObj[aliasName]);
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        // Подключать только переменные, иначе стили будут дублироваться!!!
        path.resolve(__dirname, './resource/style/_*.scss'),
      ]
    }
  },

};
