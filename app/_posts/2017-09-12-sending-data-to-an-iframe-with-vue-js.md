---
layout: post
title: "Sending data to an iframe with Vue.js"
tags: vuejs, iframe
---

Communicating from a parent window to a child iframe is a known problem in
JavaScript and has already been solved. How to do it in the context of a Vue.js
application is slightly different but based on the same principles.

I was confronted with the matter yesterday and had to find an elegant way to send
data (credentials) from the parent window to a child iframe from my Vue.js app.
Here's how I did it.

## Initial markup

Both the parent (main window) and child (iframe) need some specific markup for
this to work:

```jade
<!-- App.vue template -->
iframe(
  src='./iframe.html,
  v-on:load="onLoadIframe",
  name="myIframe"
)
```

```javascript
// App.vue script
function findIframeByName(name) {
  return _.find(window.frames, frame => frame.name === name);
}

export default {
  methods: {
    onLoadIframe(event) {
      const iframe = findIframeByName(event.currentTarget.name);
      iframe.doSomething({
        appID: "SECRET_APP_ID",
        apiKey: "SECRET_API_KEY"
      });
    },
  },
};
```

```html
<!-- iframe.html -->
<body>
  <script type="text/javascript">
    window.doSomething = function(parentData) {
      console.info(parentData);
    }
  </script>
</body>
```

## How does this work?

When you'll load `App.vue`, the template will be rendered and will create the
`iframe`, loading `iframe.html` in turn.

Because we added a `v-on:load` event on the `iframe`, we'll be able to know
__when__ the iframe will be loaded. At that point, we can read the
property `.currentTarget` of the fired `event`. 

This will give us a reference to the `iframe` HTML element. We can't do much
with the HTML element; we can't access the `window` object that is inside of it
directly.

But what we can do is reading its `name` attribute (`myIframe`). Then, using the
`findIframeByName` method, we will loop over all the `window.frames` elements
until we find the one that matches the name.

`window.frames` contains reference to all the sub-`window`s, so we can now start
calling any method defined in the global `window` namespace of the child
`iframe`. In our case, the `window.doSomething` method.

## tl;dr

The basic trick here is to wait for the iframe to load, then get hold of
a reference to its inside `window` object, to then call any globally available
method available in it.
