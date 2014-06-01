---
layout: post
title: "The blockquote cite attribute"
custom_v2_id: 78
---

<p>The HTML blockquote element can accept a cite attribute that is supposed to hold the value of the source URI of the quote.</p>
<p>Browsers behave differently when getting this attribute in javascript. Opera and Firefox automatically treat it as a URL, prepending the current domain host if none is defined and encoding special characters.</p>
<p>Safari and Chrome on the other end just return the value as it is present in the HTML.</p>