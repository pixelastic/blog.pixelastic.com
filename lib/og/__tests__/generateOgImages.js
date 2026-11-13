import { mkdtemp, readdir, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { generateOgImages } from '../generateOgImages.js';

describe('generateOgImages', () => {
  let tmp = null;
  let post = null;
  beforeEach(async () => {
    tmp = await mkdtemp(path.join(os.tmpdir(), 'og-'));
    post = path.join(tmp, '2026-11-10-my-post.md');
    await writeFile(
      post,
      '---\ntitle: "My post"\ndate: 2026-11-10\ntags:\n  - zsh\n---\n\nSome content.\n',
    );
  });
  afterEach(async () => {
    await rm(tmp, { recursive: true });
  });

  it('writes one card per post, at the path mirroring its url', async () => {
    const outputDirectory = path.join(tmp, 'og');
    const actual = await generateOgImages([post], {
      outputDirectory,
      author: 'Tim',
    });
    expect(actual).toEqual([
      path.join(outputDirectory, '2026/11/10/my-post.png'),
    ]);
    const files = await readdir(path.join(outputDirectory, '2026/11/10'));
    expect(files).toEqual(['my-post.png']);
  });

  it.each([
    { title: 'keeps existing cards', force: false, expected: 0 },
    {
      title: 'regenerates existing cards when forced',
      force: true,
      expected: 1,
    },
  ])('$title', async ({ force, expected }) => {
    const outputDirectory = path.join(tmp, 'og');
    await generateOgImages([post], { outputDirectory, author: 'Tim' });
    const actual = await generateOgImages([post], {
      outputDirectory,
      author: 'Tim',
      force,
    });
    expect(actual).toHaveLength(expected);
  });

  it('skips files without a date in their name', async () => {
    const undated = path.join(tmp, 'posts.11tydata.js');
    await writeFile(undated, '');
    const actual = await generateOgImages([undated], {
      outputDirectory: path.join(tmp, 'og'),
      author: 'Tim',
    });
    expect(actual).toEqual([]);
    await expect(stat(path.join(tmp, 'og'))).rejects.toThrow();
  });
});
