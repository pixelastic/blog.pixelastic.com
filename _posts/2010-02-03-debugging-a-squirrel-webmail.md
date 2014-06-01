---
layout: post
title: "Debugging a Squirrel webmail"
custom_v2_id: 36
---

This is a quick blogpost, essentially as a reminder for myself :

A client of mine is using the Squirrel mail webmail. Once in a while, I have a
call from him telling me that he can't access its account. The cause is always
the same : there is way too much mails saved in his account and Squirrel mail
choke on this, refusing to display the page.

The solution is simple, I just have to remove all the mails (except maybe the
100 or so last ones) and save them in a another directory, for archiving. The
directory to save is `/home/mailusers/c/contact/cur`

But, thinking I was clever, instead of copying all the files to a new `cur-
save-2009` directory I thought it would be faster to rename the current
directory to `cur-save-2009` and create a new empty `cur` dir. Except that I
forgot that I was loggued in as `root `and the directory must have a
user/group set as `postfix`...

That's it, I just had to not forgot to set the owner/group of the `cur/`
directory as postfix once cleared.

