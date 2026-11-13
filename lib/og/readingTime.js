const WORDS_PER_MINUTE = 230;

/**
 * Estimate the reading time of a post
 * @param {string} markdown - Raw content of the post
 * @returns {number} Minutes needed to read it, at least one
 */
export function readingTime(markdown) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
