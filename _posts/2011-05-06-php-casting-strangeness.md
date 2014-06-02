---
layout: post
title: "Another PHP casting weirdness"
custom_v2_id: 277
---

Second weird PHP behavior behavior of the day :


```php
$foo = false;
echo $foo['bar']; // Ouptuts nothing, but doesn't throw an error either
```

Strange. I try to read an undefined index (`false `is not an array), but PHP
doesn't complain. That's weird.


```php
$foo = true;
echo $foo['bar']; // Throws an error
```

This time, PHP tells me that the index is not defined and throws an error.
Wait, what ?

Apparently, this is the intended behavior, but it does seem a bit strange...

