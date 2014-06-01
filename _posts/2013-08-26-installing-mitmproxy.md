---
layout: post
title: "Installing mitmproxy"
custom_v2_id: 345
---

<p>I spend the last hour trying to install <a title="mitmproxy" href="http://mitmproxy.org/" target="_blank">mitmproxy</a>. This is supposed to be a commandline proxy to intercept, read, edit and replay HTTP(S) requests. I say "supposed" because I haven't had the chance to try it so far as I was blocked on a compilation error.</p>
<p>According to <a href="http://mitmproxy.org/doc/install.html" target="_blank">the official documentation</a>, installing mitmproxy should be as easy as <code>pip install mitmproxy</code>. Being new to using <code>pip</code>, I first had to install it (<code>sudo apt-get install python-pip</code>) and figure out that one need to install stuff with <code>pip</code> using <code>sudo</code>.</p>
<p>But <code>sudo pip install mitmproxy</code> resulted in charming compilation errors in my case. Something along the lines of :</p>
<pre><code lang="ini">src/lxml/lxml.etree.c:16:20: fatal error: Python.h: No such file or directory<br /></code></pre>
<p>After a bit of googling, I understood that the issue was some missing headers on my part. After running <code>sudo apt-get install python-dev</code> I was good to run a <code>sudo pip install mitmproxy</code> again.</p>
<p>Next step will be to configure the beast and learn how to use it.</p>