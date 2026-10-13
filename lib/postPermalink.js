import path from 'node:path';

/**
 * Compute the URL of a post from its dated file name
 * Keeps the Jekyll `/YYYY/MM/DD/slug/` URLs, always with a trailing slash.
 * Returns false for a file without a date prefix, so Eleventy skips it like Jekyll did.
 * @param {string} inputPath - Path to the post, like `2016-06-01-marvel-super-search.md`
 * @returns {string|boolean} Permalink of the post, or false if the file name has no date
 */
export function postPermalink(inputPath) {
  const basename = path.basename(inputPath, '.md');
  const match = basename.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
  if (!match) {
    return false;
  }

  const [, year, month, day, slug] = match;
  return `/${year}/${month}/${day}/${slug}/`;
}
