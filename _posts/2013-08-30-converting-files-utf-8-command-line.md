---
layout: post
title: "Converting files to UTF-8 from the command line"
custom_v2_id: 348
---

<p>Converting to and from charset encoding is boring. Life would be much easier if everything was saved in proper UTF-8.</p>
<p>I just coded a couple of scripts that will help be read file encoding from files and convert them to UTF-8.</p>
<p>First, not all encoding can be easily read. Some uses markers that are easy to check, other requires heuristic and guessing. I won't deal with the second part. Most of the files I'm currently handling are either Latin1 (ISO-8859-1) or Latin2 (ISO-8859-2), so I'll limit the scope of my scripts to those two sets.</p>
<p>Fortunatly, the default <code>file</code> command can do that.</p>
<pre><code lang="sh">$ file -bi file.txt<br />text/plain; charset=us-ascii<br />$ file -bi bad.html<br />text/html; charset=iso-8859-1<br />$ file -bi good.html<br />text/html; charset=utf-8</code></pre>
<p>Now that we have a way to know the input encoding, we can use <code>recode</code> to convert to UTF-8. You can install <code>recode</code> easily with <code>sudo apt-get install recode</code>.</p>
<p>Once done, it is just a matter of <code>convert latin1..utf8 bad.html</code></p>
<p>I wrapped those methods in two scripts : <a href="https://github.com/pixelastic/oroshi/blob/master/scripts/bin/encoding">encoding</a> and <a href="https://github.com/pixelastic/oroshi/blob/master/scripts/bin/utf8">utf8</a> that respectively output the file encoding and convert the file to utf8.</p>
