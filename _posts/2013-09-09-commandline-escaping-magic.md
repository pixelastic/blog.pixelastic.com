---
layout: post
title: "Commandline escaping magic"
custom_v2_id: 356
---

<p>Aren't your tired of having to wrap your url in quotes when using <code>wget</code> so the various <code>&amp;</code> and <code>?</code> do not mess up your terminal ?</p>
<p>Well, I was, until I stumbled upon this god-send zsh magic : <code>url-quote-magic</code>.</p>
<p>Just initiate it in your <code>.zshrc</code> with the following lines :</p>
<pre><code lang="sh">autoload -U url-quote-magic <br />zle -N self-insert url-quote-magic<br /></code></pre>
<p>And now, everytime you type or paste a url in <code>wget</code> it will automatically escape the needed characters. It is quite clever and works with other commands that would otherwise trigger your terminal globbing feature.</p>