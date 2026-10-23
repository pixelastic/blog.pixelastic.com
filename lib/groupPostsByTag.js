import _ from 'lodash';
import { tagSlug } from './tagSlug.js';

/**
 * Group posts by tag
 * Tags that share a slug (like `api` and `API`) are merged, as they share a URL.
 * Tags keep the order in which they first appear, posts are sorted newest first.
 * @param {object[]} posts - Eleventy posts, each with a `date` and `data.tags`
 * @returns {object[]} List of `{ name, slug, posts }`, one per slug
 */
export function groupPostsByTag(posts) {
  const newestFirst = _.orderBy(posts, 'date', 'desc');

  return _.chain(newestFirst)
    .flatMap((post) =>
      _.map(post.data.tags, (name) => ({ name, post, slug: tagSlug(name) })),
    )
    .groupBy('slug')
    .map((entries, slug) => ({
      name: entries[0].name,
      slug,
      posts: _.chain(entries).map('post').uniq().value(),
    }))
    .value();
}
