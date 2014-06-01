---
layout: post
title: "Deleting an element from an Array/Object in Javascript"
custom_v2_id: 245
---

<p>I'm going to post that here because it's the second time I stumble upon this "problem" and the second time I lost some precious time to understand what was going on.</p>
<p>I had a Javascript Array, named <code>elements </code>and I wanted to remove one of its properties by its index <code>i</code>.</p>
<p>I know that merely calling <code>elements[i] = null</code> won't work (the property will still be present in the array and the length won't be updated.</p>
<p>Calling <code>delete elements[i]</code> won't work either. Same result.</p>
<p>I had to use <code>elements.splice(i, 1)</code> to effectively remove the element and update the length value.</p>
<p>Also note that sometimes I accidentally declare an Array when what I really want is an Object. I tend to forgot that associative <code>Arrays </code>in Javascript do not really exists, they just are <code>Objects</code>.</p>