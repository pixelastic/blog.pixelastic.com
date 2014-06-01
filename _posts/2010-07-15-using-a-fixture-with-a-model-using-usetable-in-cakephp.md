---
layout: post
title: "Using a fixture with a model using $useTable in cakePHP"
custom_v2_id: 193
---

<p>It seems that if you're creating a fixture for a model that uses an unconventional table name, the <code>CakeTestFixture </code>does not manage to correctly create the needed table when your test starts.</p>
<p>In fact, it will try to insert the fixture records into the right table (the one defined in <code>$useTable</code>), but won't have created the table beforehand.</p>
<p>In fact this is because it will correctly rely on the model <code>$useTable</code> property when inserting records but will try to guess the table name based on the model name when creating the table.</p>
<p>Anyway, the quick fix I've found so far is to define the <code>$table</code> property of your fixture to match your model <code>$useTable</code>.</p>
<pre><code lang="php">class Client extends Model {<br />	var $useTable = 'users';<br />}<br /></code></pre><pre><code lang="php">class ClientFixture extends CakeTestFixture {<br />	var $table= 'users';<br />}<br /></code></pre><p>I've filed a bug report as well as suggested a fix to allow cake to automatically use the correct table.</p>