import _ from 'lodash';
import { parseWordDiff } from './parseWordDiff.js';

/**
 * Shiki transformer showing a diff inside a line
 * Removed words are marked `[-like this-]` and added ones `{+like this+}`. Both
 * stay in the code, wrapped in a `word-diff remove` or `word-diff add` span.
 * Lines holding a changed word get the `modified` class, and the block gets the
 * `has-diff` class, like the blocks with added and removed lines.
 * @returns {object} Shiki transformer
 */
export function transformerWordDiff() {
  // Shiki applies decorations after the line and block hooks, so the modified
  // lines are found from the text, and kept in the options of the block
  const metaKey = 'wordDiffLines';

  return {
    name: 'word-diff',
    preprocess(code, options) {
      const parsed = parseWordDiff(code);

      options.decorations ||= [];
      options.decorations.push(...parsed.decorations);

      const lineNumbers = _.chain(parsed.decorations)
        .map(({ start }) => _.split(parsed.code.slice(0, start), '\n').length)
        .uniq()
        .value();
      options.meta = { ...options.meta, [metaKey]: lineNumbers };

      return parsed.code;
    },
    line(node, lineNumber) {
      if (_.includes(this.options.meta[metaKey], lineNumber)) {
        this.addClassToHast(node, 'modified');
      }
    },
    pre(node) {
      if (!_.isEmpty(this.options.meta[metaKey])) {
        this.addClassToHast(node, 'has-diff');
      }
    },
  };
}
