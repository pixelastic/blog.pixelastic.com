---
layout: post
title: "Meetup random user picker"
tags: meetup, serverless
---

Being co-organizer of two meetups ([HumanTalks][1] and [TechLunch][2]) in Paris,
I often give random prizes to the attendees at the end of the sessions. It
can be free tickets to conferences we are partners with, or gifts from some of
our sponsors.

To choose who is going to get the prize, we resort to randomness and we have
a bunch of JavaScript scripts lying around to do that. To make the process
easier and scalable to more meetups, I created an online random attendee picker.

[![Screencast of the tool in
action][3]](https://pixelastic.github.io/meetup-random-user/)

You enter the url of your event in the input field and it will get the page and
pick one of the attendees at random. Because of CORS issues, I could not
directly load and parse the remote meetup.com page from the website. I used
[webtask.io][4] to do that instead.

webtask.io is mix between [Gists][5] and [Heroku][6]. You push a server-side
snippet of js code to their platform (or write it directly in their online
editor), and it automatically hosts it. You then have a url you can use to target
your script, make it run, and get the results. It accepts query string as
inputs.

The whole download, parse, format-as-JSON logic was then moved into this webtask
script and that's this script that I'm requesting on my webpage. You can find
the code [on GitHub.][7]

This kind of architecture is called serverless, and that is the future of the
web. Static hosting through GitHub pages, while still allowing for server-side
scripting when you need it. All of that, for free.


[1]: https://www.meetup.com/fr-FR/HumanTalks-Paris/
[2]: https://www.meetup.com/fr-FR/Tech-Lunch/
[3]: /img/files/2017-03-28/screencast.gif
[4]: https://webtask.io/
[5]: https://gist.github.com/
[6]: https://www.heroku.com/
[7]: https://github.com/pixelastic/meetup-random-user
