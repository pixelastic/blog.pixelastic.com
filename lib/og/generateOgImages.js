import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import _ from 'lodash';
import { postPermalink } from '../postPermalink.js';
import { ogPermalink } from './ogPermalink.js';
import { readingTime } from './readingTime.js';
import { renderOgImage } from './renderOgImage.js';

export let __;

/**
 * Generate the social card of each post, as PNG files
 * Cards are kept as committed assets: an existing card is never rewritten,
 * unless `force` is set.
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
   * Generate the card of one post
   * @param {string} filepath - Post to generate a card for
   * @param {object} options - Same options as `generateOgImages`
   * @returns {Promise<string|null>} Path of the card, or null if nothing was written
   */
  async generateOne(filepath, options) {
    const url = postPermalink(filepath);
    if (!url) {
      return null;
    }

    const output = path.join(
      options.outputDirectory,
      ogPermalink(url).replace(/^\/og\//, ''),
    );
    if (!options.force && (await __.exists(output))) {
      return null;
    }

    const { data, content } = matter(await readFile(filepath, 'utf8'));
    const image = await renderOgImage({
      title: data.title,
      minutes: readingTime(content),
      author: options.author,
      date: data.date ?? __.dateFromFilename(filepath),
      tags: data.tags,
    });
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, image);
    return output;
  },

  /**
   * Read the date of a post from its file name, as Eleventy does without a `date`
   * @param {string} filepath - Post like `2016-06-01-my-post.md`
   * @returns {Date} Date of the post
   */
  dateFromFilename(filepath) {
    return new Date(path.basename(filepath).slice(0, 10));
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
