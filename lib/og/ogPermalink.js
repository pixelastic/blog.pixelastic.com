/**
 * Compute the URL of the social card of a post
 * Mirrors the URL of the post, with the hash of the card to bust caches.
 * @param {string} postUrl - URL of the post, like `/2026/11/10/my-post/`
 * @param {string} hash - Hash of the card
 * @returns {string} URL of the card, like `/og/2026/11/10/my-post.a1b2c3d4e5f6.png`
 */
export function ogPermalink(postUrl, hash) {
  return `/og${postUrl.replace(/\/$/, '')}.${hash}.png`;
}
