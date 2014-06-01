---
layout: post
title: "Correctly instanciating models in components"
custom_v2_id: 216
---

<p>I sometime need access to a specific model in a component. Say a <code>User </code>model for checking user rights in an <code>Auth </code>component. In that cases, I just create an instance of the model by calling a <code>$myModel = &amp;ClassRegistry::init($myModelName)</code>. It works perfectly.</p>
<p>Today I found that it wasn't working exactly as I wanted. In fact, behaviors used by models loaded that way are not completely set up. All their callback methods (<code>beforeFind</code>, <code>afterFind</code>, <code>beforeSave</code>, <code>afterSave</code>) works as expected, but the main <code>setup</code> method is never called.</p>
<p>This caused some havoc in my app because some <strong>reaaaaally </strong>important stuff was defined in the <code>setup</code> method</p>
<h4>There I fixed it</h4>
<p>I just manually fired all the <code>setup</code> methods by calling a simple :</p>
<pre><code lang="php">foreach($myModel-&gt;Behaviors-&gt;_attached as $behaviorName) {<br />	$myModel-&gt;Behaviors-&gt;{$behaviorName}-&gt;setup($myModel);<br />}<br /></code></pre>
<p>Once again, small fix, but does the trick. I did not file a bug report because I'm not really sure this is bug or if that is so by design.</p>