---
layout: post
title: "This blog got hacked"
custom_v2_id: 337
---

Today, at about 9pm (GMT+12), I found my own blog hacked. When I wanted to
access it, I was redirected to a malware site.

Half an hour later, it is back online again, and here is what I did.

First, I downloaded the webpage on my computer using `curl
http://www.pixelastic.com/ `to analyse it in search of a clue on the attack
vector.

Unfortunatly, I couldn't easily find the culprit. No `img` tag loading a `php`
file, no XSS injection that I could find. My guess is that the attacker
tampered the `js` files loaded to add its own custom evil script. But as my js
files are concatened and compressed in a file with a md5 name, it wasn't
obvious that they had been compromised.

After that, I `ssh`ed to the server and tried to find what files where
modified since my last commit. As I'm using Mercurial for that, this was a
simple matter of `hg status.`

And I got a shitload of result. Actually, all my `php` files had been modified
(and as I'm using cakePHP, that means, a lot of file). Running `hg diff`, I
found out that all the php code of each file had been replaced with an evil
code (enclosed in several layers of eval+base64).

I updated my working directory to the latest commit with `hg update --clean`
to get all those files as they were before the attack. Running `hg status`
once more still showed a bunch of new php files added. Running `hg purge`
finally get rid of them.

I finally deleted all the compressed css and js files, to force them to be
created again, and that's it, the website is online again.

I still don't have a clue on how this happened. How did someone access my
files ? Is that an XSS attack ? Is my password cracked ? Is there another
security weakness I'm not aware of ?


EDIT : Got hacked again. Seeing that the cakePHP Cache files were deleted, I
guess it is a known attack on a cake vulnerability. Got the website up again,
but will fix it as soon as my holidays allow.

