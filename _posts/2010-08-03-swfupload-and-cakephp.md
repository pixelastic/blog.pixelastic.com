---
layout: post
title: "SWFUpload and cakePHP"
custom_v2_id: 208
---

<p>One thing that always sent me an awful hours of debugging is the fact that the Flash player identify itself as a whole different browser that the one it is integrated into.</p>
<p>I've ran into this issue multiple times when dealing with SWFUpload and today was one more. As I always spent quite a lot of time debugging issues arising from this, I guess I should post about it here.</p>
<h4>The Flash player uses a different userAgent that your browser</h4>
<p>Most of the time, this is not a problem. But when dealing with restricted areas of a website built on top of cakePHP, it can become one.</p>
<p>The thing is that as the <code>userAgent </code>string used by the Flash player is not the same as the one used by your browser. So, when you make a request to your site, cake will see that as whole new request and you won't be able to access your current session variables.</p>
<p>As you can't overwrite the <code>userAgent </code>hash sent, you need to send the <code>sessionId </code>along with your flash request. That way, you'll be able to call a</p>
<pre><code lang="php">$this-&gt;Session-&gt;id($sessionId);<br />$this-&gt;Session-&gt;start();</code></pre>
<p>in your controller <code>beforeFilter </code>(or component <code>initialize</code>)</p>
<p><em>In cake 1.2, you'll also have to call <code>$this-&gt;Session-&gt;destroy()</code> before to delete the Flash session created.</em></p>
<h4>The Flash player uses a different cookie pool that your browser</h4>
<p><em>This used to be an issue in 1.2 but not longer is.</em></p>
<p>Cake stores in a cookie the name of the session you're supposed to use. Flash having its own cookie pool, it will save its own cookie (usually somewhere you don't even know) and will always check for the session specified inside.</p>
<p>This took me quite a long time to found out why the flash request where reading an other request that the one I was setting.</p>
<p>In 1.2, you needed to delete the cookie created by cake whenever you made a flash request to avoid conflicts</p>
<pre><code lang="php">setcookie(Configure::read('Session.cookie'), '', time() - 42000, $this-&gt;Session-&gt;path);<br /></code></pre>
<h4>cakePHP used to overwrite the userAgent string in session</h4>
<p>In cake 1.2, when you manually change the current session, cake would update the inner <code>userAgent </code>hash saved to your current userAgent hash.</p>
<p>This meant that whenever you were moving from the Flash session to the correct session, you had to overwrite the <code>userAgent </code>hash to the correct one.</p>
<pre><code lang="php">$this-&gt;Session-&gt;write('Config.userAgent', $userAgent);<br /></code></pre>
<p><em>This is no longer the case in 1.3, changing the current session does not alter it anymore.</em></p>
<h4>Doesn't all that stuff alter security ?</h4>
<p>Well, most of the answers I found online were among the lines of "Just disable the check of the <code>userAgent</code>", so I think my method is a little bit more secure.</p>
<p>Anyway, passing a <code>sessionId </code>as a parameter seems a little risky, even to me. I guess there should be a way of encrypting it to not pass it as clear text</p>
<h4>UPDATE !</h4>
<p>I had to fiddle with this script some more. It appears that, as we are changing the <code>sessionId</code>, we need to do that BEFORE we access the session. It means that any call to <code>Session::read()</code> or <code>Session::check()</code>, or almost any other Session method BEFORE setting the id will block this trick from working. So, make sure that this code is executed before anything else, put it in a component that will be loaded first.</p>
<p>It also appears that if you follow my advice, you'll only have to call <code>id($sessionId)</code>, and none of the hocum pocum about <code>destroy</code>, <code>write </code>and <code>userAgent </code>hashes I talked about...</p>
<p>I just lost some hours finding this out. I add a call to Session in my <code>I18n </code>component that was rendering this whole fix useless. It was driving me crazy...</p>