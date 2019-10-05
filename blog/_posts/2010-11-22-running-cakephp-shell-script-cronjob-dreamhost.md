---
layout: post
title: "Running a cakePHP shell script as cronjob on Dreamhost"
custom_v2_id: 242
tags: cakephp, dreamhost, shell, cronjob
---

Dreamhost as [a wonderful wiki](http://wiki.dreamhost.com/Crontab) on how to
set cron jobs and cakePHP has [a cookbook page on how to do
it](http://book.cakephp.org/view/846/Running-Shells-as-cronjobs) too, but
getting it just right was a little frustrating.

I finally managed to run my shell task as a cronjob, and here is how I did it.

## The magic command

First, here is the command I wrote in my Dreamhost panel :


```sh
/home/username/domain.com/cake/console/cake -app /home/username/domain.com/app/ shell_name
```

You have to set the full path to the cake console because it obviously is not
in the pre-saved paths on a default Dreamhost install.

You also have to specify the `app` directory otherwise cake will search your
shell in the wrong directories. This is even more important if your shell is
located in a plugin directory.

But, this won't work as-is, you'll have to do several other stuff, mostly
explained by [Miles Johnson](http://www.milesj.me/blog/read/83/Setting-Up-
Cron-Jobs-With-Cake-Shells), but I'll recap them

## Setting the file as executable

You have to set the `cake/console/cake` file as executable. It is kind of
obvious, but you have to do it anyway.

## Set the TERM variable

Update you `cake/console/cake` to replace the first lines with :


```sh
LIB=${0/%cake/}
APP='pwd'
TERM=linux
export TERM
```

If you don't, you'll have notice errors in the resulting log. No big deal, but
it is cleaner that way.

## Forcing using php5

While in command line, the php command refer to the php4 version. If you need
to use php5 (and I guess you should), you would have to manually reference the
binary file. Hence, you have to update your `cake/console/cake` file one more
time and change the `exec `line to :


```sh
exec /usr/local/php5/bin/php -q ${LIB}cake.php -working "${APP}" "$@"
```

## And it's ok

Your cronjob should not work effortlessly. It took me some long hours to track
all this down (along with other issues on my local dev machine that make
debugging even more cloudy).
