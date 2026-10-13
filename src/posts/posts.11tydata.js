import { postPermalink } from '../../lib/postPermalink.js';

export default {
  layout: 'post.njk',
  /**
   * Compute the URL of each post from its file name
   * @param {object} data - Eleventy data cascade of the post
   * @returns {string|boolean} Permalink of the post, or false to skip it
   */
  permalink: (data) => postPermalink(data.page.inputPath),
};
