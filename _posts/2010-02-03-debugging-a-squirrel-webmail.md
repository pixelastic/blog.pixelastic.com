---
layout: post
title: "Debugging a Squirrel webmail"
custom_v2_id: 36
---

<p>This is a quick blogpost, essentially as a reminder for myself :</p>
<p>A client of mine is using the Squirrel mail webmail. Once in a while, I have a call from him telling me that he can't access its account. The cause is always the same : there is way too much mails saved in his account and Squirrel mail choke on this, refusing to display the page.</p>
<p>The solution is simple, I just have to remove all the mails (except maybe the 100 or so last ones) and save them in a another directory, for archiving. The directory to save is <code>/home/mailusers/c/contact/cur</code></p>
<p>But, thinking I was clever, instead of copying all the files to a new <code>cur-save-2009</code> directory I thought it would be faster to rename the current directory to <code>cur-save-2009</code> and create a new empty <code>cur</code> dir. Except that I forgot that I was loggued in as <code>root </code>and the directory must have a user/group set as <code>postfix</code>...</p>
<p>That's it, I just had to not forgot to set the owner/group of the <code>cur/</code> directory as postfix once cleared.</p>