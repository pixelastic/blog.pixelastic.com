---
layout: post
title: "Deleting an element from an Array/Object in Javascript"
custom_v2_id: 245
tags: object, javascript, delete, array
---

I'm going to post that here because it's the second time I stumble upon this
"problem" and the second time I lost some precious time to understand what was
going on.

I had a Javascript Array, named `elements `and I wanted to remove one of its
properties by its index `i`.

I know that merely calling `elements[i] = null` won't work (the property will
still be present in the array and the length won't be updated.

Calling `delete elements[i]` won't work either. Same result.

I had to use `elements.splice(i, 1)` to effectively remove the element and
update the length value.

Also note that sometimes I accidentally declare an Array when what I really
want is an Object. I tend to forgot that associative `Arrays `in Javascript do
not really exists, they just are `Objects`.