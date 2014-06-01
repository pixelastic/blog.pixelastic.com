---
layout: post
title: "Using cakePHP OpenId plugin on Windows"
custom_v2_id: 171
---

<p>After all the praises I've read about OpenId, I decided to implement it in this CMS. My goal was to set an easy way for readers to leave comments without the need for registering to anything.</p>
<p>I thought it would also be great to add as a secondary, and easiest, mechanism for logging in.</p>
<p>So I downloaded and installed the openID component by cakebaker. As I'm running my dev environment under Windows, I had to set some settings.</p>
<h4>Fixing the pluginPath</h4>
<p>I've save the OpenId component in a plugin, and it has a clever mechanism to import the PHP OpenId library based on the folder it is saved.</p>
<p>Unfortunatly, the regexp used to know the name of the current plugin was throwing errors on Windows, due to the backslashes used in the file path.</p>
<p>I updated the <code>getPluginName()</code> method to this new one and it did the trick :</p>
<pre><code lang="php">private function getPluginName() {<br />        $result = array();<br />        $ds = (Folder::isWindowsPath(__FILE__)) ? '\\\\' : DS;<br />        if (preg_match('#'.$ds.'plugins'.$ds.'(.*)'.$ds.'controllers#', __FILE__, $result)) {<br />            return $result[1];<br />        }<br /><br />        return false;<br />    }<br /></code></pre><p>Basically it makes sure that the backslashes are correctly escaped under Windows.</p>
<p>Edit : I've sent this patch to the OpenId component author and it is now fixed in the latest versions.</p>
<h4>Generating randomness</h4>
<p>The second fix was to change the <code>Auth_OpenID_RAND_SOURCE</code> constant to <code>null</code>. This constant enable the library to generate randomness (AFAIK), by using the <code>/dev/urandom</code>.</p>
<p>This does not exists on Windows, so I added the following lines in my <code>bootstrap.php</code></p>
<pre><code lang="php">if (Folder::isWindowsPath(__FILE__)) {<br />    define('Auth_OpenID_RAND_SOURCE', null);<br />}<br /></code></pre><h4>Connecting to SSL servers</h4>
<p>The PHP bundle on Windows comes with <code>cURL </code>already builtin, but without the bundle of the X.509 certificates of public CA. It means that the OpenId PHP library will refuse to connect to any CA using an SSL connection because it won't be able to check the certificate.</p>
<p>This does not happens on Linux, the list is correctly built in.</p>
<p>Fortunatly, we can pass a <code>CURLOPT_CAINFO</code> option to <code>cURL</code> to manually set a pre-defined bundle, and there already is one shipped with the PHP OpenId library.</p>
<p>All you have to do is add the following line on line 93 of the <code>vendors/Auth/Yadis/ParanoidHTTPFetcher.php</code> file :</p>
<pre><code lang="php">curl_setopt($c, CURLOPT_CAINFO, str_replace('\\', '/', dirname(__FILE__)).'/../OpenID/ca-bundle.crt');</code></pre><p> </p>