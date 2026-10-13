import { migrateFrontMatter } from '../lib/migrateFrontMatter.js';

// Usage: node scripts/migrateFrontMatter.js <post.md>...
await migrateFrontMatter(process.argv.slice(2));
