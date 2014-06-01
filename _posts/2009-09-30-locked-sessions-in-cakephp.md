---
layout: post
title: "Locked sessions in cakePHP"
custom_v2_id: 21
---

I was working on a component heavily using session and was having trouble
debugging it. First I could'nt find where my session files where saved on my
server.

Well, it was because I hadn't set the session.save_path value in my php.ini.

But now that is was done, it seems like I had locked sessions files that I
wasn't able to access (I couldn't even read them using a editor). The problem
was that I was using die() in my component script to help debugging the
process.

And that was BAD. die() stopped the whole process, even if the session file
was opened for writing, locking it until the process died. What was the
correct way to halt my script was using exit;

Hope that helped

