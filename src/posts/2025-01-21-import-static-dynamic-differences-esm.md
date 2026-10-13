---
layout: "post"
title: "Differences between static and dynamic imports in ESM"
tags: javascript
---

![](/img/files/2025-01-21-import-static-dynamic-differences-esm/header.png)

This article has probably be written hundreds of times already, so I don't think I'm adding anything new to the overall tech knowledge online, but hey writing it will probably help me remember it better.

In modern (ie. ESM) JavaScript, you no longer use the old `require()` method to load your dependencies; you use `import` instead. What I didn't really realize at first when I started migrating my codebase to ESM was that `import` comes in two flavors: **static imports** and **dynamic imports**.

Let's assume the following two dependency files:

```
// defaultExport.js
export default {
  name: 'Tim',
};

// namedExport.js
export const greetings = function greetings(name) {
  console.info(`Hello ${name}!`);
};
```

The first one is doing what we call a default export (using `export default`). The other is doing a named export (using `export {something}`).

### Static imports

```
import config from './defaultExport.js';
import { greetings } from './namedExport.js';

greetings(config.name); // Hello Tim!
```

Using **static imports**, I can import either the default export with the `import name from ‘./path.js` syntax, or a named export with `import { name } from ‘./path.js` (the difference is in the `{ }` wrapping the name).

**The good:** They sit at the top of the file, defining the needed dependencies. They are a staple of ESM, and allow for tree shaking your dependencies (ie. removing all dead code). They should be the most common kind of imports.

**The bad:** As they load dependencies statically, they won't "fail" in case of a cyclic dependency by default (you'll only realize something is broken in production, when suddenly one of your deps is `undefined`). Thankfully ESLint [can help you catch this](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md).

### Dynamic imports

```
const config = (await import('./defaultExport.js')).default;
const { greetings } = await import('./namedExport.js');

greetings(config.name); // Hello Tim!
```

Using **dynamic imports**, I can still import both default exports and named imports, but there are a few subtle differences to keep in mind. The `await import()` call returns an object that contains _all _the exports of the module, both `default` and named. 

**The good: **If you need to access named imports, the change in syntax is trivial. The `{ }` now acts as an object destructuring, and allows you to access and define only the keys you're interested in.

**The bad: **Access default exports though requires you to specifically target the `.default` key of the returned object. Because `import` is asynchronous, it also requires you to wrap your `await import()` call in `( )` to actually return the `.default` key of what the promise returns, rather than the `.default` key of the promise itself (that doesn't actually exist).

### What to use when?

I tend to use **static imports** 90% of the time. 

I only ever use **dynamic imports** when:

- I need the module to specifically be loaded at a certain point in time (maybe because I don't yet have all the config ready before that)
- The module is slow to load (it does a lot of stuff when imported) and I want to delay that to a more appropriate time.
- I have a wrapper function that can do a bunch of different things, and I want to only load the required dependency modules based on what the function will actually need.

When this happens, I make sure that I don't forget to grab the `.default` key (but as I tend to prefer named exports anyway, most of the time the change doesn't require much thought).