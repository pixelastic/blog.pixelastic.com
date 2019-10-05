---
layout: post
title: "Copy/Paste text from Word into tinyMCE"
custom_v2_id: 227
tags: word, tinymce, javascript, copy-paste
---

What good is building a really nice CMS with top-notch WYSIWYG editor if you
handed it to clients that will blindly copy/paste Word documents into it ?

Well, it will just render a big ugly mess of proprietary and contradictory
pseudo-css rules. You could even be blamed for it.

## The solution

The latest versions of tinyMCE came bundled with an improved `paste `plugin.
It will automatically attempt to clean bad pasted text by operating some dark
voodoo magic on it.

It does it quite well to be honest, removing almost all messy formatting. From
the tests I tried, I was still getting useless crap in the resulting text (CSS
comments, `<span>` with overly long style of color and background-color
definitions, etc).

I finally decided to take a more brutal approach. The `paste `plugin contained
a `_insertPlainText` method that was supposed to be used in conjunction with a
toolbar icon.

This method removes all formatting. Period.

As I didn't want to have to click on a toolbar icon before pasting my text
(and none of my actual clients would ever think of doing that either), I came
up with a very simple plugin to do the boring stuff for me.

## The plugin

The only goal of this plugin is setting to `true `the `pasteAsPlainText
`property of every editor. This property is defaulted to `false `but can be
swapped using the toolbar icon.

I also forced the `paste_text_sticky` setting to `true`, preventing the
previous property to revert to `false `after the first pasting.

Here's my plugin full code :

Be sure to include the `paste `plugin in your plugin list, and insert my
plugin **after **the paste plugin.


```js
/**
 *    Will automatically convert pasted text so no junk code will be included.
 *    This plugin depends on the core paste plugin.
 **/
(function() {
  tinymce.create('tinymce.plugins.pasteAsPlainTextPlugin', {
    init : function(editor, url) {
      // We force the pasting to occur as plain text
      editor.pasteAsPlainText = true;
      // We also put it as sticky to allow for multiple pastings
      editor.settings.paste_text_sticky = true;

      // Adding some special post process
      editor.settings.paste_postprocess = function(a, o) {
        var text = o.content,
          split = String.fromCharCode(13)+String.fromCharCode(10)
        ;

        // If content is long text without HTML, We'll break it into <p>ieces
        if (text.charAt(0)!='<' && text.indexOf(split)!=-1) {
          // Adding <p> around each line
          var node = document.createElement('div'),
            sentences = text.split(split)
          ;
          for(var i=0,max=sentences.length;i!=max;i++) {
            node.innerHTML+='<p>'+sentences[i]+'</p>';
          }

          // Saving back in original content/node
          o.node = node;
          o.content = node.innerHTML;
        }
        return o;
      }
    }
  });

  // Register plugin
  tinymce.PluginManager.add('pasteAsPlainText', tinymce.plugins[pasteAsPlainTextPlugin]);
})();
```


## Update

I added a `postprocess `calback after seing that the pasted text was a little
too plain in Webkit. All my text was displayed on the same line, without the
nice breaking into paragraph that Firefox showed.

It occured because tinyMCE used the `event.clipboardData` property that Webkit
browsers provides and allow for easy retrieving of clipboard data.
Unfortunatly it returned a really plain text, and I had to apply a little loop
to replace each new line with a paragraph.
