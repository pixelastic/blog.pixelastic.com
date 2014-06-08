---
layout: post
title: "Whitelisting keys of an array"
custom_v2_id: 280
tags: php, array-intersect, array-flip, array-whitelist
---

I needed to validate an array create from POSTed data. I wanted to discard all
keys from this array that I didn't want.

Actually, I wanted to whitelist the array, and only keep keys that were on my
whitelist.

Here is the litte snippet that does it :

```php
/**
*    Keep only specified keys of the specified array. This is useful to whitelist an array of parameters.
*    \param    $array        Original array
*    \param    $whitelist        Array of keys to keep.
**/
function array_whitelist($array, $whitelist = array()) {
  return array_intersect_key($array, array_flip($whitelist));
}
```

