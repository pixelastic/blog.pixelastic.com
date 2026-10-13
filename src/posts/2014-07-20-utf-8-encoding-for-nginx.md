---
layout: post
title: "UTF-8 encoding for nginx"
tags: nginx, jekyll
---

I just realised that my very own website wasn't correctly returning UTF-8 in
its `Content-Type` response headers.

As my new server is only one `ssh` command away, I could easily log in and edit my
nginx config. I also added a security measure of not exposing the nginx version
I'm using.

```nginx
# Set default encoding as utf-8
charset utf-8;
# Do not expose nginx version in headers
server_tokens off;
```
