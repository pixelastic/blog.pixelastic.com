---
layout: post
title: "Creating a readonly mysql user"
custom_v2_id: 302
---

<p>I wanted to give access to a database to a colleague, so he can connect and extract some useful stats from our database.</p>
<p>As I didn't want to give him nor the root, nor my access nor even an access with writing permission to avoid potential issues, I created a readonly user.</p>
<p>First, connect to the mysql server :</p>
<pre><code lang="sh">mysql --user=root -p</code></pre>
<p>And type your password when asked</p>
<p>Now that you are in the mysql prompt, create the 'readonly' user and give him <code>SELECT </code>permission on all tables</p>
<pre><code lang="sql">CREATE USER 'readonly'@'%' IDENTIFIED BY 'your_password';<br />GRANT SELECT ON *.* TO 'readonly'@'%';</code></pre>
<p>Also note that once connected with root, you can see the list of users by running :</p>
<pre><code lang="sql">SELECT host,user,pass FROM mysql.user;<br /></code></pre>
<p>Nothing fancy here, everything was found after a few minutes of googling.</p>
<p>Also, if you ever need to delete the user :</p>
<pre><code lang="sql">DROP USER 'readonly'@'%';</code></pre>
<p> </p>