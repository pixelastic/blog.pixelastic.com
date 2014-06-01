---
layout: post
title: "Using environment vars in lighttpd config files"
custom_v2_id: 297
---

<p>Our game is hosted on a farm of servers behind a load balancer. All servers are identical except for their names (<code>prod-01</code>, <code>prod-02</code>, etc) and virtual IP addresses.</p>
<p>In PHP, if I try to access <code>$_SERVER['SERVER_NAME']</code>, I only got the domain name "prod.game.com". Actually, this was exactly the same var as the <code>$_SERVER['HTTP_HOST']</code>.</p>
<p>For logging purposes, I needed to know the name of the server that my script was currently running on. So I updated my <code>lighttpd.conf</code></p>
<p>Lighty has a feature called <code>include_shell</code> that you can use in its config files. It will basically run a shell script and add its output to your file.</p>
<p>So I wrote a simple shell script to define a <code>var.serverName</code> (this is a custom value, name it as you want, but keep the <code>var</code> prefix) and then re-use when needed.</p>
<pre><code lang="sh">#!/bin/bash<br />echo 'var.serverName="'$(uname -n)'"'</code></pre>
<p>Then, I included it in my <code>lighttpd.conf</code> file using <code>include_shell "/etc/lighttpd/scripts/serverName.sh"</code></p>
<p>To define the PHP SERVER_NAME value :</p>
<pre><code lang="ini">setenv.add-environment = (<br />	"SERVER_NAME" =&gt; var.serverName<br />)</code></pre>
<p>To add it as a Server: response Header :</p>
<pre><code lang="ini">server.tag = var.serverName</code></pre>
<p>Note that <code>include_shell</code> directives are only called when you start lighty and not on every request.</p>