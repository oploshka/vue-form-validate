const path = require('path');

const alias = {
  // plugin root dir
  '@fve'            : path.join(__dirname, './src/'),

  // system
  '@entity'         : path.join(__dirname, './test/serve/core/entity'      ),
  '@library'        : path.join(__dirname, './test/serve/core/library'     ),
  '@plugin'         : path.join(__dirname, './test/serve/core/plugin'      ),
  '@router'         : path.join(__dirname, './test/serve/core/router'      ),
  '@page'           : path.join(__dirname, './test/serve/page'             ),
  '@'               : path.join(__dirname, './test/serve'                  ),

};

module.exports = alias;
