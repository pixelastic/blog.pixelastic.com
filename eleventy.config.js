import { groupPostsByPeriod } from './lib/groupPostsByPeriod.js';
import { groupPostsByTag } from './lib/groupPostsByTag.js';
import { tagSlug } from './lib/tagSlug.js';

/**
 * Eleventy configuration
 * @param {object} eleventyConfig - Eleventy configuration API
 * @returns {object} Eleventy directories and template engines
 */
export default function (eleventyConfig) {
  // Images keep their old /img/files/... URLs
  eleventyConfig.addPassthroughCopy({ 'src/img': 'img' });

  // Posts contain raw HTML that must reach the output untouched
  eleventyConfig.amendLibrary('md', (markdown) => markdown.set({ html: true }));

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
