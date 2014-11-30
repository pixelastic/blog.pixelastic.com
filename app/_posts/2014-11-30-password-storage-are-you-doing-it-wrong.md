---
layout: post
title: "Password storage, are you doing it wrong ?"
tags: password, md5, sha1, bcrypt, security
---

Here are a few simple questions to ask yourself to know if you're storing
password incorrectly.

### Are you storing them as plaintext ?

Really ? Well, that's bad. Very bad. Whenever a website sends me my password in
cleartext in an email I delete my account. I know I can't trust their security.
Whatever the size of your company, you'll eventually get a leak of your
database, so don't make it easily readable.

### Are you hashing password with md5 or sha1 ?

That's a bit better, but is as much useless. md5 and sha1 hash passwords to
a limited (albeit very large) set of values. While you can't "un-md5" or
"un-sha1" something, you can still create a list of all possible hashes (known
as a rainbow table). Rainbow tables for md5 and sha1 can be downloaded and
stored on a few hundred gigabytes nowadays. Then an attacker just have to search
for a hash in the table to get one of the possible original passwords.

### Are you hashing with md5 or sha1, but with a app-wide salt ?

Salting is a very good idea. Instead of hashing the password, you hash the
password and a random string (known as the salt). That way, rainbow table found
online became useless because they do not know your salt. But chances are
that if an attacker got your database, they also got the source code of your
app, including the salt. It's just a matter of time for them to build the
specific rainbow table matching your salt.

### Are your hashing with md5 or sha1, but with a specific salt per user ?

Now we're talking. That is a very effective way to slow down attackers. Even if
they get their hands on your database, and the salt associated with each user,
they will have to create as many custom rainbow tables as you have users in
your database. This moves the attacks from massive brute force to specific
users and so diminishes the threat. The only drawback is that, thanks to
Moore's Law, computer are getting faster and faster and in a few years times
generating hundred or thousands of custom rainbow tables will be inexpensive.

### Are your hashing with bcrypt ?

To get the more future-proof implementation, you should use bcrypt. Bcrypt acts
as a md5 or sha1 with specific salt per user, except that it's designed to be
super slow. And that's a good thing. If an attacker needs to build a rainbow
table, it will take him forever. And the best thing is, you can even adjust the
level of time the method should take, and increase it in a few years when
computers will be faster. The resulting bcrypt hash will contain the salt, and
the level of complexity used to generate it.

### Conclusion

You now have a good overview of what to do and not do when storing password.
Remember that the main goal is to make life as hard as possible for a potential
attacker to read one of your users password. And the best solution not only
work today, but will still work tomorrow.


