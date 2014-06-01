---
layout: post
title: "UTF-8 encoding for included .jsp files"
custom_v2_id: 358
---

<p>Today I had to split a gigantic <code>.jsp</code> file into several smaller files. I used the <code>&lt;@include file="./path/to/file.jsp"&gt;</code> syntax in order to do this.</p>
<p>Unfortunatly, all the included files were displayed with garbage instead of UTF-8 characters.</p>
<p>So I ran the list of usual suspects : - <code>Content-Type:text/html; charset=utf-8</code> is correctly returned by my server. - <code>&lt;meta charset="utf-8"&gt;</code> is the first element of my <code>&lt;head&gt;</code>. - No data is being fetched from a database, so it cannot come from there. - All my files are correctly encoded in UTF-8.</p>
<p>Also, I added a <code>&lt;%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%&gt;</code> as the very first line of my main <code>index.jsp</code>. I also added the following code to <code>pom.xml</code> to make <code>UTF-8</code> the default encoding :              [...]         UTF-8</p>
<p>Any <code>UTF-8</code> in the main <code>index.jsp</code> was fine, but as soon as it was in an included it was displayed as garbaged. At first, I manually added <code>&lt;%@ page pageEncoding="UTF-8"%&gt;</code> to every included page and it fixed the issue. But as I was dealing with dozen of included files, I needed a more generic solution.</p>
<p>Turns out that I had to edit my <code>web.xml</code> file and add the following configuration :</p>
<pre><code>&lt;jsp-config&gt;
    &lt;jsp-property-group&gt;
        &lt;url-pattern&gt;*.jsp&lt;/url-pattern&gt;
        &lt;page-encoding&gt;UTF-8&lt;/page-encoding&gt;
    &lt;/jsp-property-group&gt;
&lt;/jsp-config&gt;
</code></pre>
<p>And it worked !</p>