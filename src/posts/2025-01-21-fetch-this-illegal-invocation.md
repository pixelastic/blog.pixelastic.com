---
layout: "post"
title: "Fetch this: Illegal invocation in Cloudflare Workers"
tags: javascript
---

![](/img/files/2025-01-21-fetch-this-illegal-invocation/header.png)

If you write anything in JavaScript, you've certainly encountered the `this` keyword, and wondered what is `this`? Even if you're an experienced JS dev, sometimes `this` can bite you in unexpected ways.

This happened to me today, while porting a codebase from the [got](https://github.com/sindresorhus/got) library, to the builtin `fetch` method. I had a method to write that was doing a bunch of API calls (using `fetch`), massaging the data I got from one endpoint, and sending it to another.

To unit-test that method, I didn't want to do actual API calls, but rather mock the calls, and return fake data to simulate a real call exchange. My test needed to assert that one of the calls in the pipeline was using the right headers.

```
// main.js
export default {
  async run() {
        // Here I do a bunch of chained API calls
        // [...]
  },
  __fetch: fetch
}

// __tests__/main.js
vi.spyOn(main, '__fetch').mockReturnValue({...});
```

Instead of using `fetch` directly in my `run` method, I added the `__fetch` key into my object, and would call `this.__fetch` instead. That, way, I could `spyOn` the method and mock the returned value. As `main.__fetch` would become a mocked function, I could also run asserts on it to check if it had been called enough times and with the right number of arguments.

That works perfectly and my tests all pass \o/

### But it fails in production

Weirdly enough, even if tests are passing, the code doesn't actually work in production once deployed to Cloudflare workers. What I got instead was a nice `TypeError: Illegal invocation: function called with incorrect this reference` error.

Turns out it's a well known and documented type of error on Cloudflare Workers. Their documentation even [has a dedicated part about it](https://developers.cloudflare.com/workers/observability/errors/#illegal-invocation-errors). 

![](/img/files/2025-01-21-fetch-this-illegal-invocation/01-d3fcb945db.png)

What's happening is that once the code is bundled with `esbuild` before being sent to Cloudflare workers, the reference to `this` inside of `fetch` is lost.

### The solution

The fix is surprisingly simple. Instead of attributing `__fetch` as a reference to `fetch`, all I had to do was to define a new function that would simply call `fetch`.

```
export default {
  async init() {
        // Here I do a bunch of chained API calls
        // [...]
  },
  __fetch: async function(url, options) {
        return await fetch(url, options)
  }
}
```

This creates a wrapper around `fetch`, so its `this` isn't lost.

This might look like repetitive code, but the wrapper actually has a use. I made sure to add a comment around that wrapper so future me doesn't inadvertently "optimize" the code and break it.