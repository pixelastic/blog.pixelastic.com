---
layout: post
title: "Incorrect MySQL date"
custom_v2_id: 296
---

Several ingame time calculation we made in game are based on Paris time. Some
weeks ago, we decided to make a pass on all our servers to always use Paris
Time (GMT +1).

Today, I spotted that logs we save in the DB have some date inaccuracy. It
appears that our mysql server and instances weren't always updated to the
correct date. Some hours later, here is what I learned :

#### Finding and updating MySQL date

You can tell what timezone mysql should use when you start the service. If you
don't specify anything, it will use the system time. Once loaded, you can get
its time by running `SELECT NOW()`.

This is the easiest way to spot errors.

To know the defined timezone, run `SELECT @@global.time_zone`. If not defined,
you'll read `SYSTEM`, which is not very helpful.

Note here that even if you changed the system date AFTER you started mysql,
mysql will still use the date that was in effect when you first launched it.

It means that changing your server time will not affet running mysql
processes. You'll have to restart mysql to do that : `sudo /etc/init.d/mysql
restart`

#### Finding and updating the server date

Even after restarting mysql on some servers, the mysql date was still
incorrect. After connecting the the sql server, I found that it was the server
time that was incorrectly set (I just type `date`).

To update the current time zone, I had to call `sudo dpkg-reconfigure tzdata`
(I'm using ubuntu) and choose the correct city

#### Updating mysql running through ndb_mgm

I'm no server expert, so this part was a little trickier. Some of our
databases are using ndb cluster for replication. Reloading those
configurations was harder.

First, I had to connect to the server running the ndb management and call
`ndb_mgm`. In the later prompt, I typed show and this get me the list of all
servers currently managed.

I then shut them down typing `shutdown`.

The, I reloaded the management and the node running on this server by doing
`sudo /etc/init.d/mysql-ndb-mgm restart` and `sudo /etc/init.d/mysql-ndb
restart`

Finally, I had to connect to all the servers I saw earlier (with the show
command) and run `sudo /etc/init.d/mysql-ndb restart `on each of them

