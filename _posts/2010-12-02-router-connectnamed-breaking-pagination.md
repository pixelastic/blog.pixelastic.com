---
layout: post
title: "Using Router::connectNamed without breaking pagination"
custom_v2_id: 247
---

<p>In cakePHP, you can pass all sort of parameters to your urls by following the <code>www.domain.com/controllers/view/foo:bar/foo2:baz</code> syntax.</p>
<p>You could then access <code>$this-&gt;params['foo']</code> and <code>$this-&gt;params['foo2']</code> in your <code>Controller::view()</code> method.</p>
<h4>Using Router::connectName()</h4>
<p>This does not play nice with default routing. I mean, if you define a route to add a vanity url like <code>www.domain.com/vanity</code> is routed to <code>Controller:view()</code>, you'll write something like this :</p>
<pre><code lang="php">Router::connect('/vanity', array('controller' =&gt; 'controllers', 'action' =&gt; 'view'));</code></pre>
<p>This will work as long as you don't specify any additional parameters. Once you started to add any parameters, the Router won't be able to parse your url and instead of returning <code>www.domain.com/vanity/foo:bar/foo2:baz</code> it will return the default <code>www.domain.com/controllers/view/foo:bar/foo2:baz</code></p>
<p>If you do want your custom parameters to be taken into account by your <code>Router</code> rules, you have to manually add them, using<code> Router::connectNamed(array('foo', 'foo2'))</code>.</p>
<h4>Custom connectNamed()</h4>
<p>I'll let you browse the <a title="Router::connectMail()" href="http://api.cakephp.org/class/router#method-RouterconnectNamed" target="_blank">connectNamed()</a> documentation page for further details on how to use it properly. But one important thing not to overlook is that if you ever have to define a custom <code>Router::connectNamed()</code>, do not forget to add a second parameter of <code>array('default' =&gt; true)</code>, this will allow all your paginated links to keep working.</p>