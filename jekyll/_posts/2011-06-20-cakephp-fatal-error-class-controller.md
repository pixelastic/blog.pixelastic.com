---
layout: post
title: "cakePHP : Fatal error: Class 'Controller' not found"
custom_v2_id: 290
tags: bug, cakephp, php, controller
---

Last Friday, just before turning off my computer and going home, the cake
project I'm working on was displaying a scary `Fatal error: Class 'Controller'
not found in /var/www/project/app/app_controller.php on line 5`

Today, I'm getting back to work and here's what happened. After a morning of
trial and error, I finally reverted back to a previous svn commit, then re-
updated to the latest one and it seemed to solve the issue.

But later on the day, after another update, it started bugging again and the
error message wasn't very helpful.

After much googling, this [bug
report](http://cakephp.lighthouseapp.com/projects/43067/tickets/26-class-
controller-not-found) gave me a hint : I had new models but didn't create the
corresponding tables. Strangely, creating the missing logs table for my Log
class solved the issue.

Hope this blog post will be usefull for anyone else struggling with this error
message.