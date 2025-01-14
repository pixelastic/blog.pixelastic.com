---
layout: "post"
title: "My journey through the ESM Tree Shaking forest"
tags: cloudflare workers, esm, javascript
---

I had to work with Cloudflare Workers recently, and everything worked well until one day one of the HTTP calls I was doing started to fail.

When I ran the same piece of code locally it worked (obviously!). But pushed and ran through Cloudflare Workers, it failed. This was the first step in what then became a day-long trip into the rabbit hole of debugging. After a couple of hours of debugging "live" (by pushing my code, hitting the server, and checking logs), I finally discovered that my issue was that the HTTP endpoint I targeted had a rate limit, based on the originating IP. And when doing calls from Cloudflare, sharing the same IP with other workers, the IP already had hit the limit and my calls would fail.

That made me start digging into better ways to locally test CFW production code, and I discovered the `wrangler dev` mode. At first I thought this would spin my code on a real remote server and broadcast the `console.log` locally to my terminal, but no, it's a minimal version of CFW that runs locally. Not exactly the same as a staging env, but pretty close.

![](/img/files/2025-01-14-journey-esm-tree-shaking/01-806de5f47a.png)

The main difference with running my scripts locally through unit tests is that when using `wrangler dev`, my code is bundled with `esbuild` and the bundled version is executed. This opened a whole new category of problems and questions to me.

First, I realized that the bundle size was way too big for what my function was actually doing. I had ~100 lines of code at most, but my bundle was several megabytes of minified code. Surely, something wasn't right. By inspecting the bundled code I realized that it had bundled all my dependencies and subdependencies.

### But, isn't it supposed to do tree shaking?

I had read that `esbuild` was the new hotness, and that it should do tree shaking my dependencies automatically, keeping only what I would actually use. But somehow, it didn't seem to work.

![](/img/files/2025-01-14-journey-esm-tree-shaking/02-69c9ac843f.png)

What I learned is that tree-shaking is not possible through the virtue of `esbuild` alone. Modules have to be in ESM as well (so, basically using `import` rather than `require`) for it to actually work. So I updated my dependencies to their latest versions; most of them are now ESM-compliant.  I managed to upgrade all my deps to ESM, and with that, `esbuild` was now able to tree shake the final bundle, reducing my filesize footprint to something 10 times smaller \o/.

### ESMify all the things

One of the dependencies was actually one of my own modules, [firost](https://projects.pixelastic.com/firost/), and let me tell you that converting a CommonJS module to ESM is not a trivial task. It's certainly doable, but it does take some time, especially when you have several intertwined modules, some in CommonJS and others in ESM.

I especially had to be careful to use named exports rather than God Objects in my files, to avoid pulling all dependencies with a greedy import. The restructuring of files and import was tedious and long. I also had to ditch Jest (that does not support ESM) in favor of Vitest. I also updated ESLint to its latest version, which finally also supports ESM!

### Lodash, you're next

The only dependency I didn't manage to shave off was `lodash`. I really like lodash, especially the `_.chain().value()` syntax, which I think makes expressing complex pipelines easier. But `lodash` still seems to be loaded as a monolithic block, even though I'm only using a few of its methods. I didn't dig too much into how to load it in a more clever way, but that's on my TODO list.

I also needed to include `cheerio` (because my worker is doing some scraping + HTML extraction), but couldn't find a way to load a leaner alternative (`domjs` is roughly the same size, and I prefer the API from `cheerio`)