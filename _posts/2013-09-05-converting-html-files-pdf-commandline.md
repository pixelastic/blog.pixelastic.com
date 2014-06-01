---
layout: post
title: "Converting html files to pdf from the commandline"
custom_v2_id: 352
---

<p>When you need to convert an <code>html</code> file to a <code>pdf</code>, often the default <code>pdf</code> printer of your OS is enough. For those times when you need a much better rendering, you need a better tool.</p>
<p>I had to convert my <code>html</code>/<code>css</code> resume to a <code>pdf</code> file today. The default <code>pdf</code> printer on Ubuntu was discarding the background color and adding useless margins.</p>
<p>I finally resorted to using <a href="http://code.google.com/p/wkhtmltopdf/">wkhtmltopdf</a>. It does the job, but needs a few tweaks. First, you have to add <code>-T 0 -R 0 -B 0 -L 0</code> to remove the margins. Then, you have to use the <code>file://</code> notation to target a local file. Also, it does not understand the css properties <code>page-break-after</code> nor <code>page-break-before</code>. I had to manually add padding in my elements to stop them from being cut in between two pages. But worst of all, it chokes on UTF-8 characters in filenames.</p>
<p>In the end, I wrote a small ruby wrapper around wkhtmltopdf to work around all those issues for me and called it <a href="https://github.com/pixelastic/oroshi/blob/master/scripts/bin/html2pdf">html2pdf</a>.</p>
