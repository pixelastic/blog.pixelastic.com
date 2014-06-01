---
layout: post
title: "Some CSS hacks to target IE6 and IE7"
custom_v2_id: 232
---

<p>After stopping using ugly IE hacks and moving to conditionnal comments to load a special IE stylesheet, I now use conditional comments to mark my body element with classes reflecting the current IE version.</p>
<pre><code lang="html">&lt;!--[if IE 6]&gt;&lt;body class="ie ie6 ie-lt8 ie-lt9"&gt;&lt;![endif]--&gt;<br />&lt;!--[if IE 7]&gt;&lt;body class="ie ie7 ie-lt8 ie-lt9"&gt;&lt;![endif]--&gt;<br />&lt;!--[if IE 8]&gt;&lt;body class="ie ie8 ie-lt9"&gt;&lt;![endif]--&gt;<br />&lt;!--[if IE 9]&gt;&lt;body class="ie ie9"&gt;&lt;![endif]--&gt;<br />&lt;!--[if !IE]&gt;&lt;!--&gt;&lt;body class="nie"&gt;&lt;!--&lt;![endif]--&gt;<br /></code></pre><p>This saves me a lot of trouble : less files to manage and easier fixes to write. I quite happy with this solution and have tested it accross several projects for the past 3 months. It works really well.</p>
<p>I had to work on a legacy project last week, where this technique wasn't implemented but all the css code was still compressed using CSSTidy. And I ran into a couple of issues.</p>
<h4>CSSTidy messes the star and underscore hacks</h4>
<p>Using the brilliant <code>_property</code> and <code>*property</code> hacks to target IE6 and IE7 does not work in conjunction with CSSTidy.</p>
<p>For the <code>_property hack</code>, the property is kept as-is, with the underscore, but as they are alphabetically arranged, the <code>_background</code> gets added before the <code>background</code>, rendering it absolutly useless.</p>
<p>On the other hand, on the <code>*property</code>, the <code>*</code> gets removed, and the value is merged with the original value of the correct property. Useless too.</p>
<h4>Other solutions that worked</h4>
<p>To avoid digging into CSSTidy one more time, I tried to find other ways to achieve the same effect.</p>
<p>To target IE6 I used the <code>!ie6</code> hack by writing <code>.mySelector { property:value !ie6; }</code>. IE6 is dumb enough to understand any <code>!blahblah</code> as <code>!important</code>.</p>
<p>I could have also used the fact that IE6 understands <code>.class1.class2</code> as <code>.class2</code>, and could have written <code>.ie6.mySelector {  property:value; }</code> (of course, you have absolutly no <code>class="ie6"</code> in your code)</p>
<p>To target IE7 I made a custom selector that its parsing engine is the only one to understand : <code>*:first-child + html .mySelector { property:value; }</code></p>
<p> </p>