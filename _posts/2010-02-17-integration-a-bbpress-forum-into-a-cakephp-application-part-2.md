---
layout: post
title: "Integration of a bbPress forum into a cakePHP application (part 2)"
custom_v2_id: 47
---

<p>We've done enough work on the forum for now. The time has come to edit our cake files.</p>
<h4>Creating the cakePHP models</h4>
<p>We will create two models to help in speaking with the bbPress database.</p>
<p>Create a bb_usermeta.php model :</p>
<pre lang="php"><code lang="php">class BbUsermeta extends AppModel {<br />	var $useTable = 'bb_usermeta';<br />	var $primaryKey = 'umeta_id';<br />}</code></pre>
<p>Create a <code>bb_user.php</code> model :</p>
<pre lang="php"><code lang="php">class BbUser extends AppModel {<br />	var $primaryKey = 'ID';<br /><br />	var $hasMany = array(<br />		 'BbUsermeta' =&gt; array(<br />			 'className' =&gt; 'BbUsermeta',<br />			 'foreignKey' =&gt; 'user_id',<br />			 'dependent' =&gt; true<br />		)<br />	 );<br /><br />	//We make sure, before saving, that the nicename is url-friendly<br />	function beforeSave() {<br />		if (!empty($this-&gt;data[$this-&gt;name]['user_nicename'])) {<br />			$this-&gt;data[$this-&gt;name]['user_nicename'] = Inflector::slug($this-&gt;data[$this-&gt;name]['user_nicename']);<br />		}<br />		return true;<br />	}<br /><br />}</code></pre>
<p>So, what was that about ?</p>
<p>We created two models to communicate with bbPress. bbPress stores user-related information in <code>bb_users</code> as well as <code>bb_usermeta</code>. We defined the <code>$primaryKey</code>, <code>$useTable</code> and <code>$foreignKey</code> of the <code>$hasMany</code> because the bbPress tables do not follow the cakePHP convention.</p>
<p>We also add a nifty <code>beforeSave()</code> method to <code>BbUser </code>to make sure its <code>user_nicename</code> (used as an url slug) is url-friendly.</p>
<h4>How to save bbPress users from the cakePHP app</h4>
<p>Great. Now you can easily add, edit and delete users from bbPress directly from your app.</p>
<p>There are some things you should know about before doing that :</p>
<ul>
<li><code>first_name</code> and <code>last_name</code> are stored in <code>bb_usermeta</code></li>
<li>the access rights are defined in <code>bb_usermeta</code> too, using the <code>bb_capabilities</code> key</li>
</ul>
<p>Now that you know all that, you can easily create a behavior creating a new bbPress user when creating a new user, deleting that bbPress user when deleting the main user and updating the bbPress user when updating the main user.</p>
<p>I myself wrote this behavior, but as it is part of a more general bbPress plugin it may not work as-is. I'll try to publish it if anyone is interested.</p>