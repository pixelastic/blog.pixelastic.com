---
layout: post
title: "This blog now has an API"
tags: api, blog, jekyll
---

## An API, really ?

Well, sort of.

All posts can now be accessed in a `json` format (just replace the final `/`
with a `.json`). This is obviously a read-only API.

For example, my [previous post][previous post] is accessible in `json` format
[here][previous post json].

```json
{
  "id": "/2014/12/27/past-and-future-objectives",
  "title": "2014 learnings and 2015 objectives",
  "url": "http://blog.pixelastic.com/2014/12/27/past-and-future-objectives/",
  "tags": [],
  "date": "2014-12-27 00:00:00 +0100",
  "html": "<p>This is the end of the year, and I do realize now that [...]",
  "markdown": "This is the end of the year, and I do realize now that [...]"
}
```

It currently exposes the initial text in markdown as well as the formatted HTML
text, along with some metadata (id, url, date and tags).

I had a need to have my post in `json` format for processing them through
Grunt, so I thought I might as well expose them publicly. I'm not sure people
will ever use it, but at least it does exist !

## How was it done ?

Jekyll lets you plug custom made scripts to be called in the generation process
in an aptly named `_plugins` directory. I just had to create
a [json.rb][json.rb] file that will take every post and create a new json page
from them, using a very minimalistic [post.json][post.json] layout.

All I had to do was build the custom object I wanted to return, which was a mix
of generated content, and metadata.

[previous post]: http://blog.pixelastic.com/2014/12/27/past-and-future-objectives/
[previous post json]: http://blog.pixelastic.com/2014/12/27/past-and-future-objectives.json
[json.rb]: https://github.com/pixelastic/blog.pixelastic.com/blob/master/app/_plugins/json.rb
[post.json]: https://github.com/pixelastic/blog.pixelastic.com/blob/master/app/_layouts/post.json
