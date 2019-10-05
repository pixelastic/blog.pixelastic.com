---
layout: post
title: "Getting the list of Facebook pending requests of a user"
custom_v2_id: 318

---

Getting the list of pending facebook requests of a user a few weeks back was
as easy as calling `https://graph.facebook.com/me/apprequests?access_token={user_access_token}`

We discovered around the 1st October that some of our requests were failing in
production, without any more clue than some "OAuthException : access_token
invalid" messages in our logs.

It appears that FB changed the way their endpoint react to `/apprequests`
call. Of course, they didn't bother telling us.

The previous url does not work anymore. Switching the user access_token to the
app access_token as documented does not work (as usual with FB documentation).
It returns an error.

Instead, the following call wil yield the correct result : `https://graph.facebook.com/{user_id}/apprequests?access_token={app_access_token}`
