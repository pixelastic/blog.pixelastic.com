---
layout: post
title: "Mysql auto backup"
custom_v2_id: 63
tags: mysql, backup
---

I'm in the process of automating the backup of all the mysql databases of my
clients' website. We never know what can happen, so having a backup of all
this data is really really important.

MySQL data contains all the data added by the user, it means that unless you
make regular backup of this data, you can't regenerate it.

I have multiple clients, with several websites each and an equivalent number
of databases. I wanted to store a backup of all those on my local drive, to
prevent any server crash problem.

I wanted a daily backup, and as my working station is on Windows XP I tried to
find a simple software to do just that.

There is a little tool called mysqldump on linux that does just that : saving
an entire database in a single file. Joined with some cron job and rotating
the files it shouldn't be hard to implement.

But finding a software to do that on Windows is just terrible. I've been
searching for them for more that 2 hours now and everything I find is
horrible.

At first I found [AutoBackup for Mysql](http://www.swordsky.com/) but the
software is written in something that even myself can't call English (and I
know that my prose is not exactly Shakespeare). I had to click on some options
to guess what it was supposed to do... I guess after some practice and once
the tasks are scheduled it doesn't matter anymore but the trial version can't
save more that 50 records per table and the price of the full version (~100$)
is by far too expensive.

By continuing my quest, I ended up downloading this same software under
different names.

Then I found [DumpTimer](http://www.richtsoft.com/mod.php?theme=richtsoft&them
e=richtsoft&mod=webpage&op=view&wid=18) and its brownish interface. It is also
a great example of ergonomic errors : window too small forcing to scroll to
reveal the options, nonsense message boxes popping, large amount of typo
errors, limited choice of options.

But it does the job, in a very basic form, but it does it right. I could save
my list of servers, check which databases and tables to save (well, all of
them) and choose where to save them. There also was an option to copy them to
another database, but I didn't tried that.

One of the main caveats was that it could only save the most recent backup,
there was no way to save, say, the last 30 days.