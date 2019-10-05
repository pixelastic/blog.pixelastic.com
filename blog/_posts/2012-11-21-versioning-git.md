---
layout: post
title: "From no versioning to git"
custom_v2_id: 343
tags: git, mercurial, subversion
---

When I started working as a professional web developer, I wasn't using any
versioning system. When I needed to add a new feature to an existing website,
I just coded it and then uploaded it by FTP.

Sometimes, it turns out that the feature was a failure, and that I needed to
get back to a previous version. Most of the time, I remembered the old feature
and could just type the old code back. Other times, I couldn't and getting the
website back to its previous state was a nightmare.

So whenever I felt a feature could go wrong, I started creating manual backup
of files before editing them, prefixing them with `-version2` and such. It
worked ok at first, but after some time, it was impossible, even for me to
tell the different versions appart.

I also started to realize a trend on the web, reading from other developers,
that there was something call a version-control system. I thought I needed to
use one of them, to keep track of different version of files.

I wasn't exactly sure which one was right for me, so I asked a few friends.
Most of them told me they were using Subversion at work, but that it had a few
shortcomings, but that it was still better than nothing. Another friend told
me that he was using Mercurial, both for personal projects and at work, at
that his whole team was actually versioning everything with it and were very
happy about it.

## First steps with mercurial

So I thought I should start using Mercurial. If I have to learn a new tool,
I'd rather take one that works well and where I have a friend able to help me
on my first steps.

Back in these days, I was still using Windows so I downloaded and installed
Mercurial and its GUI version, TortoiseHG. I was quite happy with it the
instant I installed it. I could just "commit" (which was a new word for me) my
changes and know for sure that they were safe and that I could get back to
previous versions of my file easily.

I was committing all my changes at the end of each day, writing a long commit
message listing everything I had done in that given day. Then, the next
morning I could just re-read the previous commit message and remember what I
was doing. The commit message worked a bit like a todo list for what needed to
be done.

I was mostly using Mercurial as a backup system. I even opened an account on
BitBucket where I uploaded my changes every day, in the case my laptop
crashed, I still had backups of everything online.

## A little note about FTP

Using Mercurial had another benefical side-effect on my productivity. It made
me discover how backward FTP upload was. Before using Mercurial, when I needed
to add changes to a website, I connected to the server with FTP and transfered
every changed files from my local machine to the server.

Of course, I had to remember which files I changed, and upload them one by
one. This was tedious. I had to move from directory to directory before
copying the files. I can't tell you how many times I had a bug in production
that I couldn't replicate on my local machine, just because I either forgot to
upload a file or uploaded it in the wrong place.

Sometimes just to be sure to upload all the files on their correct places, I
simply uploaded the full website directory and let the FTP software choose if
they needed to be updated or not. But this took ages as the software had to
send a request to compare timestamp modification date for each file.

And if I only had two files changed, I had to wait for the FTP to scan each
file between the first and the second one before it gets uploaded. This too
resulted in bug reports from customer that I couldn't replicate, even on
production because by the time I get to check the website, the missing file
that was causing the error had been uploaded and everything worked perfectly
for me. In the end, it created a list of "ghost bugs" that I was never sure if
they were real bugs or created by the FTP upload lag.

Mercurial get rid of all this crap because it was clever enough to know which
files were changed from the last deployment, and even which part of the files
where changed, sending only the difference. This resulted in much faster
upload time and no more errors in missing files. Also, I got bonus security
points for transferring through ssl and not clear text FTP.

Sorry for this little FTP disgression. Anyway, as you remember I was using
Mercurial as a backup system more than a version-control system. Commiting
once a day became cumbersome as I wanted more fine-tuning on what I commited.
I ended up commiting twice a day, or even every time I took a break, but then
I realized it made much more sense to commit based on feature and not on time.

## No more Mercurial

And that's when Mercurial started to get in the way. I often worked on a
feature and while doing that, spotted tiny bugs or typos that I fixed while
working on the big feature. I wanted to commit only related changes together,
and didn't manage to do that well with Mercurial.

I guess this is because I did not really understand how Mercurial worked back
in these days, but to be honest I do not understand it better now. Whenever a
file is modified in Mercurial, it is ready to be added to the next commit. But
when you create a new file or delete one, you have to tell Mercurial that you
want this add/delete to be registered in the next commit.

As I said, I sometime just fixed small bugs or typos in files that had not
much to do with the feature I was working on at that moment. I would have like
to be able to commit only these files, and not the others. I never really
managed to make it correctly with Mercurial so in the end I was still
commiting more files that I wanted to.

That's when I considered trying git instead of Mercurial. I made some googling
on "git vs Mercurial" to see how they differ and the general consensus seems
to be that git is more low level than Mercurial. Git has a plethora of
commands, most of them you'll never use, while Mercurial is focused on a
workflow for the end user that works well. Also, git allow the user to rewrite
its history.

After reading all this I was convinced Mercurial was the right tool for me. I
was still struggling with my current version system, I didn't want to try one
that was even more hard to understand. Plus, rewriting history ? I don't want
that to happen in real life, I sure don't want that to happen with my files
either.

So I digged deeper in Mercurial, trying to understand it better, to grok it
but no, really, I still could'nt make it behave the way I'd like to work with
my files so I finally decided to give git a try.

## First steps with git

Because there was this thing named github, and all the cool kids where on
github, and I too wanted to participate in those big open source projects and
I felt like I was held back by the tool I was using.

On my first hours of using git I managed to do what I had struggled to do with
Mercurial for so long. I could easily choose which files to commit or not and
split my work in several commits. Of course, I could never have done it
without google. Git man pages are gibberish and the command line commands and
options list is so vast I felt lost. Even when I found what I needed I
wondered why the git developers choosed to give them such abstract names
without any apparent cohesion in the complete git API.

I had to create [aliases](https://github.com/pixelastic/oroshi/blob/master/con
fig/git/gitconfig) to do my day to day tasks with git so as not to remember
and type all these [crazy
commands](https://github.com/pixelastic/oroshi/blob/master/config/zsh/aliases-
git.zsh), but in the end it turns out ok. I keep running into problems, but
none that the help of google, StackOverflow and the incredibly rich git API
can't solve.

I'm now versioning any new project with git and even converted some old
projects from Mercurial to git. I know I'm still in the early stages of
learning git (I've only started using branches extensively since a few weeks)
but I do really enjoy it a lot.

## What's next ?

I've done all my git training by myself, while in New Zealand for a year, away
from work and just for fun. I know that when I'll get back to Paris and start
looking for a new job I'd like to find a place where the day-to-day workflow
involves git because I really want to see the way branching and merging helps
people work together building bigger things.