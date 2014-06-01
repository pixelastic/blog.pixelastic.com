---
layout: post
title: "Ghost posting on FB.ui streams"
custom_v2_id: 288
---

We had a bit of an issue when launching our app a few weeks ago. Everything
was working fine on our test apps, but when live, all the stream messages we
posted (we call them "Sharings") had a random text appended.

Most of the time it was a generic Facebook text, but sometimes it was a
creepier SQL request just displayed plain on the user feed.

The Facebook text was (for the sake of search engine goodness):

> Facebook is a social utility that connects people with friends and others
who work, study and live around them. People use Facebook to keep up with
friends, upload an unlimited number of photos, post links and videos, and
learn more about the people they meet.

As the issue only occurs in production mode and never on any of our test
environments, this was pretty difficult to debug.

Here was the code used to post the Sharing :

    
    FB.ui({  
    	[...],  
    	'title' : 'Title of the Sharing',  
    	'caption' : 'Text of the Sharing'  
    });

As I later found out, the `caption `key is not supposed to hold the Sharing
text. The `description `key should be used for that. I'm not exactly sure was
`caption `was for, but it seems that if you let the `description `key empty,
then Facebook fills it automatically with a placeholder text.

The solution simply was to put the text in the `description `text, and leaving
the `caption `key empty :

    
    FB.ui({  
    	'title' : 'Title of the Sharing',  
    	'caption' : '',  
    	'description' : 'Text of the Sharing'  
    });

As this behaviour is counter-intuitive, undocumented and random, I think
posting it here could help other lost souls like me.

