---
layout: post
title: "Viddler utf8 encoding issue with video description"
custom_v2_id: 61
---

It seems that Viddler changed something on their video API in the middle of
January, and it broke `utf8 `support.

All the videos I've uploaded to their service from October 2009 until January
10th 2010 are working correctly.

But for every video uploaded after that (in fact, from January 24th as far as
I can tell), the description text gets corrupted. All the special characters
(like é or €) gets replaced by their un-encoded counterparts (like Ã©).

It happens either when using their API from a distant server or using their
homemade simple uploader.

Even "worse", when retrieving the video details from their API the description
field gets "htmlspecialchared" and I end up dealing with &Atilde;&copy;

Anyway, I send them an email about that. I've had to contact Viddler support
in the past and they are quite responsive, so I'm sure they will correct this
in no time, seing how trivial it is (in fact, the title field is not affected
by this bug).

Update 29th March : Viddler support filed a ticket for the issue.

