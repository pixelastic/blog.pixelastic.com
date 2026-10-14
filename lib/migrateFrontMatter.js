import { readFile, writeFile } from 'node:fs/promises';
import _ from 'lodash';

export let __;

/**
 * Rewrite the front matter of posts to the Eleventy format, in place
 * Turns comma-separated `tags` into a YAML list, drops empty `tags` and
 * removes `layout`, which the directory data file sets. Safe to run twice.
 * @param {string[]} filepaths - Posts to rewrite
 */
export async function migrateFrontMatter(filepaths) {
  await Promise.all(
    filepaths.map(async (filepath) => {
      const content = await readFile(filepath, 'utf8');
      const migrated = __.migrateContent(content);
      if (migrated !== content) {
        await writeFile(filepath, migrated);
      }
    }),
  );
}

__ = {
  /**
   * Migrate the front matter of a post, leaving its body untouched
   * @param {string} content - Full content of the post
   * @returns {string} Content with the migrated front matter
   */
  migrateContent(content) {
    const match = content.match(/^---(\r?\n)([\s\S]*?)\r?\n---(?=\r?\n|$)/);
    if (!match) {
      return content;
    }

    // Some posts use CRLF line endings, keep them as they were
    const [frontMatter, eol, frontMatterText] = match;
    const lines = frontMatterText.split(eol);
    const migratedLines = __.migrateLines(lines);
    return `---${eol}${migratedLines.join(eol)}${eol}---${content.slice(frontMatter.length)}`;
  },

  /**
   * Migrate the lines of a front matter
   * @param {string[]} lines - Front matter lines, without the `---` fences
   * @returns {string[]} Lines without `layout`, and with tags as a YAML list
   */
  migrateLines(lines) {
    return lines.flatMap((line, index) => {
      if (/^layout:/.test(line)) {
        return [];
      }

      const tagsMatch = line.match(/^tags:[ \t]*(.*)$/);
      if (!tagsMatch) {
        return [line];
      }

      const value = tagsMatch[1].trim();
      if (value) {
        return ['tags:', ...__.toYamlList(value)];
      }

      // An empty `tags:` followed by list items is already migrated
      const isAlreadyList = /^\s+-/.test(lines[index + 1] ?? '');
      return isAlreadyList ? [line] : [];
    });
  },

  /**
   * Convert comma-separated tags into YAML list items
   * @param {string} value - Tags like `caracole, cakephp`
   * @returns {string[]} YAML list items, quoted when YAML needs it
   */
  toYamlList(value) {
    return _.chain(value)
      .split(',')
      .map(_.trim)
      .compact()
      .map((tag) => {
        const isPlain = /^[\w$][\w$ .+-]*$/.test(tag);
        return `  - ${isPlain ? tag : JSON.stringify(tag)}`;
      })
      .value();
  },
};
