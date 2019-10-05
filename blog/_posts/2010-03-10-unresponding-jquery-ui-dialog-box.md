---
layout: post
title: "Unresponding jQuery UI dialog box"
custom_v2_id: 55
tags: jquery-ui, focus, dialog
---

As this is the second time I encounter this "issue", I think it may be clever
to post it here. At least, I won't have to debug it all the down again next
time.

In a nutshell, I was working on a complex UI that involve several layers of
dialog boxes, each one on top of the previous one. Each new dialog box is
supposed to offer the user something to do, and once it is done, the dialog
box disapear and the user can get back to the previous one.

The "issues" I was having was after closing a specific window, I wasn't able
to focus the previous one. I mean, the window was there, I was even able to
update its fields using jQuery, but I couldn't focus it either using keyboard
or mouse.

After some digging, it appears that I wasn't correctly "closing" the previous
window. I was actually doing a `.dialog('destroy')` instead of a
`.dialog('close')` and this was causing my issue.

Calling `close `hides the dialog box, but keep it in the DOM. That way if I
ever need the same dialog box again, jQuery is smart enough to re-use it.

Calling `destroy `on the other hand actually remove the dialog box from the
DOM, forcing jQuery to recreate it from scrath.

It appears that calling `destroy `in my case caused a strange lose of focus,
so I reverted to close instead.