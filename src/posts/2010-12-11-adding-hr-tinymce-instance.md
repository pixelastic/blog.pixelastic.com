---
layout: post
title: "Adding a <hr> in a tinyMCE instance"
custom_v2_id: 249
tags: jquery, tinymce, hr, mceinsertcontent
---

When using the default tinyMCE implementation to add an `<hr>` element to the
editor content, the `<hr>` is added inside its parent `<p>` element (when it
should be an element on its own, without such a parent).

I've added my own plugin to resolve this small issue, here is the code :


```js
(function() {
  tinymce.create('tinymce.plugins.pixelastic_hrPlugin', {
    init : function(editor, url) {
      // Register the command
      editor.addCommand('mcepixelastic_hr', function() {
        // We get the parent node
        var parentNode = editor.selection.getNode(),
        uniqueId = editor.dom.uniqueId();
        // We insert the hr (with a unique id to select it later)
        editor.execCommand('mceInsertContent', false, '<hr id="'+uniqueId+'" />');
        var hr = editor.dom.select('#'+uniqueId)[0];
        // We split the parent element around the hr
        editor.dom.split(parentNode, hr);
        // We remove the temporary id
        $(hr).attr('id', null);
      });
      // Adding a button
      editor.addButton(pluginName, { title : 'pixelastic_hr.desc', cmd : 'mcepixelastic_hr' });
      }
    }
  });
  // Register plugin
  tinymce.PluginManager.add('pixelastic_hr', tinymce.plugins['pixelastic_hrPlugin']);
})();
```

The trick to use the `editor.dom.split` method to split the parent element
around the `<hr>` element.

The dirty hacks is that there is no way to get a direct reference to a DOM
element added through `mceInsertContent`, so we need to set a temporary unique
id and then select it through this id.

I use jQuery in my example and I strongly suggest you to do the same, the
selectors it provides are much sexier and helps writing these kind of plugins
pretty fast.