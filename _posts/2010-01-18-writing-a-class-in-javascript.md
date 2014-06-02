---
layout: post
title: "Writing a class in Javascript"
custom_v2_id: 30
---

I always have to refer to a manual or a webpage to remember the correct syntax
for creating a new class in Javascript. Here it is :

```js
myClass = function() {
    // Here I can define private variables and methods
    var myPrivateVar = "foo";
    var myPrivateMethod = function() {
    };
    // And now I will return an object, so it is the place
    // to put public variables and methods
    return {
        publicVariable: 'bar',
        publicMethod: function() {}
    };
}(); // Note that this function is executed and so the object is returned.
```


