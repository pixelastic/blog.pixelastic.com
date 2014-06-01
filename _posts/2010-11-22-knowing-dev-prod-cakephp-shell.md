---
layout: post
title: "Knowing dev from prod in a cakePHP shell"
custom_v2_id: 240
---

<p>I wrote a cakePHP shell to synchronize an IMAP mailbox with a mysql table. I wanted to test my shell on local first, then upload it and make a CRON job of it.</p>
<p>Whenever I tried to run the shell from my development environment I was greeted with various "<em>Database table is missing</em>" messages.</p>
<p>After some digging, it occurs that the shell was connecting to my prod database, not the dev one.</p>
<h4>The culprit</h4>
<p>I wrote a little snippet to automatically switch to the correct database based on the current server name. If it was <code>localhost</code>, I used the <code>$dev</code> credentials, while keeping the <code>$default</code> credentials for other cases (ie. production).</p>
<p>This worked great and I added this little code to my <code>database.php</code> file.</p>
<p>But when running a shell, the <code>env('SERVER_ADDR')</code> was empty, thus my test was always selecting the prod database.</p>
<p>I couldn't find anyway to guess if I was running a shell from prod or dev. I sure had access to a lot of config informations through <code>env</code> and <code>$_SERVER</code> but none seemed to be enough to guess the correct environment.</p>
<h4>Solution</h4>
<p>I finally decided that the only way was to manually pass a flag to my shell call to tell if it was to use the dev or prod credentials.</p>
<p>I decided that adding a <code>dev</code> arg to the shell call will switch to dev mode, while not adding it will use production mode.</p>
<pre><code lang="sh">My final shell call looked like : cake -app "path/to/app" mail_import dev<br /></code></pre>
<p>And I added the following logic in my database switching logic :</p>
<pre><code lang="php">// Defining the Environment (prod or dev)<br />if (defined('CAKEPHP_SHELL')) {<br />	// Based on the prod/dev flag<br />	$args = env('argv');<br />	$environment = 'prod';<br />	foreach($args as $flag) {<br />		if ($flag=='dev') {<br />			$environment = 'dev';<br />			break;<br />		}<br />	}<br />} else {<br />	// Based on the server url<br />	$environment = (env('SERVER_ADDR')=='127.0.0.1') ? 'dev' : 'prod';<br />}</code></pre>
<p>Note that I checked if the script was accessed through normal server/php delegation or through the CLI using <code>defined('CAKEPHP_SHELL')</code></p>