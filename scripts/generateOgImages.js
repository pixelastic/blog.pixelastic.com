import { readFile, readdir } from 'node:fs/promises';
import { generateOgImages } from '../lib/og/index.js';

// Usage: node scripts/generateOgImages.js [--force] [post.md...]
// Without a post, generates the missing cards of every post
const args = process.argv.slice(2);
const force = args.includes('--force');
const posts = args.filter((arg) => arg !== '--force');

const site = JSON.parse(await readFile('src/_data/site.json', 'utf8'));
const filepaths = posts.length
  ? posts
  : (await readdir('src/posts')).map((file) => `src/posts/${file}`);

const written = await generateOgImages(filepaths, {
  outputDirectory: 'src/og',
  author: site.author.name,
  force,
});
console.info(`${written.length} card(s) written`);
