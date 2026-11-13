import { mkdtemp, readdir, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { generateOgImages } from '../generateOgImages.js';

describe('generateOgImages', () => {
  let tmp = null;
  let post = null;
  let options = null;
  const write = (title, body = 'Some content.') =>
    writeFile(
      post,
      `---\ntitle: "${title}"\ndate: 2026-11-10\ntags:\n  - zsh\n---\n\n${body}\n`,
    );
  const listCards = () =>
    readdir(path.join(options.outputDirectory, '2026/11/10'));
  beforeEach(async () => {
    tmp = await mkdtemp(path.join(os.tmpdir(), 'og-'));
    post = path.join(tmp, '2026-11-10-my-post.md');
    options = { outputDirectory: path.join(tmp, 'og'), author: 'Tim' };
    await write('My post');
  });
  afterEach(async () => {
    await rm(tmp, { recursive: true });
  });

  it('writes one card per post, with its hash in the name', async () => {
    const actual = await generateOgImages([post], options);
    expect(actual).toHaveLength(1);
    expect(path.relative(options.outputDirectory, actual[0])).toMatch(
      /^2026\/11\/10\/my-post\.[0-9a-f]{12}\.png$/,
    );
  });

  it.each([
    {
      title: 'keeps cards that are up to date',
      change: async () => {},
      expected: 0,
    },
    {
      title: 'keeps the card when the content changes but not the reading time',
      change: () => write('My post', 'Other content.'),
      expected: 0,
    },
    {
      title: 'writes a new card when the title changes',
      change: () => write('My new title'),
      expected: 1,
    },
    {
      title: 'writes a new card when the reading time changes',
      change: () => write('My post', new Array(500).fill('word').join(' ')),
      expected: 1,
    },
    {
      title: 'writes a new card when the author changes',
      change: async () => {
        options.author = 'Someone';
      },
      expected: 1,
    },
    {
      title: 'rewrites up to date cards when forced',
      change: async () => {
        options.force = true;
      },
      expected: 1,
    },
  ])('$title', async ({ change, expected }) => {
    await generateOgImages([post], options);
    await change();
    const actual = await generateOgImages([post], options);
    expect(actual).toHaveLength(expected);
  });

  it('deletes the obsolete cards of a post', async () => {
    const [first] = await generateOgImages([post], options);
    await write('My new title');
    const [second] = await generateOgImages([post], options);
    const actual = await listCards();
    expect(actual).toEqual([path.basename(second)]);
    expect(actual).not.toContain(path.basename(first));
  });

  it('deletes the card of the old naming, without hash', async () => {
    await generateOgImages([post], options);
    const legacy = path.join(options.outputDirectory, '2026/11/10/my-post.png');
    await writeFile(legacy, '');
    await write('My new title');
    await generateOgImages([post], options);
    const actual = await listCards();
    expect(actual).toHaveLength(1);
  });

  it('keeps the cards of other posts with a similar slug', async () => {
    const other = path.join(tmp, '2026-11-10-my-post-bis.md');
    await writeFile(other, '---\ntitle: "Bis"\n---\n\nSome content.\n');
    await generateOgImages([other], options);
    await generateOgImages([post], options);
    const actual = await listCards();
    expect(actual).toHaveLength(2);
  });

  it('skips files without a date in their name', async () => {
    const undated = path.join(tmp, 'posts.11tydata.js');
    await writeFile(undated, '');
    const actual = await generateOgImages([undated], options);
    expect(actual).toEqual([]);
    await expect(stat(options.outputDirectory)).rejects.toThrow();
  });
});
