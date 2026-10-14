const jsDependencies = [];
const cssDependencies = ['node_modules/normalize.css/normalize.css'];

export default {
  options: {
    recursive: true,
    args: ['--archive', '--prune-empty-dirs'],
  },

  /* DEV */
  // CSS
  devCssDependenciesToJekyll: {
    options: {
      src: cssDependencies,
      dest: 'tmp/jekyll/css',
    },
  },
  devCssDependenciesToDist: {
    options: {
      src: cssDependencies,
      dest: 'dist/css',
    },
  },
  devCssTmpToDist: {
    options: {
      src: ['tmp/css/src/*.css'],
      dest: 'dist/css',
    },
  },
  // JS
  devJsDependenciesToJekyll: {
    options: {
      src: jsDependencies,
      dest: 'tmp/jekyll/js',
    },
  },
  devJsDependenciesToDist: {
    options: {
      src: jsDependencies,
      dest: 'dist/js',
    },
  },
  devJsAppToJekyll: {
    options: {
      src: ['app/js/*'],
      dest: 'tmp/jekyll/js',
    },
  },
  devJsAppToDist: {
    options: {
      src: ['app/js/*'],
      dest: 'dist/js',
    },
  },
  // HTML
  devHtmlAppToTmp: {
    options: {
      src: 'app/_layouts/',
      dest: 'tmp/html/src',
      args: [
        '--archive',
        '--recursive',
        '--delete',
        '--prune-empty-dirs',
        '--include=*/',
        '--include=*.html',
        '--exclude=*',
      ],
    },
  },
  devHtmlTmpToJekyll: {
    options: {
      src: 'tmp/html/src/',
      dest: 'tmp/jekyll/_layouts',
      args: [
        '--archive',
        '--recursive',
        '--delete',
        '--prune-empty-dirs',
        '--include=*/',
        '--include=*.html',
        '--exclude=*',
      ],
    },
  },
  // JEKYLL
  devJekyllPrepare: {
    options: {
      src: './app/*',
      dest: './tmp/jekyll',
      exclude: ['css/', 'js/', '_layouts'],
    },
  },

  /* PROD */
  // CSS
  prodCssDependenciesToTmp: {
    options: {
      src: cssDependencies,
      dest: 'tmp/css/src',
    },
  },
  prodCssMapsToDist: {
    options: {
      src: ['tmp/css/src/*.map'],
      dest: 'dist/css',
    },
  },
  // Js
  prodJsDependenciesToTmp: {
    options: {
      src: jsDependencies,
      dest: 'tmp/js/src',
    },
  },
  prodJsMapsToDist: {
    options: {
      src: [],
      dest: 'dist/js',
    },
  },
  // HTML
  prodHtmlAppToTmp: {
    options: {
      src: 'app/_layouts/',
      dest: 'tmp/html/src',
      args: [
        '--archive',
        '--recursive',
        '--delete',
        '--prune-empty-dirs',
        '--include=*/',
        '--include=*.html',
        '--exclude=*',
      ],
    },
  },
  prodHtmlTmpToJekyll: {
    options: {
      src: 'tmp/html/src/',
      dest: 'tmp/jekyll/_layouts',
      args: [
        '--archive',
        '--recursive',
        '--delete',
        '--prune-empty-dirs',
        '--include=*/',
        '--include=*.html',
        '--exclude=*',
      ],
    },
  },
  // JEKYLL
  prodJekyllPrepare: {
    options: {
      src: './app/*',
      dest: './tmp/jekyll',
      exclude: ['css/', 'js/', 'fonts/', '_layouts'],
    },
  },

  /* DEPLOY */
  deployToPixelastic: {
    options: {
      src: 'dist/',
      dest: 'pixelastic:/var/www/blog.pixelastic.com/',
      args: [
        '--chmod=Du=rwx,Dg=rwx,Do=rx,Fu=rw,Fg=rw,Fo=r',
        '--verbose',
        '--archive',
        '--update',
        '--delete',
        '--prune-empty-dirs',
        '--compress',
      ],
    },
  },
};
