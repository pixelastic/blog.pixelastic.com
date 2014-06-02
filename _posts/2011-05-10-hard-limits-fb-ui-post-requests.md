---
layout: post
title: "Hard limits using FB.ui to post Requests"
custom_v2_id: 278
---

I hate Facebook documentation. All pages seems out of date, displaying wrong
function signature, obsolete parameters, documentation link pointing to 404
pages, etc, etc.

I've lost some hours debugging those calls, finding whatever hard limit
Facebook forced on some of the arguments.

Let us write a very basic example code :


```js
FB.ui({
  'method' : 'apprequests',
  'display': 'iframe',
  'message' : "Hey, this Request is awesome, just accept it, ok ?",
  'title' : "Awesome request incoming",
  'filters' : [
    { "name" : "Some friends", "user_ids" : [ "97841578", "548673131", "[...]"]  },
    { "name" : "Some other friends", "user_ids" : [ "97841578", "56867134", "[...]"]  },
  ]
});
```

This should open a Request popup with the custom title and message, as well as
provide a list of friends that you can filter based on two criterias : "Some
friends" and "Some other friends".

## What will go wrong

First, you have to know that both the message and title have a character
limit. If you go over it, the popup will simply display something like "An
error occurred, blah blah blah".

After some fiddling, I discovered that the limit is 50 chars for the title and
255 for the message.

<del>Also, there is no limit (as far as I know) to the limit of custom filters
you can set.</del> See update below. But there is one to the max number of
users you can define in a filter. And that number is 1000.

This means that if my `user_ids` list for any of my custom filters contains
more than 1000 users, the popup will fail. However, you can have as many
filters with 999 users as you want.

Took me a little while to find, and I thought that this could be shared.

## Update

I found a new hard limit : You can't set more than 5 filters at a time. If you
add one more, the Request popup will fail.

## New Update

Also, if you define a callback, don't forget to `return true`. Otherwise
Webkit will refuse to close the FB popup and you'll have to click twice for it
to really close itself.

## Update (bis repetita)

This one was pretty hard to find but if your filter contains a facebook id of
someone that is not a friend of the currently loggued user, the filter will
display nothing.

In our app, we have a filter of "Neighbors" (as most social games do). But one
of thoses neighbors removed the user from its friends, and we didn't update
the neighbor list to reflect that, resulting in our "Neighbors" filter being
empty.

