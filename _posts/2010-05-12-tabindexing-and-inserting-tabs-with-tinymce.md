---
layout: post
title: "Tabindexing and inserting tabs with tinyMCE"
custom_v2_id: 159
---

You may have noticed that you can't press tab to jump from field to field in a
form that uses tinyMCE. There is a plugin named `tabfocus `in the core that is
here to allow just that.

But it does not seem to work correctly if you already have tabindex values
defined on your inputs. So I decided to code my own.

I choose the easiest way, letting the browser do most of the job. I only
copied the textarea `tabindex `value to the create iframe and it did the
trick.

I created a tinyMCE for that, here the code of the init() method. By the way,
I'm using the jQuery version of tinyMCE.

    
```js
init : function(editor, url) {  
  // We set a tabindex value to the iframe instead of the initial textarea  
  editor.onInit.add(function() {  
    var editorId = editor.editorId;  
    var textarea = $('#'+editorId);  
    $('#'+editorId+'_ifr').attr('tabindex', textarea.attr('tabindex'));  
    textarea.attr('tabindex', null);  
  });  
}  
```

What it does is grabbing the initial `tabindex `value of your textarea and
setting it to the tinyMCE iframe. You have to wrap this in `onInit.add`
because at the time the plugin `init `method is called, the iframe is not yet
created. I also removed the `tabindex `value from the original textarea, two
elements aren't supposed to have the same `tabindex `value.

This method does not work in Chrome. Chrome always add a tab character when
you press the tab key in a tinyMCE editor, it does not jump to the next
tabindexed element. Is that a good behavior ? I don't know, it surely is
useful to be able to insert tab characters, but it also is useful to tab
through the whole form.

## Listening to the tab key

Anyway, I decided to hook on the `keyDown `event and listen to the tab key
being pressed. This way I could manually jump focus to the next field when tab
is pressed, or insert a tab character when Shift+Tab is pressed (for example).

I used the tinyMCE event helper methods and wrote this (just add it right
after the previous `editor.onInit.add` code) :

    
```js
// We hook on the tab key. One press will jump to the next focusable field. Maj+tab will insert a tab  
editor.onKeyDown.add(function(editor, event) {  
  // We only listen for the tab key  
  if (event.keyCode!=9) return;  
          
  // Shift + tab will insert a tab  
  if (event.shiftKey) {  
    editor.execCommand('mceInsertContent', false, "\t");  
    tinymce.dom.Event.cancel(event);  
    return;  
  }  
  // Just pressing tab will jump to the next element  
  var tabindex = $('#'+editor.editorId+'_ifr').attr('tabindex');  
  // We get all the tabindexed elements of the page  
  var inputs = [];  
  $(':input[tabindex]').each(function() {  
    inputs[$(this).attr('tabindex')] = this;  
  });  
  // We find the next after our element and focus it  
  for (var position in inputs) {  
    if (position<=tabindex) continue;  
    inputs[position].focus();  
    break;  
  }  

  tinymce.dom.Event.cancel(event);  
  return;  
});  
```
    

First, we discard any key press that is not a tab key.

Then we check if the Shift key is pressed, and if so we add a tab character
and stop there.

The biggest part is jumping to the next field. I can't revert to the browser
default for that because every browser default behavior is different and I
surely don't want to do some browser sniffing.

I first get the list of all the input fields that have a `tabindex `value
(your fields should have one), then I sort them in `tabindex `order and then
loop through the list and stop when I've found one with a bigger `tabindex
`that the actual field. I focus this one and stop the loop.

## One final word

I've tested under Firefox 3.6, Chrome, Safari and Opera. Haven't tested IE yet
because I still have a lot of other scripts to debug in IE first.

As said earlier, maybe you could skip the whole tabindex listing if you
intelligently revert to browser default for the browser that will jump to the
next field but I have no idea how to test for that.

