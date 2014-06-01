---
layout: post
title: "Ghost posting on FB.ui streams"
custom_v2_id: 288
---

<p>We had a bit of an issue when launching our app a few weeks ago. Everything was working fine on our test apps, but when live, all the stream messages we posted (we call them "Sharings") had a random text appended.</p>
<p>Most of the time it was a generic Facebook text, but sometimes it was a creepier SQL request just displayed plain on the user feed.</p>
<p>The Facebook text was (for the sake of search engine goodness):</p>
<blockquote>
<p>Facebook is a social utility that connects people with friends and  others who work, study and live around them. People use Facebook to keep  up with friends, upload an unlimited number of photos, post links and  videos, and learn more about the people they meet.</p>
</blockquote>
<p>As the issue only occurs in production mode and never on any of our test environments, this was pretty difficult to debug.</p>
<p>Here was the code used to post the Sharing :</p>
<pre><code lang="js">FB.ui({<br />	[...],<br />	'title' : 'Title of the Sharing',<br />	'caption' : 'Text of the Sharing'<br />});</code></pre>
<p>As I later found out, the <code>caption </code>key is not supposed to hold the Sharing text. The <code>description </code>key should be used for that. I'm not exactly sure was <code>caption </code>was for, but it seems that if you let the <code>description </code>key empty, then Facebook fills it automatically with a placeholder text.</p>
<p>The solution simply was to put the text in the <code>description </code>text, and leaving the <code>caption </code>key empty :</p>
<pre><code lang="js">FB.ui({<br />	'title' : 'Title of the Sharing',<br />	'caption' : '',<br />	'description' : 'Text of the Sharing'<br />});</code></pre>
<p>As this behaviour is counter-intuitive, undocumented and random, I think posting it here could help other lost souls like me.</p>