---
layout: post
title: "Weird PHP behavior when casting as an object"
custom_v2_id: 327
---

I've just stumbled upon that weird behavior when force casting the return of a
function to an object. The PHP result was not what I expected.

    
```php
$a = null;  
echo empty($a) ? "Yes, I'm empty" : "You should not see this"
```

This is pretty straighforward code. Now, we test it with an object.

    
```php
$a = (object) null;  
echo empty($a) ? "Yes, I'm empty" : "You should not see this but, actually, you do."
```

Note that it even gets weirder when `(object) false` and `(object) true`
become objects with a key `scalar`, set to `false`

This is one of the little things that make me want to ditch PHP for a better
language.

