---
layout: post
title: "Sass UTF-8 encoding on Windows"
tags: sass, compass, windows, utf8
---

Ever had your UTF-8 string wrongly encoded in your output `.css` files when
using Sass ? Well, it might be an issue with the way Sass determines the
encoding of your files.

Starting from Ruby 1.9, Sass will now try to guess the encoding of your sources
files before processing them. The algorithm used is [defined in the
documentation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#encodings)
but comes with a few caveats.

It will first check for the [BOM](http://en.wikipedia.org/wiki/Byte_order_mark)
in your file, and if found will consider the file as being UTF-8. Using BOM is
a very bad practice when dealing with UTF-8 and you should absolutely not
include it.

So, if no BOM is found, Sass will then look for a `@charset` definition. It
looks for it exactly as the very first character on the very first line of the
document. If not found, it will then use the Ruby default encoding.

And when you're on windows, the default encoding is usually `CP1252`. And in
the end, you end up with every `UTF-8` char encoded as three separate `CP1252`
chars.

## Solution ?

Well, as adding a BOM is definitely not possible, you could add a `@charset`
rule on top of EVERY SINGLE SASS FILE. Which is not a good solution either.
Changing the encoding OS-wide is not better.

What you can do is force the output encoding with the `-E` switch when using sass on
the commandline : `sass -E utf-8 main.css`. And this will correctly convert
everything.

Unfortunatly, if you're using Compass in addition to Sass, there is no easy way
to pass this switch to the underlying sass. What you can do instead is editing
the `config.rb` file that comes with your Compass project and add the
`Encoding.default_external = 'utf-8'` line. This will change the Ruby default
encoding and output utf8 correctly.

But hey, what if you're using compass through the `grunt-contrib-compass` task
? There is no `config.rb` file that you can edit, and the task does not expose
the needed configuration switch. Your only solution is to use the `raw` option
to pass the `Encoding.default_external` config.

```js
{
  options: {
    raw: 'Encoding.default_external = \'utf-8\'\n'
  }
}
```

Mind the `\n` at the end and the quote escaping. This is needed for the task to
correctly parse.

Hope this helped. Note that all this tweaking is not necessary if you're using
Ruby 1.8.


