---
layout: post
title: "Adding extensions to a Windows PHP"
custom_v2_id: 241
tags: cli, imap, easyphp, php
---

My development environment is set up thanks to EasyPHP. I've used this app
since the first days that I started to write PHP and it followed me since.

I guess I have a better understanding of what it does under the scenes now and
could probably work with a clean and custom Apache/MySQL/PHP install. But I
like simplicity.

Anyway, I just wanted to run my imap script from the CLI but ran into "_Fatal
error : imap_open not defined_".

The same script was perfectly working when accessing it from my browser but
failed when launched from the CLI.

That when I remember that I needed to enabled the `php_imap.dll` extensions in
both EasyPHP PHP options (for web access) and `C:\windows\php.ini` (for cli
access)