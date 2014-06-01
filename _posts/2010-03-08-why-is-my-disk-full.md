---
layout: post
title: "Why is my disk full ?"
custom_v2_id: 53
---

Ok, so remember when I was writing about that client of mine who had trouble
with its SquirelMail implementation. I thought it was a problem of SquirelMail
having trouble dealing with large directories.

It was not exactly that, it more was a question of the IMAP server having
issues with disk space. I made some backups of the mails, cleaned it up a
little then everything went fine.

But suddenly today, the same SquirrelMail started acting funny, blocking some
login attempt telling me that the IMAP server stopped responding, or
displaying message list without subject nor owner.

Tired all of this, I decided (my client) to move its whole mail system to
GMail, using the Google system, while keeping my clients domain name. To
finish the registration process at Gmail, I had to put a
googlehostedservice.html file online on the domain to prove that I am the
owner and...

    
    452 Transfer aborted.Â  No space left on device

Here is what the FTP server answered. What ? No more space ? But, but, but,
but I just cleaned it all, deleting a whole 1Go log file. Wtf ?

I connect to the server and got the list of the biggest files and directories
by doing a :

    
    find  /var -type f -ls | sort -k 7 -r -n | head -10

I found that the maillog was 1.1Go... I deleted it and hurry the Gmail
activation process. Problem solved.

