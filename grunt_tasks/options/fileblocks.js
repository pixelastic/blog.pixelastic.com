export default {
  dev: {
    src: 'tmp/html/src/default.html',
    blocks: {
      css: {
        cwd: 'tmp/jekyll/css',
        prefix: '/css',
        src: ['normalize.css', '*.css'],
      },
      js: {
        cwd: 'tmp/jekyll/js',
        prefix: '/js',
        src: [
          // Order here can be important
        ],
      },
    },
  },
  prod: {
    src: 'tmp/html/src/default.html',
    blocks: {
      css: {
        cwd: 'tmp/jekyll',
        prefix: '/',
        src: 'main.*.css',
      },
      js: {
        cwd: 'tmp/jekyll',
        prefix: '/',
        src: 'main.*.js',
      },
    },
  },
};
