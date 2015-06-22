/* eslint-env node */

module.exports = {
  prodAppToTmp: {
    files: {
      'tmp/js/src/app.js': [
        'app/js/*.js'
      ]
    }
  }
};
