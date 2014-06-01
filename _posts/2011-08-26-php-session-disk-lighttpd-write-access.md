---
layout: post
title: "PHP session on disk with lighttpd, and write access"
custom_v2_id: 307
---

<p>On HappyLife, we used to use Memcache to handle the php sessions. We discovered a while back after much trouble that Memcache might not have been the best solution for sessions on a high traffic site. But this will be the subject of another post.</p>
<p>Anyway, I switched back to classical session, stored on disk.</p>
<p>Here's the relevant <code>php.ini</code> config</p>
<pre><code lang="ini">[Session]<br />session.save_handler = files<br />session.save_path = '/tmp/php'</code></pre>
<p><code>/tmp/php</code> should be writable by <code>www-data</code>, so</p>
<pre><code lang="sh">$ chown www-data:www-data /tmp/php</code></pre>
<p> </p>