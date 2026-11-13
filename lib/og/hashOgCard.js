import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import _ from 'lodash';

export let __;

const OG_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));

/**
 * Hash what a social card shows, and the design that draws it
 * The hash is part of the card URL, so any change gives the card a new URL
 * that social networks have not cached yet.
 * @param {object} card - Card data, as returned by `readOgCard`
 * @returns {string} Short hash
 */
export function hashOgCard(card) {
  return createHash('sha1')
    .update(JSON.stringify(card))
    .update(__.designHash())
    .digest('hex')
    .slice(0, 12);
}

__ = {
  /**
   * Hash the renderer and its assets, so a design change gives every card a new URL
   * @returns {string} Hash of the design
   */
  designHash: _.memoize(() => {
    const files = [
      'renderOgImage.js',
      'assets/DejaVuSansMono-Bold.ttf',
      'assets/DejaVuSansMono.ttf',
      'assets/avatar.jpg',
    ];
    const hash = createHash('sha1');
    _.each(files, (file) =>
      hash.update(readFileSync(path.join(OG_DIRECTORY, file))),
    );
    return hash.digest('hex');
  }),
};
