import _ from 'lodash';

const replacements = {
  '#': 'sharp',
  '/': 'slash',
  '\\': 'backslash',
  '.': 'dot',
  '+': 'plus',
  ' ': '-',
};

/**
 * Compute the URL slug of a tag
 * Follows the character table of the old Jekyll `slugify_tag`, so tag URLs stay identical.
 * @param {string} tagName - Name of the tag, like `C#`
 * @returns {string} Slug of the tag, like `csharp`
 */
export function tagSlug(tagName) {
  return _.chain(tagName)
    .toLower()
    .trim()
    .split('')
    .map((char) => replacements[char] ?? char)
    .join('')
    .value();
}
