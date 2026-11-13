import { readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { readingTime } from './readingTime.js';

export let __;

/**
 * Read what the social card of a post shows
 * @param {string} filepath - Post like `2016-06-01-my-post.md`
 * @param {string} author - Name shown on the card
 * @returns {object} Card data: `{ title, minutes, author, date, tags }`
 */
export function readOgCard(filepath, author) {
  const { data, content } = matter(readFileSync(filepath, 'utf8'));
  return {
    title: data.title,
    minutes: readingTime(content),
    author,
    date: data.date ?? __.dateFromFilename(filepath),
    tags: data.tags,
  };
}

__ = {
  /**
   * Read the date of a post from its file name, as Eleventy does without a `date`
   * @param {string} filepath - Post like `2016-06-01-my-post.md`
   * @returns {Date} Date of the post
   */
  dateFromFilename(filepath) {
    return new Date(path.basename(filepath).slice(0, 10));
  },
};
