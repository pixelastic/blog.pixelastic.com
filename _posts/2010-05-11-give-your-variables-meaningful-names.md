---
layout: post
title: "Give your variables meaningful names"
custom_v2_id: 89
---

I just realized that the fullscreen plugin I was using with tinyMCE (v3.3.5)
was throwing an error in my Firebug panel everytime I closed it.

As I wrote some tinyMCE plugins myself I thought I may have done something
that was causing this. So I opened up the javascript file and checked for the
error line :


```js
var win, de = DOM.doc.documentElement;
if (ed.getParam('fullscreen_is_enabled')) {
  if (ed.getParam('fullscreen_new_window'))
    closeFullscreen(); // Call to close in new window
  else {
    DOM.win.setTimeout(function() {
      tinymce.dom.Event.remove(DOM.win, 'resize', t.resizeFunc);
                  tinyMCE.get(ed.getParam('fullscreen_editor_id')).setContent(ed.getContent({format : 'raw'}), {format : 'raw'});
                  tinyMCE.remove(ed);
                  DOM.remove('mce_fullscreen_container');
                  ed.style.overflow = ed.getParam('fullscreen_html_overflow');
                  DOM.setStyle(DOM.doc.body, 'overflow', ed.getParam('fullscreen_overflow'));
                  DOM.win.scrollTo(ed.getParam('fullscreen_scrollx'), ed.getParam('fullscreen_scrolly'));
                  tinyMCE.settings = tinyMCE.oldSettings; // Restore old settings
    }, 10);
  }
        return;
}

```

If you're not familiar with the complex tinyMCE syntax this may seems a
little... well... complex.  I'll focus on the error line but I wanted to paste
the whole code block so you can see my point.

The error line is this one :


```js
ed.style.overflow = ed.getParam('fullscreen_html_overflow');

```

Of course it will throw an error, we try to access a property of an element we
just removed from the DOM (two lines before : `tinyMCE.remove(ed);`). Why
would someone want to do that ?

Well in fact, this is not `ed` (that we should try to access, but `de` (short
for `DOM.doc.documentElement`). In fact the code was correct in 3.3.2, but
someone changed it around 3.3.3.

My guess is that someone had the file opened, saw this bit of code, spotted
the `de`, and seeing a lot of references to `ed` all around, thought it was a
typo and 'fixed' it.

Reading the tinyMCE code (whenever you want to understand how it works, or
want to study plugins before creating your own) is pretty hard. There are
almost no comments, and variable names are only one or two letters long.

The tinyMCE team released a survey asking user what should be improved on the
tinyMCE product. I answered it, and my main point was to improve
documentation, because reading the tinyMCE core to understand its inner goings
is quite a chore.

