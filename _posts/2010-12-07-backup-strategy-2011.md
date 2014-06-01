---
layout: post
title: "My new backup strategy for 2011"
custom_v2_id: 248
---

My computer was starting to get slower and slower for the past days. And I
realized my automatic backup wasn't backing anything up for the past month.

And I realized I had different versions of the same files on my 2 laptops...

Well, it seems I have to do some cleaning up.

#### Synchronizing paperwork

I started by cleaning up my [Dropbox ](http://www.dropbox.com/)folder. I
removed shared folders with past clients, and created a "Paperwork" folder
where I put all my invoices, contracts and general paperwork.

I also added my private [KeePass ](http://keepass.info/)file as well as other
info I may need to access anywhere, anytime.

KeePass allow me to store all my login/password credentials in a secure way
(protected by a master password). It is really useful to have this file on all
my computers (and mobile phone).

Dropbox is excellent for storing simple files, that you need everywhere. Being
able to access invoices and contracts even from my mobile phone proved quite
valuable when meeting clients.

#### Hard backup of personal files

I've also changed my scheduled backups of personal files. I bought an [Acronis
True Image](http://www.acronis.com/) last year, and reconfigured it today.

I have a hard drive whose sole purpose is to save backups. I scheduled for the
first of each month to save : my system state, my applications configuration,
and my personal files (photos, saved gamed, writings, etc).

I manually started all this backups to have a clean start. I also forced the
backup to restart a whole new file every 6 month (opposed to using the
incremental backup).

#### Backing up my music and movies

I did not spent too much time figuring how to save my hundred of Go of music
and movies. I rarely watch the same movies twice, so losing them won't affect
me too much.

I occasionally re-watch series, though, but as most of my friends have the
same tastes as I, I could very easily get them back from them, or download
them (again).

Regarding music, well, I have quite a big collection, but most of it is
already "backed up" on my portable mp3 player.

#### Automatic synchronizing with BitBucket

On my day work, I now always version my files using Mercurial.
[BitBucket](http://bitbucket.org/) offers unlimited storage, and unlimited
public repositories. Private repo are limited to 5 users. As I'm mostly alone
on projects that should stay private, this seems the best deal I could found.

Mercurial being a versionning system, I got all the benefits of a backup here,
being able to revert to previous versions, update it whenever I want and
access it from anywhere.

I wrote a custom Hg hook on commit to automatically push my repos to BitBucket
at least once a day (I'll post the code in a future post).

#### MySQL Backup

I used to backup mysql databases on my work computer using a windows app. This
was slowing down my computer on every boot as well and backup was thus only
effective when I was working and not when I was on vacations.

Today, I wanted something a lot more flexible, so I set a cronjob on my main
host coupled with a slightly edited [autoMySQLBackup
](http://sourceforge.net/projects/automysqlbackup/)script.

This will automatically run everyday at midnight and make a local save (with
daily, weekly and monthly rotate) of all my clients databases. Logs are saved
on disk and gzipped, and will also be sent to a special backup@pixelastic.com
mail address (stored on GMail).

This way I am sure to have my mysql backups on two different hosts, with daily
and automatic saves, that I can access from anywhere if anything goes wrong.

#### Conclusion

It took me almost two full days to get the right tools, configure them and
write my custom scripts but now, it is seamlessly integrated with my daily
workflow. This is a weight off my shoulders, I know I can safely work as usual
and my files are saved and easily accessible.

