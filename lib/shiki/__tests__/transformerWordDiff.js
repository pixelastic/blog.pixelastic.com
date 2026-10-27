import { codeToHtml } from 'shiki';
import { transformerWordDiff } from '../transformerWordDiff.js';

describe('transformerWordDiff', () => {
  /**
   * Highlight a code block with the word diff transformer
   * @param {string} code - Code with word diff markup
   * @returns {Promise<string>} Highlighted HTML
   */
  async function render(code) {
    return await codeToHtml(code, {
      lang: 'javascript',
      theme: 'github-dark',
      transformers: [transformerWordDiff()],
    });
  }

  it('wraps removed and added words', async () => {
    const actual = await render('const [-a-]{+b+} = 1;');
    expect(actual).toMatch(/class="word-diff remove"/);
    expect(actual).toMatch(/class="word-diff add"/);
  });

  it('removes the markup from the output', async () => {
    const actual = await render('const [-a-]{+b+} = 1;');
    expect(actual).not.toMatch(/\[-|-\]|\{\+|\+\}/);
  });

  it('marks the lines holding a changed word', async () => {
    const actual = await render('const x = 1;\nconst [-a-]{+b+} = 2;');
    const lines = actual.match(/<span class="line[^"]*">/g);
    expect(lines).toEqual([
      '<span class="line">',
      '<span class="line modified">',
    ]);
  });

  it('marks the block, so it gets the diff layout', async () => {
    const actual = await render('const [-a-]{+b+} = 1;');
    expect(actual).toMatch(/<pre class="[^"]*has-diff/);
  });

  it('leaves a block without changed word untouched', async () => {
    const actual = await render('const a = 1;');
    expect(actual).not.toMatch(/modified|has-diff|word-diff/);
  });
});
