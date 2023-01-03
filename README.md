# blog.pixelastic.com

This repository holds all the content of my personal blog. 

This is an old project, first blog post dates from 2009. It has seen several
rewrite, from a custom set of PHP files, to a cakePHP version and now a Jekyll
+ Grunt mix.

Now, it's 2023 and I wanted to update it and of course nothing works anymore.
Below are my notes on resurecting it:

- Install ruby deps with `bundle install`
- Install `grunt-cli` and `bower` globally
- Install bower (yes, bower) deps with `bower install`
- Create `_algolia_api_key` file, it's required
- Install npm (yes, it *needs* npm) with `npm install`
- If things don't work, remove the `package-lock.json` and `node_modules` and
  retry `npm install`
- Cross your fingers
- Run `npm run build`
