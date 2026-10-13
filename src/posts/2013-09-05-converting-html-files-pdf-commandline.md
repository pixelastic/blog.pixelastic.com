---
layout: post
title: "Converting html files to pdf from the commandline"
custom_v2_id: 352
tags: pdf, html2pdf, wkhtmltopdf, html, css
---

When you need to convert an `html` file to a `pdf`, often the default `pdf`
printer of your OS is enough. For those times when you need a much better
rendering, you need a better tool.

I had to convert my `html`/`css` resume to a `pdf` file today. The default
`pdf` printer on Ubuntu was discarding the background color and adding useless
margins.

I finally resorted to using
[wkhtmltopdf](http://code.google.com/p/wkhtmltopdf/). It does the job, but
needs a few tweaks. First, you have to add `-T 0 -R 0 -B 0 -L 0` to remove the
margins. Then, you have to use the `file://` notation to target a local file.
Also, it does not understand the css properties `page-break-after` nor `page-
break-before`. I had to manually add padding in my elements to stop them from
being cut in between two pages. But worst of all, it chokes on UTF-8
characters in filenames.

In the end, I wrote a small ruby wrapper around wkhtmltopdf to work around all
those issues for me and called it [html2pdf](https://github.com/pixelastic/oro
shi/blob/master/scripts/bin/html2pdf).
