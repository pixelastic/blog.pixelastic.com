---
layout: post
title: "Firing cakePHP components callbacks on error404"
custom_v2_id: 254
---

<p>I often use <code>$this-&gt;cakeError('error404')</code> in my controllers to stop processing the request (and return a 404 error) when the supplied parameters are buggy or incomplete.</p>
<h4>A strange side effect</h4>
<p>I recently spotted a strange side effect on the latest site I was developping. It used a pretty large html footer filled with links dynamically fetched from my database.</p>
<p>As all pages (no matter what model/controller they were refering to) were using the same footer, I created a component with a simple <code>startup</code> method to fetch them all and return them to the view. I added this component to my <code>AppController</code> so that every controller will inherit it.</p>
<p>This worked nicely until I spotted that on error pages, the footer was left mostly empty. I was because my <code>Component</code> callback was never fired.</p>
<h4>How's that ?</h4>
<p>When detecting an error, cake starts using its <code>ErrorHandler </code>and thus do not fire callbacks.</p>
<p>Fortunatly, you can create an <code>AppError </code>class (in <code>app/app_error.php</code>) and overwrite the <code>ErrorHandler </code>method. Namely, the <code>error404</code>. I rewrote mine to explicitly fire the <code>initialize</code> and <code>startup</code> methods.</p>
<pre><code lang="php">class AppError extends ErrorHandler {<br />	function error404($params) {<br />		$this-&gt;controller-&gt;Component-&gt;initialize($this-&gt;controller);<br />		$this-&gt;controller-&gt;Component-&gt;startup($this-&gt;controller);<br />		parent::error404($params);<br />	}<br />}</code></pre>
<p>I only fired two of the callbacks, but maybe <code>beforeRender </code>and <code>shutdown </code>should be fired too.</p>