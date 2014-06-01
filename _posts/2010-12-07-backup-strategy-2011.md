---
layout: post
title: "My new backup strategy for 2011"
custom_v2_id: 248
---

<p>My computer was starting to get slower and slower for the past days. And I realized my automatic backup wasn't backing anything up for the past month.</p>
<p>And I realized I had different versions of the same files on my 2 laptops...</p>
<p>Well, it seems I have to do some cleaning up.</p>
<h4>Synchronizing paperwork</h4>
<p>I started by cleaning up my <a title="Dropbox" href="http://www.dropbox.com/" target="_blank">Dropbox </a>folder. I removed shared folders with past clients, and created a "Paperwork" folder where I put all my invoices, contracts and general paperwork.</p>
<p>I also added my private <a title="KeePass" href="http://keepass.info/" target="_blank">KeePass </a>file as well as other info I may need to access anywhere, anytime.</p>
<p>KeePass allow me to store all my login/password credentials in a secure way (protected by a master password). It is really useful to have this file on all my computers (and mobile phone).</p>
<p>Dropbox is excellent for storing simple files, that you need everywhere. Being able to access invoices and contracts even from my mobile phone proved quite valuable when meeting clients.</p>
<h4>Hard backup of personal files</h4>
<p>I've also changed my scheduled backups of personal files. I bought an <a title="Acronis" href="http://www.acronis.com/" target="_blank">Acronis True Image</a> last year, and reconfigured it today.</p>
<p>I have a hard drive whose sole purpose is to save backups. I scheduled for the first of each month to save : my system state, my applications configuration, and my personal files (photos, saved gamed, writings, etc).</p>
<p>I manually started all this backups to have a clean start. I also forced the backup to restart a whole new file every 6 month (opposed to using the incremental backup).</p>
<h4>Backing up my music and movies</h4>
<p>I did not spent too much time figuring how to save my hundred of Go of music and movies. I rarely watch the same movies twice, so losing them won't affect me too much.</p>
<p>I occasionally re-watch series, though, but as most of my friends have the same tastes as I, I could very easily get them back from them, or download them (again).</p>
<p>Regarding music, well, I have quite a big collection, but most of it is already "backed up" on my portable mp3 player.</p>
<h4>Automatic synchronizing with BitBucket</h4>
<p>On my day work, I now always version my files using Mercurial. <a title="BitBucket" href="http://bitbucket.org/" target="_blank">BitBucket</a> offers unlimited storage, and unlimited public repositories. Private repo are limited to 5 users. As I'm mostly alone on projects that should stay private, this seems the best deal I could found.</p>
<p>Mercurial being a versionning system, I got all the benefits of a backup here, being able to revert to previous versions, update it whenever I want and access it from anywhere.</p>
<p>I wrote a custom Hg hook on commit to automatically push my repos to BitBucket at least once a day (I'll post the code in a future post).</p>
<h4>MySQL Backup</h4>
<p>I used to backup mysql databases on my work computer using a windows app. This was slowing down my computer on every boot as well and backup was thus only effective when I was working and not when I was on vacations.</p>
<p>Today, I wanted something a lot more flexible, so I set a cronjob on my main host coupled with a slightly edited <a title="AutoMySQLBackup" href="http://sourceforge.net/projects/automysqlbackup/" target="_blank">autoMySQLBackup </a>script.</p>
<p>This will automatically run everyday at midnight and make a local save (with daily, weekly and monthly rotate) of all my clients databases. Logs are saved on disk and gzipped, and will also be sent to a special backup@pixelastic.com mail address (stored on GMail).</p>
<p>This way I am sure to have my mysql backups on two different hosts, with daily and automatic saves, that I can access from anywhere if anything goes wrong.</p>
<h4>Conclusion</h4>
<p>It took me almost two full days to get the right tools, configure them and write my custom scripts but now, it is seamlessly integrated with my daily workflow. This is a weight off my shoulders, I know I can safely work as usual and my files are saved and easily accessible.</p>