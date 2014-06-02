---
layout: post
title: "missing data in jQuery Ajax event ajaxSuccess"
custom_v2_id: 70
---

jQuery provides a nifty set of Ajax events that one could define to fire
methods whenever an ajax request starts, stop, failed or succeed. It is quite
useful actually, to display visual indicator once and for all without having
to define the various callback on each ajax call.

But it has one flaw. The `ajaxSuccess `callback only give access to the
`event`, `XMLHttpRequest `object and the option object. There is no direct way
to get the return data from the call.

Well, you can still access it from the `XMLHttpRequest responseText` attribute
but it is then your job to parse it according to its type, duplicating some of
the code already called in the jQuery core.

You can use the `$.httpData` to directly parse it, giving the XHR as first
argument and the data type as the second one.


```js
$('#ajaxIndicator').bind('ajaxSuccess', function(event, xhr, options) {
  var data = $.httpData(xhr, options.dataType);
}
```
