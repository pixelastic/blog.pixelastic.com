---
layout: post
title: "Running a cakePHP shell script as cronjob on Dreamhost"
custom_v2_id: 242
---

<p>Dreamhost as <a title="Dreamhost wiki on Crontab" href="http://wiki.dreamhost.com/Crontab" target="_blank">a wonderful wiki</a> on how to set cron jobs and cakePHP has <a title="Cookbook page on how to set cronjobs up" href="http://book.cakephp.org/view/846/Running-Shells-as-cronjobs" target="_blank">a cookbook page on how to do it</a> too, but getting it just right was a little frustrating.</p>
<p>I finally managed to run my shell task as a cronjob, and here is how I did it.</p>
<h4>The magic command</h4>
<p>First, here is the command I wrote in my Dreamhost panel :</p>
<pre><code lang="sh">/home/username/domain.com/cake/console/cake -app /home/username/domain.com/app/ shell_name</code></pre>
<p>You have to set the full path to the cake console because it obviously is not in the pre-saved paths on a default Dreamhost install.</p>
<p>You also have to specify the <code>app</code> directory otherwise cake will search your shell in the wrong directories. This is even more important if your shell is located in a plugin directory.</p>
<p>But, this won't work as-is, you'll have to do several other stuff, mostly explained by <a title="Setting up cronjob on Dreamhost with CakePHP" href="http://www.milesj.me/blog/read/83/Setting-Up-Cron-Jobs-With-Cake-Shells" target="_blank">Miles Johnson</a>, but I'll recap them</p>
<h4>Setting the file as executable</h4>
<p>You have to set the <code>cake/console/cake</code> file as executable. It is kind of obvious, but you have to do it anyway.</p>
<h4>Set the TERM variable</h4>
<p>Update you <code>cake/console/cake</code> to replace the first lines with :</p>
<pre><code lang="sh">LIB=${0/%cake/}<br />APP='pwd'<br />TERM=linux<br />export TERM</code></pre>
<p>If you don't, you'll have notice errors in the resulting log. No big deal, but it is cleaner that way.</p>
<h4>Forcing using php5</h4>
<p>While in command line, the php command refer to the php4 version. If you need to use php5 (and I guess you should), you would have to manually reference the binary file. Hence, you have to update your <code>cake/console/cake</code> file one more time and change the <code>exec </code>line to :</p>
<pre><code lang="sh">exec /usr/local/php5/bin/php -q ${LIB}cake.php -working "${APP}" "$@"</code></pre>
<h4>And it's ok</h4>
<p>Your cronjob should not work effortlessly. It took me some long hours to track all this down (along with other issues on my local dev machine that make debugging even more cloudy).</p>