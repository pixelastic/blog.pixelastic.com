---
layout: post
title: "Pros and cons of using Google CDN for your assets"
custom_v2_id: 175
---

<p>With the recent Google Fonts breakout, much debate surfaces to know if it really was useful to use Google CDN to deliver your assets to your users.</p>
<p>I used to think it was a goog thing because it allowed for parallelized download, but after reading really good articles on the subject I'm not so sure.</p>
<p>I'll try to list the pros and cons of using Google CDN instead of serving your files locally.</p>
<h4>Pros</h4>
<ul>
<li>Using a CDN assure you that your users will get content from the closest server around them, no matter where they are.</li>
<li>The more websites will use Google CDN, the biggest the chance of your user already having the file in its cache</li>
<li>Downloading from a CDN assure that you won't be sending useless cookies along the request. You shouldn't send cookies when fetching your static files anyway, but sometime -Google Analytics for example-, some script create domain-wide cookies that still get sent.</li>
<li>Many niched major websites (ArmorGames.com, StackOverflow.com, etc) uses the CDN, so if a large part of your trafic is coming from one of those, using the CDN and the exact same library version will have no perfomance downsides for you.</li>
</ul>
<h4>Cons</h4>
<ul>
<li>Using a CDN create a new connection to access the ressource on an other server instead of using the already open connection to your website. Creating a new connection is slow.</li>
<li>Caching of the files will only be possible if the exact same version url is used. E. using <code>/jquery/1.4.0/</code> instead of <code>/jquery/1.4/</code></li>
<li>If you already are using your own CDN for your images, you should also use it for your javascript and in this case the google one is worthless because you already have all the advantages.</li>
<li>An Internet connection is required. This may seem obvious but if you have to work on a project while on a trip, you'll need a local copy of the library.</li>
</ul>
<h4>Stalemate</h4>
<ul>
<li>Using a CDN force a DNS lookup. This lookup can be cached if the user already visited your website or another that use the same CDN however.</li>
<li>Browsers have a limit of paralels downloads on the same host. Using a  CDN allow for more parallelization. But creating dummy subdomains like <code>static.domain.com</code> would also defeat this limitation.</li>
<li>In the case of Javascript/CSS, packing all your files (scripts and  libraries) in one big file on your server and serving it gzipped will  result in a better compression that serving the library from a CDN and  your scripts from your server. On the other hand, the user would have to  re-download the whole package whenever you make a tiny change to your  scripts, even if you didn't changed the library.</li>
<li>Downloading script usually block page execution. So reducing the number of scripts to load (by packing them in one file instead of downloading one locally and one on the CDN) will reduce the blocking time. On the other hand, merging two files will result in a longer download time (because the file is larger) while using the CDN would allow the two scripts to download in parallel.</li>
<li>What happen if your CDN is down ? Well, when using Google that's not much a risk but still. As a side effect, you should'nt even consider using a CDN if your application is for an intranet.</li>
</ul>
<h4>Conclusion</h4>
<p>As a conclusion, all I can answer to the "Should I use the Google CDN for my javascript libraries ?" is "Well... it depends...".</p>
<p>Really it depends on your configuration. Run some tests, try with a CDN or by compressing the library into your main file. Check where your users are coming from and the average loading time. Test various configuration until you found the one that works the best for you.</p>
<p>On a personal note I do use Google CDN for my websites. The cost of the DNS lookup and connection to the Google server is really worth the parallelized download in my case. But it may be so because I'm living in France and my website is hosted in the US, so a CDN really helps.</p>
<h4>Source links</h4>
<ul>
<li>http://docs.google.com/document/pub?id=14Xn7kkKwVxSie6xHJwWRAP5mutM7qlWcrHgWtZo63gI</li>
<li>http://zoompf.com/blog/2010/01/should-you-use-javascript-library-cdns</li>
</ul>