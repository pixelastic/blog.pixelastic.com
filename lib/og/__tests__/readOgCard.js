import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { readOgCard } from '../readOgCard.js';

describe('readOgCard', () => {
  let tmp = null;
  beforeEach(async () => {
    tmp = await mkdtemp(path.join(os.tmpdir(), 'og-'));
  });
  afterEach(async () => {
    await rm(tmp, { recursive: true });
  });

  it.each([
    {
      title: 'reads the front matter',
      filename: '2026-11-10-my-post.md',
      frontMatter: 'title: "My post"\ndate: 2026-11-11\ntags:\n  - zsh',
      expected: {
        title: 'My post',
        minutes: 1,
        author: 'Tim',
        date: new Date('2026-11-11'),
        tags: ['zsh'],
      },
    },
    {
      title: 'falls back to the date of the file name',
      filename: '2016-06-01-old-post.md',
      frontMatter: 'title: "Old"',
      expected: {
        title: 'Old',
        minutes: 1,
        author: 'Tim',
        date: new Date('2016-06-01'),
        tags: undefined,
      },
    },
  ])('$title', async ({ filename, frontMatter, expected }) => {
    const filepath = path.join(tmp, filename);
    await writeFile(filepath, `---\n${frontMatter}\n---\n\nSome content.\n`);
    const actual = readOgCard(filepath, 'Tim');
    expect(actual).toEqual(expected);
  });
});
