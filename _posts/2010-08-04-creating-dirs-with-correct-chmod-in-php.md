---
layout: post
title: "Creating dirs with correct chmod in PHP"
custom_v2_id: 209
tags: mkdir, umask, php, chmod
---

One trick I've been dragging with me on all this years of PHP programing is a
little snippet to correctly create directories with the chmod I want.

By simply calling `mkdir('my_dir', 0777)` I used to often end up with
directories that I can't write to nor delete, even if I was correctly setting
the chmod.

The trick was to reset the mask (using `umask(0)`) before the `mkdir() `call
and then reapplying the old mask after.


```php
$tmpUmask = umask(0);
mkdir('my_dir', 0777);
umask($tmpUmask);
```

I must admit that I've never really understand why it was working better than
simply calling `mkdir()` but hey, it's been years that I'm using that now and
I never run into access rights issues since.
