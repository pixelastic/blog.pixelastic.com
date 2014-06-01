---
layout: post
title: "cakePHP : Fatal error: Class 'Controller' not found"
custom_v2_id: 290
---

<p>Last Friday, just before turning off my computer and going home, the cake project I'm working on was displaying a scary <code>Fatal error:  Class 'Controller' not found in /var/www/project/app/app_controller.php on line 5</code></p>
<p>Today, I'm getting back to work and here's what happened. After a morning of trial and error, I finally reverted back to a previous svn commit, then re-updated to the latest one and it seemed to solve the issue.</p>
<p>But later on the day, after another update, it started bugging again and the error message wasn't very helpful.</p>
<p>After much googling, this <a title="Class 'Controller' not found" href="http://cakephp.lighthouseapp.com/projects/43067/tickets/26-class-controller-not-found" target="_blank">bug report</a> gave me a hint : I had new models but didn't create the corresponding tables. Strangely, creating the missing logs table for my Log class solved the issue.</p>
<p>Hope this blog post will be usefull for anyone else struggling with this error message.</p>
<br />