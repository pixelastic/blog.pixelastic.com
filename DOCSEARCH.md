# DocSearch

The search box in the sidebar opens the Algolia DocSearch modal. The script and
stylesheet come from `@docsearch/js` and `@docsearch/css`, copied to `/vendor/`
by `eleventy.config.js`.

The credentials (application id, public search-only API key, index name) live in
`src/_data/site.json` under `docsearch`. Update them when the crawler index
changes.

## Setup in the Algolia dashboard

The DocSearch application, the domain verification and the crawler are created
by the author. None of it is automated in this repository.

1. Apply for DocSearch and verify the `blog.pixelastic.com` domain.
2. Create a crawler with the configuration below.
3. Copy the application id, the search-only API key and the index name into
   `src/_data/site.json`.

## Crawler configuration

```js
new Crawler({
  appId: 'O3F8QXYK6R',
  indexPrefix: '',
  rateLimit: 8,
  startUrls: ['https://blog.pixelastic.com/'],
  sitemaps: [],
  ignoreCanonicalTo: false,
  discoveryPatterns: ['https://blog.pixelastic.com/**'],
  exclusionPatterns: [
    // Tag pages
    'https://blog.pixelastic.com/tags/**',
    // Archive index
    'https://blog.pixelastic.com/archive/**',
    // Date archives: /YYYY/, /YYYY/MM/ and /YYYY/MM/DD/
    'https://blog.pixelastic.com/[0-9][0-9][0-9][0-9]/',
    'https://blog.pixelastic.com/[0-9][0-9][0-9][0-9]/[0-9][0-9]/',
    'https://blog.pixelastic.com/[0-9][0-9][0-9][0-9]/[0-9][0-9]/[0-9][0-9]/',
    // Paginated home pages
    'https://blog.pixelastic.com/page*/**',
  ],
  actions: [
    {
      indexName: 'blog',
      pathsToMatch: ['https://blog.pixelastic.com/[0-9][0-9][0-9][0-9]/*/*/*/'],
      recordExtractor: ({ $, helpers }) =>
        helpers.docsearch({
          recordProps: {
            lvl0: { selectors: '', defaultValue: 'Posts' },
            lvl1: 'article h1',
            lvl2: 'article h2',
            lvl3: 'article h3',
            lvl4: 'article h4',
            content: 'article p, article li',
          },
        }),
    },
  ],
});
```

## What is excluded

| Pages                          | Path                      | Also excluded by                     |
| ------------------------------ | ------------------------- | ------------------------------------ |
| Tag index and tag pages        | `/tags/`, `/tags/<slug>/` | `<meta name="docsearch:exclude">`    |
| Archive index and date archives | `/archive/`, `/YYYY/`, `/YYYY/MM/`, `/YYYY/MM/DD/` | `<meta name="docsearch:exclude">` |

Tag and archive templates set `docsearchExclude`, which emits
`<meta name="docsearch:exclude" content="true">`. The crawler honors it even if
an exclusion pattern is missing.

Only post pages (`/YYYY/MM/DD/<slug>/`) are indexed.
