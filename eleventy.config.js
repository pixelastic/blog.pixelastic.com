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

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    // Posts are pure Markdown: a `{{ }}` in a code block must not be evaluated
    markdownTemplateEngine: false,
  };
}
