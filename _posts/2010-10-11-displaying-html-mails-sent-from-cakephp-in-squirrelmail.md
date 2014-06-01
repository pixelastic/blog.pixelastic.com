---
layout: post
title: "Displaying HTML mails sent from cakePHP in SquirrelMail"
custom_v2_id: 230
---

<p>I just stumble upon the fact that my automated multipart (text + html) mails sent from my apps weren't correctly displayed on SquirrelMail.</p>
<p>I'm personnaly using GMail for my day to day email needs, but one of my client was using the default <a href="http://squirrelmail.org/" target="_blank">SquirrelMail</a> (v1.4.21) install on their <a href="http://www.dreamhost.com/" target="_blank">Dreamhost account</a>. The received mails are not correctly parsed and get displayed as plain text, even if the header clearly specifiy a <code>Content-Type: multipart/alternative; boundary="alt-"</code></p>
<p>The first culprit was that no boundary were given. This does not seem to cause GMail any problem, but I thought that SquirrelMail may choke on that. So I manually added a <code>$this-&gt;Email-&gt;_createboundary();</code> call before my <code>$this-&gt;Email-&gt;send();</code></p>
<p>Still, no succes. After some googling I found a <a href="http://cakephp.lighthouseapp.com/projects/42648-cakephp/tickets/14-email-component-should-set-mime-version-header-when-sendas-html-or-both" target="_blank">bug report</a> for a similar problem. I tried adding the suggested MIME header, and that solved my problem.</p>
<p>So here's my updated code :</p>
<pre><code lang="php">$this-&gt;Email-&gt;sendAs = 'both';<br />$this-&gt;Email-&gt;_createboundary();<br />$this-&gt;Email-&gt;__header[] = 'MIME-Version: 1.0';<br />$this-&gt;Email-&gt;send();</code></pre>
<p>I'll now have to add those two additional line of code everytime I'll have to send a multipart (html + text) email in cakePHP, until it get fixed (no specified milestone).</p>