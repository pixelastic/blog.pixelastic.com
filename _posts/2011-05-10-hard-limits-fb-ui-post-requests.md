---
layout: post
title: "Hard limits using FB.ui to post Requests"
custom_v2_id: 278
---

<p>I hate Facebook documentation. All pages seems out of date, displaying wrong function signature, obsolete parameters, documentation link pointing to 404 pages, etc, etc.</p>
<p>I've lost some hours debugging those calls, finding whatever hard limit Facebook forced on some of the arguments.</p>
<p>Let us write a very basic example code :</p>
<pre><code lang="js">FB.ui({<br />	'method' : 'apprequests',<br />	'display': 'iframe',<br />	'message' : "Hey, this Request is awesome, just accept it, ok ?",<br />	'title' : "Awesome request incoming",<br />	'filters' : [<br />		{ "name" : "Some friends", "user_ids" : [ "97841578", "548673131", "[...]"]  },<br />		{ "name" : "Some other friends", "user_ids" : [ "97841578", "56867134", "[...]"]  },<br />	]<br />});</code></pre>
<p>This should open a Request popup with the custom title and message, as well as provide a list of friends that you can filter based on two criterias : "Some friends" and "Some other friends".</p>
<h4>What will go wrong</h4>
<p>First, you have to know that both the message and title have a character limit. If you go over it, the popup will simply display something like "An error occurred, blah blah blah".</p>
<p>After some fiddling, I discovered that the limit is 50 chars for the title and 255 for the message.</p>
<p><del>Also, there is no limit (as far as I know) to the limit of custom filters you can set.</del> <ins>See update below.</ins> But there is one to the max number of users you can define in a filter. And that number is 1000.</p>
<p>This means that if my <code>user_ids</code> list for any of my custom filters contains more than 1000 users, the popup will fail. However, you can have as many filters with 999 users as you want.</p>
<p>Took me a little while to find, and I thought that this could be shared.</p>
<h4>Update</h4>
<p>I found a new hard limit : You can't set more than 5 filters at a time. If you add one more, the Request popup will fail.</p>
<h4>New Update</h4>
<p>Also, if you define a callback, don't forget to <code>return true</code>. Otherwise Webkit will refuse to close the FB popup and you'll have to click twice for it to really close itself.</p>
<h4>Update (bis repetita)</h4>
<p>This one was pretty hard to find but if your filter contains a facebook id of someone that is not a friend of the currently loggued user, the filter will display nothing.</p>
<p>In our app, we have a filter of "Neighbors" (as most social games do). But one of thoses neighbors removed the user from its friends, and we didn't update the neighbor list to reflect that, resulting in our "Neighbors" filter being empty.</p>