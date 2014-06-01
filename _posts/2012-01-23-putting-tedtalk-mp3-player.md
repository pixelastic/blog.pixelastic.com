---
layout: post
title: "Downloading all the TEDTalk podcasts"
custom_v2_id: 336
---

<p>As I'm about to move for a couple of long months without an internet connection and a lot of travel hours, I thought of downloading the TEDTalk podcasts.</p>
<p>Being a linux user for about a year now, I'm taking the habit of using the linux tools to do the boring and repetitive work. Downloading more than a hundred files seems like a good candidate for a script.</p>
<p>The complete list of audio podcasts is available <a title="Full TEDTalk list" href="https://spreadsheets.google.com/pub?key=0Ahz_ZQm7pkwTdFBVWXBLOFNGSkdsVFgxc0Y0bk9lc0E">here</a>. I simply selected all text and copied it into a <code>file.txt</code>.</p>
<p>Then, it was simply a matter of extracting only the urls, and feeding them to <code>wget</code></p>
<pre><code lang="sh">cat file.txt | tr ' ' '\n' | tr '\t' '\n' | grep http &gt; list.txt
wget --no-clobber -i list.txt
</code></pre>
<p>This took a while to download as there are more than 400 files, but that way I'll have some interesting talks to listen to during my trip.</p>