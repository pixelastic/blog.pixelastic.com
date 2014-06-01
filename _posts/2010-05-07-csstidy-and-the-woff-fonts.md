---
layout: post
title: "@font-face with multiple fonts and CSSTidy"
custom_v2_id: 86
---

<p>The <code>.woff</code> font extension is the standard-to-go in terms of font embedding on the web.</p>
<p>You should add them first in the order of fonts you're loading, before the <code>.ttf</code>/<code>.otf</code> ones.</p>
<pre lang="css"><code lang="css">@font-face {<br />	font-family: "Unibody8SmallCaps Regular";<br />	src: url('fonts/unibody_8-smallcaps-webfont.woff') format('woff'), url('fonts/unibody_8-smallcaps-webfont.ttf') format('truetype');<br />}</code></pre> <p>The interesting thing to note is that you cannot omit the quotes around the <code>format('woff')</code>/<code>format('truetype')</code> part. Otherwise the font won't be recognized (at least by FF3.6).</p>
<p>CSSTidy seems to have a bug when there are multiple <code>format() </code>declarations in a rule, it removes quotes in each of them except the last one, thus making the whole rule unparsable by the browser.</p>
<p>So I started, again, to dig into the CSSTidy code and see what I could do about that.</p>
<p>I updated the <code>csstidy.php</code> file at around line 847 and changed the <code>if</code> statement to look like this :</p>
<pre lang="php"><code lang="php">if($this-&gt;sub_value != '') {<br />	$this-&gt;sub_value_arr[] = $this-&gt;sub_value;<br />	foreach($this-&gt;sub_value_arr as &amp;$sub_value) {<br />		if (substr($sub_value, 0, 6) == 'format') {<br />			$sub_value = str_replace(array('format(', ')'), array('format("', '")'), $sub_value);<br />		}<br />	}<br />	$this-&gt;sub_value = '';<br />}</code></pre> <p>This way all sub values of the <code>src:</code> rule will be correctly parsed, and not only the last one.</p>