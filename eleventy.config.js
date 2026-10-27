import eleventyPluginRss from '@11ty/eleventy-plugin-rss';
import shiki from '@shikijs/markdown-it';
import { transformerNotationDiff } from '@shikijs/transformers';
import { groupPostsByPeriod } from './lib/groupPostsByPeriod.js';
import { groupPostsByTag } from './lib/groupPostsByTag.js';
import { transformerWordDiff } from './lib/shiki/index.js';
import shikiTheme from './lib/shiki/shikiTheme.json' with { type: 'json' };
import { tagSlug } from './lib/tagSlug.js';

/**
 * Eleventy configuration
 * @param {object} eleventyConfig - Eleventy configuration API
 * @returns {Promise<object>} Eleventy directories and template engines
 */
export default async function (eleventyConfig) {
  // Images keep their old /img/files/... URLs
  eleventyConfig.addPassthroughCopy({ 'src/img': 'img' });

  // Fixed files (robots.txt, favicon, downloads...) are served from the root
  eleventyConfig.addPassthroughCopy({ 'src/static': '/' });

  // DocSearch script and stylesheet are served from the site, not a CDN
  eleventyConfig.addPassthroughCopy({
    'node_modules/@docsearch/js/dist/umd/docsearch.js': 'vendor/docsearch.js',
    'node_modules/@docsearch/css/dist/style.css': 'vendor/docsearch.css',
  });

  // Date and URL filters used by the feeds
  eleventyConfig.addPlugin(eleventyPluginRss);

  // All posts, newest first, for the home pages and the feeds
  eleventyConfig.addCollection('postList', (collectionApi) =>
    collectionApi.getFilteredByGlob('src/posts/*.md').reverse(),
  );

  // Posts contain raw HTML that must reach the output untouched
  eleventyConfig.amendLibrary('md', (markdown) => markdown.set({ html: true }));

  // Code blocks are colored with the same theme as my editor. Unknown languages
  // fall back to plain text
  const highlightCode = await shiki({
    theme: shikiTheme,
    langs: [
      'apache',
      'css',
      'html',
      'ini',
      'javascript',
      'json',
      'markdown',
      'nginx',
      'php',
      'pug',
      'puppet',
      'ruby',
      'shellscript',
      'sql',
      'viml',
      'xml',
    ],
    langAlias: { sh: 'shellscript', zsh: 'shellscript', jade: 'pug' },
    fallbackLanguage: 'text',
    transformers: [transformerNotationDiff(), transformerWordDiff()],
  });
  eleventyConfig.amendLibrary('md', (markdown) => markdown.use(highlightCode));

  // One entry per tag, with its posts, to generate the /tags/ pages
  eleventyConfig.addCollection('tagList', (collectionApi) =>
    groupPostsByTag(collectionApi.getFilteredByGlob('src/posts/*.md')),
  );
  eleventyConfig.addFilter('tagSlug', tagSlug);

  // One entry per year, month and day containing posts, to generate the archive pages
  eleventyConfig.addCollection('archiveList', (collectionApi) =>
    groupPostsByPeriod(collectionApi.getFilteredByGlob('src/posts/*.md')),
  );

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    // Posts are pure Markdown: a `{{ }}` in a code block must not be evaluated
    markdownTemplateEngine: false,
  };
}
