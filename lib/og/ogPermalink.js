/**
 * Compute the URL of the social card of a post
 * Mirrors the URL of the post, so each card is easy to find.
 * @param {string} postUrl - URL of the post, like `/2026/11/10/my-post/`
 * @returns {string} URL of the card, like `/og/2026/11/10/my-post.png`
 */
export function ogPermalink(postUrl) {
  return `/og${postUrl.replace(/\/$/, '')}.png`;
}
