---
layout: post
title: "Preventing tinyMCE from wrapping <img /> in <p>"
custom_v2_id: 231
tags: onbeforesetcontent, oninit, tinymce, javascript
---

If you just want to add a presentational image in a tinyMCE editor, you'll
find out very quickly that it will be wrapped in `<p></p>` without you asking.

The question has been asked several times on the tinyMCE forums, but the
answers never quite satisfied me. It ranges from the classical "_Why do you
want to do this ? You should better use `<insert semantic element and css
here>`_" to "_Just do a regexp before displaying your content to remove the bad
`<p>...</p>`_".

This clearly did not satisfy me.

The solution was to define the` forced_root_block` setting value to `false`,
allowing us to create any element on the top level, and not having it
automatically wrapped in `<p>.`

## Fixing the side effect

Allowing for elements to be input directly in the root level has the nasty
side effect of creating tinyMCE editor instances with a default text of, well,
nothing, instead of the really usefull `<p>` tag. Also, if you do a Ctrl+A and
delete all content, you'll end up with an empty editor without the initial
`<p>` tags

To fix this part, I just added an `onNodeChange `event to fire every time the
content is changed. I test the current content and if empty add the `<p>` tag.
There is a little subtelty though, to correctly place the caret where needed.

In your `tinyMCE.init` call, just add the following setup key :


```js
tinyMCE.init({
[...]
  setup: function(editor) {
    editor.onNodeChange.add(function(editor, cm, e, c, o) {
      var editorContent = editor.getContent();
      if (editorContent==="") {
        // We set content as a <p> containing a placeholder, then we delete the placeholder to place the caret
        editor.setContent('<p><span id="__CaretPlacholder">Placeholder</span></p>');
        editor.selection.select(editor.dom.select('#__CaretPlacholder')[0]);
        editor.dom.remove(editor.dom.select('#__CaretPlacholder')[0]);
      }
    });
   }),
[...]
 });
```

Before finding this solution, I tried the `onBeforeSetContent `callback, but
due to a bug in the tinyMCE source, it couldn't handle well the case where the
editor is empty. So I had to resort to a more generic callback.