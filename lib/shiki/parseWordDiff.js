// Same markup as `git diff --word-diff`: [-removed-] and {+added+}
const markup = /\[-(.*?)-\]|\{\+(.*?)\+\}/g;

/**
 * Parse the word diff markup of a code block
 * The removed and added words are kept in the code, one after the other, and
 * the decorations tell where each one is.
 * @param {string} input - Code with `[-removed-]{+added+}` markup
 * @returns {object} The `code` without markup, and Shiki `decorations` to wrap each removed and added word
 */
export function parseWordDiff(input) {
  const decorations = [];
  // Every markup removed makes the next positions shift to the left
  let shift = 0;

  const code = input.replace(markup, (match, removed, added, index) => {
    const isRemoved = removed !== undefined;
    const word = isRemoved ? removed : added;
    const start = index - shift;

    decorations.push({
      start,
      end: start + word.length,
      properties: { class: `word-diff ${isRemoved ? 'remove' : 'add'}` },
    });
    shift += match.length - word.length;

    return word;
  });

  return { code, decorations };
}
