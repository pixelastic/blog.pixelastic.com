---
layout: post
title: "Disabling a Behavior from inside its setup() method"
custom_v2_id: 215
---

<p>Sometime you write a nice Behavior, that will automate a lot of stuff that almost all your models will need. But, unfortunatly, a couple of models won't need it. Actually, attaching it to them will even break your code.</p>
<p>So what do you do ? Do you resort to manually fill the <code>$actsAs</code> variable of each model, except for the two lonely loosers, or defining the <code>$actsAs</code> of your main <code>AppModel </code>really seems more appaling ?</p>
<h4>Lazyness to the rescue</h4>
<p>If, like me, you prefer writing less code, you'd probably go with the <code>AppModel</code> approach. All you have to do is define a <code>setup()</code> method in your Behavior and check if it is applied to the right or wrong type of model. Fortunatly for us, the <code>$model</code> is passed as first argument.</p>
<p>Once you've identified the faulty models, you just have to disable the behavior for them. The <code>BehaviorCollection </code>that comes bundle into <code>$model-&gt;Behaviors</code> has a nice couple of <code>enable</code>/<code>disable</code> methods. Unfortunatly, they won't work from inside the <code>setup()</code> method because the Behavior is not yet correctly instanciated.</p>
<p>What you can do, however, is to hack inside the <code>BehaviorCollection </code>to update the inner <code>_disabled</code> key to add your own Behavior to the list.</p>
<pre><code lang="php">function setup(&amp;$model, $config = array()) {<br />        [...]<br />	if ($faultyModel) {<br />	        $model-&gt;Behaviors-&gt;_disabled[] = 'MyBehavior';<br />	}<br />}<br /></code></pre>
<p>This is more than a bit hacky, I have to admit that. But it does the trick. Enjoy.</p>