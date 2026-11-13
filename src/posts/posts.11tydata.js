import { hashOgCard, ogPermalink, readOgCard } from '../../lib/og/index.js';
import { postPermalink } from '../../lib/postPermalink.js';

export default {
  layout: 'post.njk',
  /**
   * Compute the URL of each post from its file name
   * @param {object} data - Eleventy data cascade of the post
   * @returns {string|boolean} Permalink of the post, or false to skip it
   */
  permalink: (data) => postPermalink(data.page.inputPath),
  eleventyComputed: {
    /**
     * Social card of the post, shown when it is shared. Its URL changes with its content
     * @param {object} data - Eleventy data cascade of the post
     * @returns {string} URL of the card
     */
    ogImage: (data) =>
      ogPermalink(
        data.page.url,
        hashOgCard(readOgCard(data.page.inputPath, data.site.author.name)),
      ),
  },
};
