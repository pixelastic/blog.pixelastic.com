---
layout: post
title: "Disabling PHP scripts in a directory"
custom_v2_id: 212
tags: php, htaccess, upload, security, addtype, php-flag
---

Say you want to disable PHP scripts in a whole directory. Like your `upload/`
directory, because you don't want your users to upload `.php` files with
direct webroot access on your server...

Just drop a `.htaccess` file in it, and add the following rules


```apache
# We don't want php files from being parsed by the server in this directory, so we will return them as plain text
AddType text/plain .php .php3 .php4 .php5 .php6 .phtml

# Or, if the first rule does not work on your server, you may want to completely turn off PHP
#php_flag engine off
```