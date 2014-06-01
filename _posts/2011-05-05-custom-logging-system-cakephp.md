---
layout: post
title: "Custom logging system for cakePHP"
custom_v2_id: 275
---

<p>I do love cakePHP, but sometimes it can get tricky to get it to do exactly what you want.</p>
<p>For our big app, we needed to stop using the builtin logging system to take advantage of the syslog and log analyzer tools we had.</p>
<p>At first I got confused by the various log files, but after reading the cake core code, it (kinda) makes sense. Let me explain it to you.</p>
<h4>CakeLog and FileLog</h4>
<p><code>CakeLog </code>is the cake static class that handles all the log actions. You can call it yourself statically using <code>CakeLog::write()</code>, but cake also calls it itself when an error is reported.</p>
<p><code>CakeLog </code>internally write its content using the FileLog. This <code>FileLog </code>writes its content to files located in <code>app/tmp/logs</code>.</p>
<h4>Writing errors to the syslog instead</h4>
<p>We didn't want our logs to be saved in <code>app/tmp/logs</code> for three mains reasons :</p>
<ol>
<li>Those files gets deleted on every deploy we did (this was how our deployment system works)</li>
<li>Those files can get very big very fast</li>
<li>Our app was distributed accross several servers, meaning that each server had its own set of log files</li>
</ol>
<p>Instead, we wanted them to be written to the syslog where they would be intercepted and stored in our main log analyzer.</p>
<p>To do so, we wrote a simple <code>SysLog </code>class to use instead of the <code>FileLog</code>. Here it is :</p>
<pre><code lang="php">class SysLog {<br />	/**<br />	*    Writes a log to the syslog<br />	*    \param    $type    Either a numerical constant or a string<br />	*    \param    $message    Message to log<br />	**/<br />	public function write($type, $message) {<br />		// We "fix" CakeLog that passes severity as a string<br />		if (is_string($type)) {<br />			// Mapping string to syslog priorities<br />			$priorities = array(<br />				'debug'    =&gt; LOG_DEBUG,<br />				'info'        =&gt; LOG_INFO,<br />				'notice'    =&gt; LOG_NOTICE,<br />				'warning'    =&gt; LOG_WARNING,<br />				'error'    =&gt; LOG_ERR,<br />				'default'    =&gt; LOG_NOTICE<br />			);<br />			$type = (array_key_exists($type, $priorities)) ? $priorities[$type] : $priorities['default'];<br />		}<br />		// Writing to syslog<br />		openlog(false, 0, LOG_LOCAL7);<br />		syslog($type, trim($message));<br />		closelog();<br />	}<br />}</code></pre>
<p>Place this file in <code>app/lib/log/sys_log.php</code>. Then, in <code>app/config/bootstrap.php</code>, place the following code :</p>
<pre><code lang="php">CakeLog::config('default', array('engine' =&gt; 'SysLog'));</code></pre>
<p>It is important that you place the <code>CakeLog::config()</code> call in<code> bootstrap.php</code> and not in <code>core.php</code> because of the way cake actually loads its internal. I also manually defined the syslog facility as LOCAL7, but you can change it to whatever you want or even update the code so the actual facility can be passed as a parameter of the <code>CakeLog::config()</code> call (actually, that's how it's done in my real code, but I didn't want to overcomplicate the example).</p>
<p>Also, note that I added a special code to handle the way CakeLog passes parameters to the SysLog. CakeLog passes the severity as a string, so we convert it back to the PHP constants.</p>
<p>With this code, all your logs will now be routed to the syslog, and your <code>app/tmp/logs</code> directory will no longer grow in size (instead, that will be your <code>/var/logs/syslog</code> :) )</p>
<h4>Where are my errors loggued now ?</h4>
<p>Well, your errors are loggued to the syslog. But cake defines its own error handler that will reformat the error thrown by PHP, and reroute it to the <code>CakeLog</code>. In effect, it means that all errors with similar severity will be grouped (<code>E_PARSE</code>, <code>E_ERROR</code>, <code>E_CORE_ERROR</code>, etc will be loggued as<code> LOG_ERROR</code>). Also, cake will parse and reformat the message to log. It can be problematic if you rely on your PHP config to correctly parse your logs because you won't have the expected output.</p>
<p>Hopefully, cake provides a way to disable this error handler, but it was very tricky to find and even more tricky to correctly use. I won't spend too much time on all the details, but what you have to know is :</p>
<ol>
<li>You have to define a <code>define('DISABLE_DEFAULT_ERROR_HANDLING', true);</code> in order to disable the cake error handler and use the default PHP one</li>
<li>This call MUST be done before your <code>Configure::write('debug')</code> call otherwise it won't work</li>
<li>You also have to define a <code>Configure::write('log', E_ALL &amp; ~E_DEPRECATED);</code> for this to work but...</li>
<li>You can't define both the debug and the log value in the same call using an array, you have to define them in two different calls <code>debug </code>then <code>log</code></li>
</ol>
<p>So, finally, here is the final working configuration :</p>
<p>In <code>app/config/core.ph</code>p :</p>
<pre><code lang="php">Configure::write('log', E_ALL &amp; ~E_DEPRECATED);<br />define('DISABLE_DEFAULT_ERROR_HANDLING', true);<br /></code></pre>
<p>And in<code> app/config/bootstrap.php</code> :</p>
<pre><code lang="php">CakeLog::config('default', array('engine' =&gt; 'SysLog'));</code></pre>
<h4>Final words</h4>
<p>I wrote this blog post because I got hit by this problem. Twice. I didn't bloggued about it the first time, so a few weeks later when I had to change some config values in my bootstrap.php and core.php I forgot about the specific order of loading things. It took me a couple hours to figure it out again.</p>
<p>So, to avoid running into the same issue some months from now, I took some time to write it down, and hopefully I'll help some of you too.</p>