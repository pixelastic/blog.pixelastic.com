---
layout: post
title: "The dreaded <noscript> on IE7"
custom_v2_id: 246
---

<p>This <code>&lt;noscript&gt;</code> tag on IE7 is making me crazy. Here are some "interesting" facts about it :</p>
<h4>No content through Javascript</h4>
<p>You can't get its content though javascript. It can be targeted but  neither <code>.innerHTML</code> nor <code>.textContent</code> is set. It does not have any  <code>.childNodes</code> either.</p>
<h4>Gets displayed even when scripts are enabled</h4>
<p>If you set <code>noscript { display:block; border:15px solid red;},</code> it will  get displayed even if Javascript is enabled. But with no content inside, you'll only have borders and background...</p>
<h4>Styling it anyway</h4>
<p>If you want to style it, just add an inner element and style this one :</p>
<pre><code lang="html">&lt;noscript&gt;&lt;p&gt;Lorem ipsum&lt;/p&gt;&lt;/noscript&gt;</code></pre>
<pre><code lang="css">noscript p { background:blue; }</code></pre>
<h4>Disabling Javascript on IE7</h4>
<p>If you want to disable Javascript on IE7, you'll have to go to Tools &gt; Internet Options &gt; Security &gt; Custom and setting the "Enable ASP scripts" to No.</p>
<p>Yes, this doesn't make any sense.</p>
<br />