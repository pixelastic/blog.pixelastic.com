---
layout: post
title: "Doing persistent login the right way"
custom_v2_id: 174
---

<p>When I was a young web developer, I had to code an admin panel, with username and login. I also added the well-known "Remember me" checkbox.</p>
<p>I wasn't really educated to the security concerns of developing such a feature. In fact, I was even storing the passwords as plain text in the database.</p>
<p>And to allow the user to auto-login, I stored the user and password, in plain text, in a cookie and requested a login with those credentials whenever its session expired.</p>
<h4>That's insane !</h4>
<p>Yes it was, but I remember thinking "Well, nobody can even have access to the database so there's no risk" and "I can store the password in the cookie, it is only accessible by the user, and he surely already know its password. There's no harm in that"</p>
<p>Well, XSS and CSRF weren't so common back in those days.</p>
<p>Since then I've learned a lot. There's just no way I'll ever store a plain text or uncrypted password in a database again. Hashing and salting is the way to go.</p>
<p>But I kept implementing the persistent login feature following the same pattern : saving the username and hashed password in the cookie.</p>
<p>I was thinking "The password is not stored as plain text but as a hash, there's no way an attacker would even be able to guess the password from that".</p>
<h4>That's better, but still...</h4>
<p>I haven't thought that the cookie was like an open sesame to my app. One would just have to steal the file and place it in its browser cookie list and he would have exactly the same access to the website, without having to know my password.</p>
<p>In the meantime I was also implementing OpenId authentication and as it is passwordless (at least from the website point of view), I couldn't save the username and password in the cookie.</p>
<p>Clearly, something was broken in my persistent login implementation.</p>
<h4>Here come the tokens</h4>
<p>After some research, I finally get it the right way.</p>
<p>Whenever a user authenticate, be it from a classical user/pass login form or using OpenId, I keep it loggued using session vars. When the session var expires, the user is loggued out. If he had checked the "Remember me" checkbox, I would try to re-authenticate him automatically.</p>
<p>In order to do that, I had to change my implementation. The first thing to do was creating a <code>UserToken </code>table with 3 fields : <code>user_id</code>, <code>token</code><code> </code>and <code>duration</code>.</p>
<p>Then, when the user authenticate I generate a random token and save it along the <code>user_id</code> in a cookie.</p>
<p>I'll also populate the <code>UserToken </code>table with the <code>user_id</code>, a hashed version of the token,  and matching the <code>duration </code>to the expires date of the cookie.</p>
<p>That way, the next time that the user comes to my website without a session I check its cookie. If he has a <code>user_id</code> and a token, I'll try to authenticate him.</p>
<p>I'll find a matching <code>user_id</code> and hashed token. If there are no results, then the cookie is not valid. Either it has been already used or it is a cookie forgery attempt. In that case, I'll do nothing.</p>
<p>If there's a match, I still check that the token is not expired. If it is, I'll delete it in the database, as well as clearing the cookie. On the other hand, if the cookie is still valid, I log the user in.</p>
<p>Once the user is loggued in I generate a new token, update the cookie and update the table with a hashed version of it.</p>
<p>That way each token can only be used once and are generated only when the user correctly authenticate and are only used once the session expires.</p>
<h4>But one can still steal cookies</h4>
<p>Yes, a malicious user can still steal my cookie, copy it to its computer and use the token to login. That's true and as we can't do anything against that, we could still try to mitigate it.</p>
<p>First precaution would be to disable any sensitive information edition while loggued in using the cookie. Like bank account, personnal information, password changing, etc.</p>
<p>The second thing would be to check for any hacking attempt. Whenever I guess for a forgery attempt (trying to login with a bad set of id / hashed token), I delete all UserToken associated for this user. This will block any bruteforce attack because even there won't be any more match in the database.</p>
<p>It is also wise to display a warning message to the user telling him that his account may have been compromised and that he should be wary and maybe change its password.</p>