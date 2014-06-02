---
layout: post
title: "Breaking out of an if statement in PHP"
custom_v2_id: 189
---

One pattern I use when writing new method is to put conditions that may end
the script early on top. Like "stop the method if the arguments are not right"
or "stop the action if the user is not loggued in".

It allow me to avoid having nested `if`/`else `statement that became
unreadable.

Felix from Debuggable wrote [something about that a while
ago.](http://debuggable.com/posts/programming-psychology-return-home-early
:4811de9f-ae28-49c2-a7dc-2f154834cda3)

This is a pretty easy pattern to follow when writing methods, but can be quite
harder to achieve if you need to stick inside a main method. You just want to
go "out" of the `if` statement, to continue the script, but not end the
method.

## Break to the rescue

You can't use the `break `keyword in an `if` statement like you would in a
loop. It just throws an error.

But, you can define a simple `do {} while (false)` loop and use the break
goodness inside it.


```php
do {
  if (empty($data)) break;
                 
  $this->create($data);
                   
  if (!$this->validates()) break;
                   
  $this->save();
} while (false);
```

This helped me some times, hope it can help someone else.

