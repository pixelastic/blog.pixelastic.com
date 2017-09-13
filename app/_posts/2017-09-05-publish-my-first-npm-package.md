---
layout: post
title: "Publish my first npm package"
tags: npm, yarn, tachyons, css
---

I published my [first npm package][1] today. It's a micro-css framework, based
on [tachyons.css][2], but extended with Algolia-specific classes. What the
package actually do is not the point of this post, though.

What I'd like to share here are the tricks and workarounds I had to get right to
publish the final package on NPM.

## Having a script ready for release

I've reused a [release script][3] we've been using at Algolia on one of our
JavaScript project. It already handles all the nice dance of updating the
`develop` branch, switching to `master`, merging, updating the version number
and publishing to `npm`.

I've extended it a bit to add an actual build step, as I have to compile SCSS
files to final CSS (including a minified version).

## Not using yarn, but good old npm

Main problem I had was that I could run my `./scripts/release` script from the
command line and have everything uploaded, but if I ever did the same through
`yarn run release`, it would fail on the actual publish phase.

After some digging I found than `yarn` cannot read the `npm` credentials files
needed to publish. The solution is to run `npm run` instead of `yarn run`.

So I added a check at the start of my `./scripts/release` script to stop
execution if the script is not run from the context of `npm`. Turns out you can
do that by reading the `process.env._` variable that contains the path to the
binary that is executing the script.

```javascript
if (!process.env._.match(/npm$/)) {
  shell.echo('This script must be run with "npm run release"'.error);
  shell.echo('It will not correctly publish to NPM if used with yarn');
  process.exit(1);
}
```

That way, I won't forget that I need to run it through `npm` and not `yarn`.

## Publishing needed files

Once published, I tried to install it as a dependency in
another project and realized I was publishing unneeded files. I don't
need to publish my `./script` repository for example.

My package is also based on `tachyons`, so I include the SCSS source file of
tachyons in my own SCSS file to build the final CSS file. But I don't want to
publish all the sources files of tachyons when you're pulling my dependencies.

So I started fiddling with the `files` key of `package.json`. You're supposed to
put in here and array of all the filepaths (as globs) you'd like to include in
your final published package. You can also define a `.npmignore` file (with the
exact same syntax as a `.gitignore` file) that is used to exclude some files
from being publish.

The sneaky part here is that the `files` key has precedence over the
`.npmignore` file. And in my case I wanted to include the `./scr` directory, but
exclude the `./src/vendors` directory. No luck there for me.

In the end I had to completly ditch the `files` and use `.npmignore`. So instead
of defining a list of files to include and then exclude some specific files,
I had to define a list of all the files/directories I wanted to exclude. Not as
easy, but it works and I now have the built `.css` files as well as my source
`.scss` files in the final package.

## Fighting with the postinstall script

Now, the last bit was a bit more tricky. I use a `postinstall` script in
my `package.json` to automatically copy the `tachyons.scss` source files to
`./src/vendors` (the directory I want excluded from the previous step) from my
`node_modules`.

That way I don't have to commit `tachyons.css` files to my repo, but still have
it referenced in `package.json`, and pinned to a specific version. It keeps my
dependencies clear, and my repo lightweight.

The thing is, the `postinstall` hook is called both when you're manually running
`yarn install` locally, but also when your dependency is installed by someone
else. That was a big surprise for me. I could imagine that was the case at
first, for all the security implications this might cause (anyone could run an
arbitrary script as part of the `postinstall` hook of any deep depenency you
have in your project).

Still, I didn't want that to happen in my case because I actually excluded the
`./scripts/postinstall` script from my build, so the `postinstall` hook was
failing, and the whole installation of my package was failing.

After more than 10 releases to test it, I settled on a trivial solution.  At
first I tried to check if the `postinstall` hook was triggered as part of
a local or dependency install but could not find any reliable way to test it.

Instead, I checked if the `./scripts/postinstall` file was present, and run it
if so. Because I was excluding my `./scripts` folder from the published
packaged, the whole hook was not run when installed as a dependency.

Here is the final `postinstall` hook I used (the `true` is needed so the hook
actually succeed for the install to complete).

```json
{
  "scripts": {
    "postinstall": "(test -f ./scripts/postinstall && ./scripts/postinstall) || true"
  }
}
```


[1]: https://yarnpkg.com/en/package/tachyons-algolia
[2]: http://tachyons.io/
[3]: https://github.com/algolia/algoliasearch-helper-js/blob/develop/scripts/release.js
