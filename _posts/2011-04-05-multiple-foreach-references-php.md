---
layout: post
title: "Multiple foreach() with references in php"
custom_v2_id: 271
---

It took me a couple of hours to debug : I had an array with values that
shouldn't be here, values from another part of the application, and I couldn't
figure out where that came from.

Well, it turns it was part of a documented feature of PHP :

> Unless the array is referenced, foreach operates on a copy of the specified
array and not the array itself. foreach has some side effects on the array
pointer. Don't rely on the array pointer during or after the foreach without
resetting it. Reference of a $value and the last array element remain even
after the foreach loop. It is recommended to destroy it by unset().php.net

My code was as simple as :

    
```php
$newArray = array();  
$newArray2 = array();  
foreach($list as $key => &$data) {  
  $newArray[] = $data;  
}  
foreach($list2 as $key => &$data) {  
  $newArray2[] = $data;  
}
```

This resulted in the latest index of `$newArray` being set to one of `$list2`
values (didn't know exactly which). This is really counter intuitive.

