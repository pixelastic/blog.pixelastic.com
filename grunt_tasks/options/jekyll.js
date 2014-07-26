/* jshint camelcase: false */
module.exports = {
  options: {
    config: '_config.yml'
  },
  // Make a classic Jekyll build, without any grunt optimizations
  classic: {
    options: {
      src: '<%= config.jekyllSrc %>',
      dest: '<%= config.jekyllDestClassic %>'
    }
  },
  // Classic build, with only a subset of posts
  classicDev: {
    options: {
      src: '<%= config.jekyllSrc %>',
      dest: '<%= config.jekyllDestClassic %>',
      limit_posts: 10,
      drafts: true
    }
  },
  // Full build, with minification
  build: {
    options: {
      src: '<%= config.jekyllSrcBuild %>',
      dest: '<%= config.jekyllDestBuild %>'
    }
  },
  // Full build, with only a subset of posts
  buildDev: {
    options: {
      src: '<%= config.jekyllSrcBuild %>',
      dest: '<%= config.jekyllDestBuild %>',
      limit_posts: 10,
      drafts: true
    }
  }
};
