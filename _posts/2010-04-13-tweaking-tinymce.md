---
layout: post
title: "Tweaking tinyMCE"
custom_v2_id: 74
tags: tinymce, skins, tweak
---

I'm in the process of tweaking a tinyMCE install to use a custom set of
plugins and a custom skin to better fit in the Caracole CMS. This would allow
me to re-use CSS and JS code I've already coded.

Fortunatly, I'm getting better and better at understanding the way tinyMCE
works and the various configuration options and how to tweak them.

I also want the tinyMCE CSS rules to be integrated into the main CSS file of
my app (packed and minified using CSSTidy). So I defined a custom skin in the
tinyMCE setup, named '`caracole`'. This way, all the CSS skinning classes will
be prefixed with `caracole `as I don't want to mess with the default skins.

I also copied the `ui.css` file from the `themes/advanced/skins/default` to my
own css directory, renamed it to `tinymce.css`, replaced all `.default`
occurences to `.caracole` and added this file to the list of files being
processed by the main packer.

This way I can easily update any css file from the same directory, without
having to dive into the tinymce subdirectories.

Unfortunatly, by doing so, tinyMCE continue to load the
`tiny_mce/themes/advanced/skins/caracole/ui.css` file (have a look at Firebug
if you don't trust me). It took me some time to figure out where that call was
made from. It is actually on `editor_template.js` (around line 150 in dev
version).

As I didn't want to load this file twice, I tried to disable this call. I
could have manually patched the source file but I don't want to, it would make
any future update a pain. So I tried to find an other way.

Looking at the `loadCSS `method, it appears that there is a mechanism to
prevent loading twice the same file. If the file is already present in the
`.files` array, it won't be added. Ok, so now I just have to manually add the
file before the call is made.

That's where the setup callback come into play. I just defined in my
inyMCE.init :


```js
tinyMCE.init({
  skin: 'caracole',
  editor_css: 'caracoleDoNotInclude',
  setup: function(editor) {
    tinymce.DOM.files['http://'+document.domain+'/caracoleDoNotInclude'] = true;
  }
}
```

Doing so, the `loadCSS `will try to load the `caracoleDoNotInclude` file
(clearly this name is a placeholder, I have no such file). And in the setup
method I manually tell tinyMCE that this file is already loaded so when it
will initiate, it won't load the file at all.

Same goes for the `content_css`, the file that handle the look and feel of the
editable zone. I don't want to have my file in the tinyMCE skin directory, I'd
rather have it with my other CSS files.

So I defined a custom `content_css` to point to my file. I also had to update
the setup method to mark the file as already loaded. But this time, as the
file is loaded on a per instance basis, this is the `editor.dom.files` that I
have to update, not the general `tinymce.DOM`.

Fortunatly, the latest tinyMCE version expose their event API, so it was just
a matter of defining the following event in the main setup :


```js
setup: function(editor) {
  tinymce.DOM.files[baseUrl+'caracoleDoNotInclude'] = true;
  editor.onPreInit.add(function(editor) {
    editor.dom.files[baseUrl+'js/vendors/tiny_mce/themes/advanced/skins/caracole/content.css'] = true;
   });
 }
```

## Edit :

Note that in the latest tinyMCE version, the code is slightly different
because you have to call a special method on the url before adding it to the
`editor.dom.files`


```js
editor.onPreInit.add(function(editor) {
  editor.dom.files[editor.baseURI.toAbsolute('http://'+document.domain+'/js/vendors/tiny_mce/themes/advanced/skins/caracole/content.css')] = true;
});
```