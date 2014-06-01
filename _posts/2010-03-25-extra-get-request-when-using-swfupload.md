---
layout: post
title: "Extra GET request when using SWFUpload"
custom_v2_id: 60
---

<p>I've been using <a href="http://swfupload.org/">SWFUpload </a>for quite a long time now. Put simply, it's a Flash/Javascript plugin allowing a file upload to be done without having to submit the page.</p>
<p>Basically it uses the streaming upload capacity of flash to fire javascript events to tell the developer the upload percentage, do some filesize and filetype checks, etc.</p>
<p>If you've ever seen an upload progress bar on any website, it most surely was done using SWFUpload.</p>
<p>Anyway, today I spotted a strange behavior in one of my pages, heavily using <code>SWFUpload </code>(more or less 20 upload fields). Using the Net panel of Firebug, I saw some strange GET requests being made to my website.</p>
<p>After digging into my code, I could isolate the problem. I was coming from <code>SWFUpload </code>itself. I even found record of <a href="http://code.google.com/p/swfupload/issues/detail?id=202">a bug report</a> mentionning it.</p>
<p>In a nutshell, SWFUpload always make a request to the url specified in the <code>button_image_url</code> parameter, even if you haven't specified one (in this case it made a request to your webroot).</p>
<p>I'm not using any image for my button, or should I say, I take care of that in CSS already, my SWFUpload button is just an invisible Flash element, positionned on top of my existing button.</p>
<p>I tried setting the value to <code>null</code>, <code>false </code>or an empty string, but it would continue to do the request.</p>
<p>Anyway, I upgraded to the latest version (2.5.0 Beta 3), and it solves my problem. Now I'm just hoping that all the retro-compatibility will be kept.</p>