---
layout: post
title: "Importing iframe with Webpack and Vue.js"
tags: vuejs, webpack, iframe
---

I've spent hours on a webpack + Vue.js + iframe issue yesterday. As I don't
want all those hours to be completly wasted, I'm going to document my issue and
the final solution.

## The problem

I'm working on a Vue.js application, using Webpack for building all the assets.
One of the pages need to include an iframe, loading a stand-alone
`keen-explorer.html` file. 

My problem was that the `keen-explorer.html` was not included in the final build
and resulted in a 404.

## Context: Why do I need to do that?

I need to instanciate a Keen.io explorer dashboard from inside my app. The
`keen-explorer` JavaScript module cannot be `import`ed from a script, as far as
I can tell. It needs to be loaded inside the global `window` object, along with
its dependencies (Bootstrap and jQuery).

I tried different ways to include it in my final Webpack build, but the
iframe was the best solution I could find as it will isolate all the
external dependencies from the rest of my app.
Anyway, back to the problem at hand.

## Naive approach and first 404

I'm using `vue-loader` to parse the content of my `.vue` files. Here is my
template (using pug):

```jade
iframe(src="html/keen-explorer.html")
```

If I run webpack, if finishes without any error, but when loading the
application, I have a 404 as `html/keen-explorer.html` cannot be found. Webpack
did not include it in the final build and considered the `src` as any other
attribute with no particular meaning.

## Making vue-loader require iframe sources

Turns out that `vue-loader` does not automatically import the `iframe[src]`
values by default. You have to update your webpack config to define what it
should parse:


```javascript
module: {
  rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        transformToRequire: {
          iframe: 'src',
        },
      },
    },
  ],
}
```

Now, if I rerun webpack, I have an error because webpack can't find
`html/keen-explorer.html`. We're making progress, at least it tries to import
it.

## Fixing the filepath issues

`vue-loader` seems to treat all assets in the template as relative to the final
output, while here I'm trying to reference a file present in my `src/html`
directory.

First thing to do was to define a `resolve` alias in webpack to tell it where to
look for files that starts with `html/` using the following config:

```javascript
resolve: {
  alias: {
    html: path.resolve(__dirname, 'src', 'html'),
  },
},
```

Then, you should not forget to prepend your `src` value with a `~` in the
template, to tell `vue-loader` that this should be resolved as an import.

```jade
iframe(src="~html/keen-explorer.html")
```

Rerunning webpack results in no more filepath errors. The file is found and
included in the final build.

Problem is... the filepath has been replaced by the __content__ of the file, not
its path in the final build. That means that my `iframe` is now trying to load
`<doctype>[...]`, which does not work at all.

## Replacing the file with its built filepath

We're approaching the end and the solution is near. The last thing missing at
that point is a way to replace the imported file by its built filepath in the
final output.

Thankfully, that's what the `file-loader` loader is for:

```javascript
module: {
  rules: [
    {
      test: /\.html$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[hash].[ext]',
          },
        }
      ],
    },
  ],
},
```

Doing so I can have an `iframe` with a `src` set to the relative filepath to the
built html file.

## Conclusion

It took me about 25mn to write this article, but more than 6h to hunt and debug
this issue from start to finish (not counting all the wrong leads trying to
embed the iframe in base64).

To recap, if you want to load a standalone iframe from your Vue.js application
suing webpack you need to:

1. Configure `vue-loader` so if follows `iframe[src]` attributes
2. Prepend `~` to your `src` values
3. Configure the resolve alias so filepath can be resolved by webpack
4. Add a `file-loader` to process `.html` pages
