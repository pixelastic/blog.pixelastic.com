---
layout: post
title: "Disabling PHP scripts in a directory"
custom_v2_id: 212
---

<p>Say you want to disable PHP scripts in a whole directory. Like your <code>upload/</code> directory, because you don't want your users to upload <code>.php</code> files with direct webroot access on your server...</p>
<p>Just drop a <code>.htaccess</code> file in it, and add the following rules</p>
<pre><code lang="apache"># We don't want php files from being parsed by the server in this directory, so we will return them as plain text<br />AddType text/plain .php .php3 .php4 .php5 .php6 .phtml<br /><br /># Or, if the first rule does not work on your server, you may want to completely turn off PHP<br />#php_flag engine off<br /></code></pre>
<p> </p>