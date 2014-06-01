---
layout: post
title: "cakePHP wrapper for EmailComponent::send()"
custom_v2_id: 264
---

<p>As I already wrote in a <a title="Tweak to add to the EmailComponent::send method to send mails to SquirelMail" href="/blog/230:displaying-html-mails-sent-from-cakephp-in-squirrelmail">previous post</a>, the cakePHP <code>EmailComponent </code>seems to have some quirks, forcing me to add more code to send an email.</p>
<p>I stumbled upon one more issue today : a <code>View</code> poisoning coming from the <code>EmailComponent</code>. Some vars I was passing to my view through the use of a custom <code>Helper </code>were wipe away if I send a mail in the same request.</p>
<p>It took me some time to track it down, but I finally decided that I'll now wrap calls to <code>$this-&gt;Email-&gt;send()</code> into a <code>__sendEmail()</code> custom method where I'll add my tweaks.</p>
<p>This will help migrating to a newer cake version easier when those bugs will be fixed.</p>
<h4>Easy debug</h4>
<p>Debugging emails is not an easy task, but is greatly eased by cake. One can set the delivery type to <code>debug </code>and the mail will be generated like a normal mail, but won't be sent. Instead, its content will be saved in <code>Session</code>.</p>
<p>My wrapper will allow switching from normal to debug mail thanks to an argument.</p>
<h4>View cleaning</h4>
<p>I'll also clear the <code>ClassRegistry </code>from the <code>View </code>created by the <code>EmailComponent</code>. The <code>Email </code>view is shared with the display view and this can result in vars being lost or not correctly set. I think all those troubles are gone in cake 2.0 but I haven't tested it yet.</p>
<h4>The __sendMail method</h4>
<p>Here is the method code. You should add it to your AppController :</p>
<pre><code lang="php">function __sendMail($sendAsDebug = false) {<br />	if (empty($this-&gt;Email)) {<br />		return false;<br />	}<br />	// Debug mode<br />	if (!empty($sendAsDebug)) {<br />		$this-&gt;Email-&gt;delivery = 'debug';<br />	}<br />	// We force adding the boundaries and header otherwise some webmail (like SquirelMail) won't correctly display them<br />	$this-&gt;Email-&gt;_createboundary();<br />	$this-&gt;Email-&gt;__header[] = 'MIME-Version: 1.0';<br />	<br />	$this-&gt;Email-&gt;send();<br />	<br />	// We display debug info<br />	if (!empty($sendAsDebug)) {<br />		debug($this-&gt;Session-&gt;read('Message.email.message'), true);<br />	}<br />	// We also need to clear the generated view so our display does not get poisoned by the Email display<br />	ClassRegistry::removeObject('view');<br />}</code></pre>
<p> </p>