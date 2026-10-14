import config from 'aberlaas/configs/eslint';

export default [
  // Build output holds minified vendor bundles that make ESLint hang
  { ignores: ['_site/**'] },
  ...config,
];
