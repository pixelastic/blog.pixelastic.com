module.exports = {
  options: {
    encoding: 'utf8',
    algorithm: 'md5',
    length: 8
  },
  fullFonts: {
    src: '<%= config.app %>/fonts/*',
    dest: '<%= config.srcBuildFull %>/fonts'
  },
  fullCss: {
    src: '<%= config.srcBuildFull %>/main.css'
  }
};
