---
layout: post
title: "Getting list of Facebook friends from a test account"
custom_v2_id: 324
---

<p>To get the list of friends of a specific user, you are supposed to issue a simple <code>GET </code>request to <code>me/friends</code> (or <code>USER_ID/friends</code>), passing the user accessToken in the request.</p>
<p>Facebook used to return an array named <code>data</code> where each value is an object representing a friend. Each of this objects had two keys : <code>id </code>and <code>name</code>.</p>
<p>Until yesterday, it worked well.</p>
<p>Today, it seems broken for test users. The <code>name </code>key is no longer returned in the call, you only get <code>id</code>.</p>
<p>I'm not sure it's intentionnal or not. At least I haven't seen any notice about this change. But I'm not sure it's a bug either, as Facebook documentation is crappy, we never really know if the output we got is the expected one or if it's a bug.</p>
<p>I'm not even sure we were supposed to get the <code>name </code>in the first place, actually.</p>
<p>What is definitely a bug is that the behavior is different for test users that for classic users.</p>