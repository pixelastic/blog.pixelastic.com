---
layout: post
title: "Adding extensions to a Windows PHP"
custom_v2_id: 241
---

<p>My development environment is set up thanks to EasyPHP. I've used this app since the first days that I started to write PHP and it followed me since.</p>
<p>I guess I have a better understanding of what it does under the scenes now and could probably work with a clean and custom Apache/MySQL/PHP install. But I like simplicity.</p>
<p>Anyway, I just wanted to run my imap script from the CLI but ran into "<em>Fatal error : imap_open not defined</em>".</p>
<p>The same script was perfectly working when accessing it from my browser but failed when launched from the CLI.</p>
<p>That when I remember that I needed to enabled the <code>php_imap.dll</code> extensions in both EasyPHP PHP options (for web access) and <code>C:\windows\php.ini</code> (for cli access)</p>