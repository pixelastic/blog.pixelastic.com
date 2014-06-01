---
layout: post
title: "This blog got hacked"
custom_v2_id: 337
---

<p>Today, at about 9pm (GMT+12), I found my own blog hacked. When I wanted to access it, I was redirected to a malware site.</p>
<p>Half an hour later, it is back online again, and here is what I did.</p>
<p>First, I downloaded the webpage on my computer using <code>curl http://www.pixelastic.com/ </code>to analyse it in search of a clue on the attack vector.</p>
<p>Unfortunatly, I couldn't easily find the culprit. No <code>img</code> tag loading a <code>php</code> file, no XSS injection that I could find. My guess is that the attacker tampered the <code>js</code> files loaded to add its own custom evil script. But as my js files are concatened and compressed in a file with a md5 name, it wasn't obvious that they had been compromised.</p>
<p>After that, I <code>ssh</code>ed to the server and tried to find what files where modified since my last commit. As I'm using Mercurial for that, this was a simple matter of <code>hg status.</code></p>
<p>And I got a shitload of result. Actually, all my <code>php</code> files had been modified (and as I'm using cakePHP, that means, a lot of file). Running <code>hg diff</code>, I found out that all the php code of each file had been replaced with an evil code (enclosed in several layers of eval+base64).</p>
<p>I updated my working directory to the latest commit with <code>hg update --clean</code> to get all those files as they were before the attack. Running <code>hg status</code> once more still showed a bunch of new php files added. Running <code>hg purge</code> finally get rid of them.</p>
<p>I finally deleted all the compressed css and js files, to force them to be created again, and that's it, the website is online again.</p>
<p>I still don't have a clue on how this happened. How did someone access my files ? Is that an XSS attack ? Is my password cracked ? Is there another security weakness I'm not aware of ?</p>
<p> </p>
<p>EDIT : Got hacked again. Seeing that the cakePHP Cache files were deleted, I guess it is a known attack on a cake vulnerability. Got the website up again, but will fix it as soon as my holidays allow.</p>