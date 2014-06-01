---
layout: post
title: "Knowing if an element is in the DOM using jQuery"
custom_v2_id: 71
---

<p>If you ever need to know if the element you have a reference to is really in your page (or if it is an old reference to an element you've already replaced), you can use the <code>$.contains(container, contained)</code> method.</p>
<p>I was just working on an AJAX paginated list of elements and I kept references to my <code>table</code> in vars to avoid re-querying it each time. But this reference where still 'correct' (ie. not null) even after having replaced the element with a new one (using .<code>replaceWith()</code> and even <code>.empty()</code> and <code>.remove()</code>)</p>
<p>I added a check to see if the element was really in the DOM before using it, and if not requerying it and re-saving it in var</p>