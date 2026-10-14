import config from 'aberlaas/configs/stylelint';

export default {
  ...config,
  // Build output and generated stylesheet are not hand-written
  ignoreFiles: ['_site/**', 'src/static/css/main.css'],
};
