---
layout: post
title: "Getting list of Facebook friends from a test account"
custom_v2_id: 324
tags: facebook
---

To get the list of friends of a specific user, you are supposed to issue a
simple `GET `request to `me/friends` (or `USER_ID/friends`), passing the user
accessToken in the request.

Facebook used to return an array named `data` where each value is an object
representing a friend. Each of this objects had two keys : `id `and `name`.

Until yesterday, it worked well.

Today, it seems broken for test users. The `name `key is no longer returned in
the call, you only get `id`.

I'm not sure it's intentionnal or not. At least I haven't seen any notice
about this change. But I'm not sure it's a bug either, as Facebook
documentation is crappy, we never really know if the output we got is the
expected one or if it's a bug.

I'm not even sure we were supposed to get the `name `in the first place,
actually.

What is definitely a bug is that the behavior is different for test users that
for classic users.