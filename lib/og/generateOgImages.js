import { mkdir, readdir, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import _ from 'lodash';
import { postPermalink } from '../postPermalink.js';
import { hashOgCard } from './hashOgCard.js';
import { ogPermalink } from './ogPermalink.js';
import { readOgCard } from './readOgCard.js';
import { renderOgImage } from './renderOgImage.js';

export let __;

/**
 * Generate the social card of each post, as PNG files
 * Cards are kept as committed assets. The hash of what a card shows is part of
 * its file name, so a card is only written when it does not exist yet. Cards
 * made obsolete by a change are deleted.
 * @param {string[]} filepaths - Posts to generate a card for
 * @param {object} options - Generation options
 * @param {string} options.outputDirectory - Directory served as `/og/`
 * @param {string} options.author - Name shown on each card
 * @param {boolean} [options.force] - Regenerate cards that already exist
 * @returns {Promise<string[]>} Paths of the cards that were written
 */
export async function generateOgImages(filepaths, options) {
  const written = await Promise.all(
    _.map(filepaths, (filepath) => __.generateOne(filepath, options)),
  );
  return _.compact(written);
}

__ = {
  /**
   * Generate the card of one post, if it is missing
   * @param {string} filepath - Post to generate a card for
   * @param {object} options - Same options as `generateOgImages`
   * @returns {Promise<string|null>} Path of the card, or null if nothing was written
   */
  async generateOne(filepath, options) {
    const url = postPermalink(filepath);
    if (!url) {
      return null;
    }

    const card = readOgCard(filepath, options.author);
    const output = path.join(
      options.outputDirectory,
      ogPermalink(url, hashOgCard(card)).replace(/^\/og\//, ''),
    );
    if (!options.force && (await __.exists(output))) {
      return null;
    }

    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, await renderOgImage(card));
    await __.removeObsolete(output);
    return output;
  },

  /**
   * Delete the older cards of a post, next to its current card
   * @param {string} current - Path of the current card, like `my-post.a1b2c3d4e5f6.png`
   */
  async removeObsolete(current) {
    const directory = path.dirname(current);
    const slug = path.basename(current).replace(/\.[0-9a-f]{12}\.png$/, '');
    const isCard = new RegExp(
      `^${_.escapeRegExp(slug)}(\\.[0-9a-f]{12})?\\.png$`,
    );

    const files = await readdir(directory);
    const obsolete = _.filter(
      files,
      (file) => isCard.test(file) && file !== path.basename(current),
    );
    await Promise.all(
      _.map(obsolete, (file) => unlink(path.join(directory, file))),
    );
  },

  /**
   * Check if a file exists
   * @param {string} filepath - File to check
   * @returns {Promise<boolean>} True if the file exists
   */
  async exists(filepath) {
    try {
      await stat(filepath);
      return true;
    } catch {
      return false;
    }
  },
};
