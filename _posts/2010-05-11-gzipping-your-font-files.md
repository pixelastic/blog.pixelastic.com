---
layout: post
title: "Gzipping your font files"
custom_v2_id: 87
---

<p>When using <code>@font-face</code> to display fonts, you have to create a whole bunch of font files on your server to accomodate the quirks of the various browsers.</p>
<p>If you do things right (or follow the automatic kit build of FontSquirell), you should get a <code>.eot</code> file for IE, a <code>.ttf</code>/<code>.otf</code> file for current browsers, a <code>.svg</code> file for Chrome and the iPhone/iPad and a <code>.woff</code> file for the next browser generation.</p>
<p>Unfortunatly, you'll have to cope with that because there isn't much we can do about it at the moment.</p>
<p>But you can compress those files to make the font rendering faster. Some browsers even download all the fonts even if they will only use one, so compress them !</p>
<p>The easiest way is to configure your server to automatically gzip them. You should already have done that for your css and js file so it is just a matter of adding new types.</p>
<p>As far as I know <code>.otf</code> and <code>.ttf</code> files don't have registered mimetype, so I had to create a dummy one for them in my .htaccess :</p>
<pre lang="htaccess"><code lang="apache">AddType x-font/otf    .otf<br />AddType x-font/ttf    .ttf<br />AddType x-font/eot    .eot</code></pre> <p>I also added the <code>.eot</code> because even if an <code>application/vnd.ms-fontobject</code> mimetype is registered for this obscure microsoft format, when I tried to add a deflate rule on it, my Apache crashed so I took the safest way of defining a custom mimetype.</p>
<p>I prefixed them with an <code>x- </code>to make sure that it won't mess with existing mimetypes.</p>
<p>The second part was to add gziping to those</p>
<pre lang="htaccess"><code lang="apache">AddOutputFilterByType DEFLATE x-font/otf x-font/ttf x-font/eot</code></pre> <p>SVG files are in fact xml files, and you should already have them gzipped, so no need to add them here.</p>
<p>I haven't included <code>.woff</code> files because <code>.woff</code> files are already compressed files, so you don't need to gzip them.</p>