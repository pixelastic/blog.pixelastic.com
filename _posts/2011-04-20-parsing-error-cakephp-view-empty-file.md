---
layout: post
title: "Parsing error in cakePHP view for empty file"
custom_v2_id: 274
tags: cakephp, php
---

As a convention, I never write the closing PHP tag at the end of my php files.
It helps in avoiding the "header already sent" error when dealing with
cookie/sessions.

However, today cake complains about

```php
Parse error: syntax error, unexpected $end in /var/www/website/app/views/players/default.ctp on line 1
```

My `default.ctp file` only contain the following content :


```php
<?php
```

It took me a couple of minutes to fix it. I only added an empty line after the
opening tag, so it now read :


```php
<?php


```

The first statement was a perfectly valid php file, but somehow it makes
cakePHP fail.

I didn't have time to investigate on it further, nor submit a bug report
(because it may well be coming from my custom app, not cake itself) but I plan
to.
