---
layout: post
title: "Using pocket without webviews"
tags: pocket, markdown
---

I'm using [Pocket](http://getpocket.com/) a lot. Whenever I find an interesting
link, I add it to pocket to read it later. Then, whenever I have to take the
subway, or wait in a queue, I read the latest articles I added.

Pocket delivers a nice uncluttered API that lets you focus on what you're
reading, and remember where you were in an article so you can easily continue
where you left off.

Unfortunatly, this does not work when Pocket has to fallback to its webview
mode. Sometimes, when a page is not correctly formatted, Pocket can't convert
it.

More often than not, this made me stop reading the article altogether. But
I recently found a trick to help Pocket into converting the file.

## Markdown to the rescue

I love markdown. I write my blog posts in markdown because I love its
simplicity.

What I did is convert the page I want to add to Pocket to markdown, then upload
this page online to a service that will convert it back to html. I'm actually
only doing a `html > markdown > html` conversion, and it just works.

You first need to grab your file (`wget`), than convert it to markdown (I
personnaly use this [python
script](http://www.aaronsw.com/2002/html2text/html2text.py)). The final step is
simply to upload it to a service that can format markdown, like
[NoteHub](https://www.notehub.org/) or [GitHub
Gists](https://gist.github.com/). And finally add _this_ page to pocket.

Hope that helped. It made me able to add this [sed
page](http://www.grymoire.com/Unix/Sed.html) using this
[gist](https://gist.github.com/pixelastic/08f21ebf608322ed08e7).
