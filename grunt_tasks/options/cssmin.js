/*eslint-env node*/

module.exports = {
  prodTmpToOutput: {
    files: {
      'tmp/css/output/main.css': [
        'tmp/css/src/normalize.css',
        'tmp/css/src/*.css'
      ]
    }
  }
};
