---
title: "Migrating from Jekyll to Eleventy"
tags:
  - eleventy
  - jekyll
  - ai
  - claude-code
---

I started this blog in 2009. At the beginning, I posted a lot, mostly as a way
to document my troubles for others (and for myself). Along the year, I moved
away from writing, not because I had nothing to say anymore, but because I went
more and more into public speaking instead.

Recently, AI-assisted blog writing made me want to come back to sharing my prose
online, and while I was at it I decided to migrate the stack from Jekyll to
Eleventy, and redesign the blog while I was at it.

This post is an attempt at documenting that process that took me about 2 days,
where I would have probably spent months on it before.

## Picking an engine

This repo has 320 posts and ran on Jekyll 3.6, with Ruby, Grunt, Bower, Sass,
and even jQuery. I wanted to move to a more modern stack, and the choices I had
in mind were between Hugo, Astro and Eleventy.

I had already tried Hugo on `painting.pixelastic.com`, and now I wanted to
compare with something else. Hugo is really as fast as people say, but I don't
know how to write good Go, and I wanted to test a JavaScript contender, where I
have more experience.

I decided to not try Astro this time mostly because I had wanted to try Eleventy
for a long long long time. The fact that it's still relevant today, is a sure
sign it's a solid stack. Next time I need to migrate a static website I'll try
Astro, I promise.

## Part 1: migrating the code

Here I called my custom `/plan` skill, which has the agent write a PRD and split
it into 9 individual issues covering the skeleton, content migration, tags,
archives, feeds, tests, the Tailwind layout, and various cleanups.

I kept the redesign out of scope here (see part 2), the goal was to have the
default Eleventy layout, but with all my content.

Thoughout the migration, it also fixed some inconsistency I had in my posts: mix
of Windows/Linux line ending, mixed case tag collision, and even duplicated
posts at various dates.

Once done, no more Ruby in the codebase, only JS. Note that I didn't review the
code there; my goal was having something that worked, so I could keep posting. I
told myself I would review the code later.

## Part 2: the redesign

For the reddesign I first made a `/grill-me` session with Claude, starting with
a very vague setup ("_I want to redesign my blog into something more modern_"),
then through questions we managed to nail it down more precisely.

This question/answer loop made it emerge that I wanted something dark-themed,
reminiscent of the time I spend at a terminal, re-using some of the visual
language of a CLI (like the `~/pixelastic` header), and using my **real** neovim
colorscheme.

Claude then transformed that into a prompt for v0, that I pasted 4 times into 4
different v0 windows :

![Version 1: monospace post titles with underline, a green "$ ls posts/" label and plain-text tags](/img/files/migrating-blog-from-jekyll-to-eleventy/v0-option-1-mono-titles-ls-posts.png)

![Version 2: bold post titles and tags as bordered chips, with a prompt arrow next to the site name](/img/files/migrating-blog-from-jekyll-to-eleventy/v0-option-2-bold-titles-tag-chips.png)

![Version 3: a large "Notes from the command line" hero in thin monospace, with a cyan highlight](/img/files/migrating-blog-from-jekyll-to-eleventy/v0-option-3-command-line-hero.png)

![Version 4: a large "Things I learned while building" hero in bold sans-serif, with breadcrumbs](/img/files/migrating-blog-from-jekyll-to-eleventy/v0-option-4-things-i-learned-hero.png)

This approach worked well for me because I felt I was one of those horrible
customers coming to see a designer with nothing more than "_I don't know what I
want, but I'll now when I'll see it_". Thankfully, the AI doesn't shy from those
requests, so seeing 4 different iterations made me realize what is important for
me and what I don't like.

Out of the 4 versions above, version 2 was the one I liked the most. I then
exported the zip from V0 and told Claude to integrate it into Eleventy.

From there, I did a lengthy chat with it, telling it one by one everything I
wanted to change, waited for it to change, then move to the next item. Those
were things like:

- make the main column wider on desktop;
- make sure titles do not overflow that column;
- reuse the colors from my own `colors.jsonc` in my dotfiles;
- move some items from the header to the footer.

Here, I didn't follow a clear `/plan` like in the first part. It really was an
"old-school" prompting session of "do this", "no, do that instead", "actually I
liked the first version better".

## This is just the beginning

Now that the migration is done, I still have some work to do. For example, I
still care about the generated code and I want to review it, to understand how
Eleventy works, and what's the best way to organize my code in it.

I will also fix small reading issues here and there, improve the mobile
experience, migrate the site to Netlify, etc.
