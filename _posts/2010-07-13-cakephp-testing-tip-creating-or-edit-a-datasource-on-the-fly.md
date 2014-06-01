---
layout: post
title: "cakePHP testing tip : Creating or edit a datasource on the fly"
custom_v2_id: 192
---

<p>For one of the tests I'm currently writing, I needed to assert that my method was correctly returning an error if the connection to the database was impossible.</p>
<p>I couldn't find an easy way to change datasource credentials once the app was initiated, so I decided to manually update the <code>ConnectionManager</code> inner values.</p>
<p>Here's how I did it :</p>
<pre><code lang="php">// Getting the datasource cache in the ConnectionManager object<br />$connectionManagerInstance = ConnectionManager::getInstance();<br />$databaseConfig = &amp;$connectionManagerInstance-&gt;_dataSources;<br /><br />// Saving the initial setting for reverting it later<br />$_defaultConfig = $databaseConfig['default'];<br /><br />// Changing the password so the credentials will fail<br />$databaseConfig['default']-&gt;config['password'].= 'pass';<br /><br />// Getting the updated datasource<br />$connect = ConnectionManager::getDataSource('default');<br /><br />// Error handling when connection unavailable<br />[...]<br /><br />// And reverting the settings back<br />$databaseConfig['default'] = $_defaultConfig;<br /></code></pre>
<p>This proved really useful when testing to simulate a database server error.</p>