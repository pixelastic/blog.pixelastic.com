---
layout: post
title: "Setting the size of a tab character in a pre element"
custom_v2_id: 79
---

<p>When displaying code in an HTML page, you often want it to be correctly indented with tabs. Unfortunatly, setting a <code>white-space:pre </code>(like is the default on a &lt;pre&gt; element) to an element will transform any tab in the equivalent of 8 space characters.</p>
<p>8 is way more than needed, 4 will be much suited, specially in a website design where the horizontal space is limited.</p>
<p>I've googled a lot, going from obscure old CSS drafts to proprietary implementation mailing lists, browsing CSS codes.</p>
<p>One <a href="http://www.phwinfo.com/forum/comp-inf-authoring-css/365851-change-tab-width-using-css.html">interesting discussion can be found here</a>, there even is a <a href="http://www.w3.org/People/howcome/t/970224HTMLERB-CSS/WD-tabs-970117.html">proposal for a tab-stops property</a> on the W3C</p>
<p>Opera has a proprietary <code>-o-tab-size</code>. You just have to pass the number of space characters that should be used.</p>
<p>That's all I have for now...</p>
<p>I know I could replace every<code> \t</code> with 4 <code>&amp;nbsp;</code>, or with a <code>&lt;span&gt;</code> that I'll style to match the desired width but it involves a back-end processing and I would have liked to style it directly.</p>
<p>Edit : There seems to have a <code>-moz-tab-size</code> property on the latest Firefox 3.7 nightlies</p>