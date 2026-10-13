---
layout: post
title: "The blockquote cite attribute"
custom_v2_id: 78
tags: chrome, firefox, opera, safari
---

The HTML blockquote element can accept a cite attribute that is supposed to
hold the value of the source URI of the quote.

Browsers behave differently when getting this attribute in javascript. Opera
and Firefox automatically treat it as a URL, prepending the current domain
host if none is defined and encoding special characters.

Safari and Chrome on the other end just return the value as it is present in
the HTML.