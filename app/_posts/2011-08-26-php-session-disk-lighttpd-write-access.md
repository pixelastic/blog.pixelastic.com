---
layout: post
title: "PHP session on disk with lighttpd, and write access"
custom_v2_id: 307
tags: lighttpd, php, sessions
---

On HappyLife, we used to use Memcache to handle the php sessions. We
discovered a while back after much trouble that Memcache might not have been
the best solution for sessions on a high traffic site. But this will be the
subject of another post.

Anyway, I switched back to classical session, stored on disk.

Here's the relevant `php.ini` config


```ini
[Session]
session.save_handler = files
session.save_path = '/tmp/php'
```

`/tmp/php` should be writable by `www-data`, so

```sh
$ chown www-data:www-data /tmp/php
```
