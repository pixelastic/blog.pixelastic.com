import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import EleventyBuilder from '@11ty/eleventy';

describe('site build', () => {
  const outputDirectory = path.resolve('_site');
  // Map a public URL to its file in the build output
  const filepath = (url) =>
    path.join(outputDirectory, url.endsWith('/') ? `${url}index.html` : url);
  const find = (url) =>
    existsSync(filepath(url))
      ? { url, content: readFileSync(filepath(url), 'utf8') }
      : undefined;
  const matchAll = (content, regexp) =>
    [...content.matchAll(regexp)].map((match) => match[1]);

  beforeAll(async () => {
    const eleventy = new EleventyBuilder(undefined, undefined, {
      configPath: 'eleventy.config.js',
    });
    await eleventy.write();
  }, 120_000);

  describe('/feed.xml', () => {
    it('is an RSS 2.0 feed', () => {
      const actual = find('/feed.xml').content;
      expect(actual).toContain('<rss version="2.0"');
      expect(actual).toContain('<title>Pixelastic</title>');
      expect(actual).toContain(
        '<description>Personal blog of Tim Carry. Posting mostly on tech-related stuff.</description>',
      );
      expect(actual).toContain('<link>http://blog.pixelastic.com/</link>');
    });

    it('lists the 10 latest posts, newest first', () => {
      const { content } = find('/feed.xml');
      const items = content.split('<item>').slice(1);
      expect(items).toHaveLength(10);

      const actual = matchAll(content, /<guid[^>]*>([^<]+)<\/guid>/g);
      expect(actual).toEqual([...actual].sort().reverse());
      expect(actual[0]).toMatch(
        /^http:\/\/blog\.pixelastic\.com\/\d{4}\/\d{2}\/\d{2}\//,
      );
    });

    it('exposes title, link, date and content for each item', () => {
      const [item] = find('/feed.xml').content.split('<item>').slice(1);
      expect(item).toMatch(/<title>.+<\/title>/);
      expect(item).toMatch(/<link>http:\/\/blog\.pixelastic\.com\/\d{4}\//);
      expect(item).toMatch(
        /<pubDate>[A-Z][a-z]{2}, \d{2} [A-Z][a-z]{2} \d{4} /,
      );
      expect(item).toMatch(/<description>[\s\S]+<\/description>/);
      expect(item).toMatch(/<guid isPermaLink="true">http:/);
    });
  });

  describe('/atom.xml', () => {
    it('is an Atom feed with its metadata', () => {
      const actual = find('/atom.xml').content;
      expect(actual).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
      expect(actual).toContain('<title>Pixelastic</title>');
      expect(actual).toContain(
        '<link href="http://blog.pixelastic.com/atom.xml" rel="self"/>',
      );
      expect(actual).toContain('<id>http://blog.pixelastic.com/</id>');
      expect(actual).toContain('<name>Tim Carry</name>');
    });

    it('lists the posts, newest first', () => {
      const { content } = find('/atom.xml');
      const actual = matchAll(content, /<entry>[\s\S]*?<link href="([^"]+)"/g);
      expect(actual.length).toBeGreaterThan(10);
      expect(actual[0]).toMatch(/^http:\/\/blog\.pixelastic\.com\/\d{4}\//);
      expect(actual).toEqual([...actual].sort().reverse());
    });
  });

  describe('home pagination', () => {
    it.each([
      {
        title: 'first page',
        url: '/',
        newer: '<span class="text-gray-400">Newer</span>',
        older: 'href="/page2/">Older</a>',
      },
      {
        title: 'second page',
        url: '/page2/',
        newer: 'href="/">Newer</a>',
        older: 'href="/page3/">Older</a>',
      },
      {
        title: 'third page',
        url: '/page3/',
        newer: 'href="/page2/">Newer</a>',
        older: 'href="/page4/">Older</a>',
      },
    ])('$title is at $url', ({ url, newer, older }) => {
      const actual = find(url).content;
      expect(actual).toContain(newer);
      expect(actual).toContain(older);
    });

    it('lists 5 posts per page, newest first', () => {
      const first = matchAll(
        find('/').content,
        /<h1 class="text-3xl font-bold">\s*<a href="([^"]+)"/g,
      );
      const second = matchAll(
        find('/page2/').content,
        /<h1 class="text-3xl font-bold">\s*<a href="([^"]+)"/g,
      );
      expect(first).toHaveLength(5);
      expect(second).toHaveLength(5);
      expect([...first, ...second]).toEqual(
        [...first, ...second].sort().reverse(),
      );
    });

    it('does not create /page1/', () => {
      expect(find('/page1/')).toBeUndefined();
    });
  });

  describe('static pages', () => {
    it.each([
      '/about/',
      '/404/',
      '/robots.txt',
      '/humans.txt',
      '/keybase.txt',
      '/google4d2d90cd348b2f78.html',
      '/favicon.ico',
      '/download/bbpress.rar',
    ])('%s exists', (url) => {
      expect(existsSync(filepath(url))).toBe(true);
    });
  });
});
