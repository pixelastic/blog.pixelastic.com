---
layout: post
title: "CSS3 gradients with CSSTidy"
custom_v2_id: 188
---

<p>Gradients are one of the new cool stuff CSS3 brought with it. Like the others cool things, it still suffer from a partial implementation and vendor-specific properties.</p>
<p>It also isn't correctly parsed by CSSTidy. Here I'll show you how to patch your CSSTidy to make it eat gradients correctly.</p>
<h4>Quick and dirty patch</h4>
<p>First, you'll need to edit the huge <code>parse()</code> method in c<code>sstidy.ph</code>p. You'll have to add a condition to explictly tell CSSTidy not to discard <code>-webkit-gradient</code> and <code>-moz-linear-gradient</code>.</p>
<p>Just open your <code>csstidy.php</code> file, find the <code>parse()</code> method and locate the <code>case 'instr'</code> in the huge <code>switch </code>statement.</p>
<pre><code lang="php">if (!($this-&gt;str_char === ')' &amp;&amp; in_array($string{$i}, $GLOBALS['csstidy']['whitespace']) &amp;&amp; !$this-&gt;str_in_str)) {<br />	$this-&gt;cur_string .= $temp_add;<br />} <strong>else {</strong><br /><strong>	if ($this-&gt;sub_value=="-webkit-gradient" || $this-&gt;sub_value=="-moz-linear-gradient") {</strong><br /><strong>		$this-&gt;cur_string.=' ';</strong><br /><strong>	}</strong><br /><strong>}</strong><br /></code></pre><p>In bold, the <code>else </code>part to add. This will make sure your webkit and firefox gradient rules will get processed correctly.</p>
<p>I don't really understand WHY it work, but it does. The <code>parse() </code>method is a huge uncommented mess, it is quite difficult to understand it. There must be a better way, a more generic one than specifying some properties, but I didn't manage to come with anything better than that.</p>
<p>Fortunatly, the next part is cleaner.</p>
<h4>Telling CSSTidy which properties not to merge</h4>
<p>If you write a css like the following, only the latest (<code>color:white</code>) rule will get through CSSTidy.</p>
<pre><code lang="css">body {<br />	color:red;<br />	color:white;<br />}<br /></code></pre><p>That's logical, because CSSTidy will remove any unused CSS declaration. Unfortunatly, this is not what we want, because we need to declare several <code>background:</code> rules, one for Webkit, and one for Firefox.</p>
<p>By looking at CSSTidy source code, we can find that it contain a quick fix to allow the <code>cursor:</code> property to be defined several time (to cope with the old <code>cursor:pointer</code> / <code>cursor:hand</code> issue).</p>
<p>I just extended this quick fix to work for other properties as well, and even managed to allow them to be passed as a config value.</p>
<h4>Defining the config value</h4>
<p>First, open the <code>csstidy.php</code> file, and around line 310 you should find a list of default config values. Just add the following :</p>
<pre><code lang="php">$this-&gt;settings['multiple_properties'] = array('cursor', 'background');<br /></code></pre><p>This will define the default list of properties that are allowed to be defined several times in a css rule.</p>
<p>Next, we'll edit the <code>set_cfg()</code> method to allow the passing of array values. Just replace the else statement with this one :</p>
<pre><code lang="php">else if(isset($this-&gt;settings[$setting]) &amp;&amp; $value !== '') {<br />	// Merging array settings<br />	if (is_array($value) &amp;&amp; is_array($this-&gt;settings[$setting])) {<br />		$this-&gt;settings[$setting] = array_merge($this-&gt;settings[$setting], $value);<br />	} else {<br />		// Setting classic setting<br />	$this-&gt;settings[$setting] = $value;<br />	}<br /><br />	if ($setting === 'template') {<br />		$this-&gt;_load_template($this-&gt;settings['template']);<br />	}<br />	return true;<br />}<br /></code></pre><p>You can now pass a list of properties to be added to the existing list by calling <code>-&gt;set_cfg('multiple_properties', array('property1', 'property2'));</code></p>
<p>Now, find the <code>css_add_property(</code>) method, and around line 1066, change the<code> if (strtolower($property) == 'cursor') </code>if statement to this more generic one :</p>
<pre><code lang="php">if (in_array($property, $this-&gt;get_cfg('multiple_properties')))<br /></code></pre><p>And now, in <code>csstidy_print.php</code>, find the<code> _print()</code> method, and replace the <code>case PROPERTY</code> block with this (more concise) one :</p>
<pre><code lang="php">case PROPERTY:<br />	// Converting back multiple properties<br />	$multipleProperties = $this-&gt;parser-&gt;get_cfg('multiple_properties');<br />	foreach($multipleProperties as $property) {<br />		$propertyLength = strlen($property);<br />		if (substr($token[1], 0, $propertyLength)==$property) $token[1] = $property;<br />	}<br /><br />	// Applying correct casing<br />	$caseProperties = $this-&gt;parser-&gt;get_cfg('case_properties');<br />	if ($caseProperties==2) $token[1] = strtoupper($token[1]);<br />	if ($caseProperties==1) $token[1] = strtolower($token[1]);<br />	<br />	$out .= $template[4] . $this-&gt;_htmlsp($token[1], $plain) . ':' . $template[5];<br />break;<br /></code></pre><h4>And that's it</h4>
<p>You now can have gradients compressed with CSSTidy. Well sort of, because this is just a quick and dirty patch, as I'm not the creator of CSSTidy.</p>
<p>This could surely be improved in a less hacky way, for example by compressing the color code used in the gradients...</p>