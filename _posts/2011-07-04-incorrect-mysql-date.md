---
layout: post
title: "Incorrect MySQL date"
custom_v2_id: 296
---

<p>Several ingame time calculation we made in game are based on Paris time. Some weeks ago, we decided to make a pass on all our servers to always use Paris Time (GMT +1).</p>
<p>Today, I spotted that logs we save in the DB have some date inaccuracy. It appears that our mysql server and instances weren't always updated to the correct date. Some hours later, here is what I learned :</p>
<h4>Finding and updating MySQL date</h4>
<p>You can tell what timezone mysql should use when you start the service. If you don't specify anything, it will use the system time. Once loaded, you can get its time by running <code>SELECT NOW()</code>.</p>
<p>This is the easiest way to spot errors.</p>
<p>To know the defined timezone, run <code>SELECT @@global.time_zone</code>. If not defined, you'll read <code>SYSTEM</code>, which is not very helpful.</p>
<p>Note here that even if you changed the system date AFTER you started mysql, mysql will still use the date that was in effect when you first launched it.</p>
<p>It means that changing your server time will not affet running mysql processes. You'll have to restart mysql to do that : <code>sudo /etc/init.d/mysql restart</code></p>
<h4>Finding and updating the server date</h4>
<p>Even after restarting mysql on some servers, the mysql date was still incorrect. After connecting the the sql server, I found that it was the server time that was incorrectly set (I just type <code>date</code>).</p>
<p>To update the current time zone, I had to call <code>sudo dpkg-reconfigure tzdata</code> (I'm using ubuntu) and choose the correct city</p>
<h4>Updating mysql running through ndb_mgm</h4>
<p>I'm no server expert, so this part was a little trickier. Some of our databases are using ndb cluster for replication. Reloading those configurations was harder.</p>
<p>First, I had to connect to the server running the ndb management and call <code>ndb_mgm</code>. In the later prompt, I typed show and this get me the list of all servers currently managed.</p>
<p>I then shut them down typing <code>shutdown</code>.</p>
<p>The, I reloaded the management and the node running on this server by doing <code>sudo /etc/init.d/mysql-ndb-mgm restart</code> and <code>sudo /etc/init.d/mysql-ndb restart</code></p>
<p>Finally, I had to connect to all the servers I saw earlier (with the show command) and run <code>sudo /etc/init.d/mysql-ndb restart </code>on each of them</p>