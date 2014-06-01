---
layout: post
title: "Detecting fullscreen in tinyMCE"
custom_v2_id: 251
---

I wanted one of my tinyMCE plugins to fire a certain set of actions whenever
the full screen mode was activated.

I search for an `onFullScren `event or somethin similar but to no avail. I
finally discovered that the full screen actually creates a whole new tinymce
editor instance.

So the only thing I had to do was writing my little piece of code in the `init
`method of my plugin and check to see if the fullscreen was enabled.

The initial fullscreen plugin exposes a `fullscreen_is_enabled` param that can
be checked.

All I had to do was a simple condition like : `if
(editor.getParam('fullscreen_is_enabled')) {}.` And once in the condition I
tried to execute my custom code. I needed the `editor.execCommand` method but
all I got was an error because `t.selection` was not set.

It appears that the execCommand can only be executed when the full editor
instance is loaded (and thus a t.selection is created). So I wrap my little
piece of code into a `setInterval` checking for `editor.selection` and finally
executed my code when the `.selection `was set.

Here is my final snippet, to be included in my plugin `init `method :

    
```js
if (editor.getParam('fullscreen_is_enabled')) {  
  var fullScreenInterval = setInterval(function() {  
    if (!editor.selection) return false;  
    clearInterval(fullScreenInterval);  
    editor.execCommand('anyTinyMCECommand');  
  }, 1000);  
}
```

