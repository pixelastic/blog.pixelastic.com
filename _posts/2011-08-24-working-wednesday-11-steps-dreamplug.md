---
layout: post
title: "Working on Wednesday #11 : First steps with my Dreamplug"
custom_v2_id: 306
---

<p>A while back, I ordered a Dreamplug. It's a micro computer more or less the size of a hard drive. It uses very little electricity, has ethernet, usb, sata and sd ports as well as bluetooth and wifi connectivity.</p>
<p>I wanted one to primarily work as a git and mercurial server to host my repos, as well as host a few websites I might be working on. As it's not the more powerful of device and will be using my home ADSL connection, it's also a good fit for testing web performance optimisations.</p>
<p>Actually, I have a lot of ideas for this plug (ssh tunnel, dropox-like server, etc).</p>
<h4>First, let's establish a connection</h4>
<p>To do any of that, you first have to log into your device. This first step might have been the one that caused me the much trouble.</p>
<p>I simply wanted to connect to the plug through SSH. I didn't want to plug it to my router because it would then have emit an open wifi network. Instead, I wanted to access it through a simple ethernet cable.</p>
<p>To do that I had to plug the Ethernet cable on the second slot (the one the closer to the lights) on the plug, then turn it on. I didn't manage to connect with the cable in the other plug nor if I plugged it after turning the device on.</p>
<p>What took me a while to figure is that the Dreamplug have its own ip address : <code>10.0.0.1</code>. To enable transfer between your host and the plug, you have to set a fixed ip address to your ethernet (mine was <code>eth0</code>)</p>
<pre><code lang="sh">$ sudo ifconfig eth0 10.0.0.2 </code></pre>
<p>I chose <code>10.0.0.2</code> because it's close to the Dreamplug address and I will remember it better, but you can actually choose anything you want, it absolutely does not matter.</p>
<h4>Connect through ssh</h4>
<p>Once the first step is done, you are now able to connect to the device through SSH.</p>
<pre><code lang="sh">$ ssh root@10.0.0.1</code></pre>
<p>The default password is <code>nosoup4u</code>. I chose to keep it for now, as I'll have to type it a lot, but I'll change it once everything is installed.</p>
<p>First thing you should do is create a new user. Using <code>root</code> for the day to day activities is a bad habit.</p>
<pre><code lang="sh">$ adduser pixelastic </code></pre>
<p>You'll be prompted for password and other misc informations. Once done, we will give sudo power to this user.</p>
<p>On others Ubuntu machines, I usually do a <code>adduser pixelastic admin</code> or <code>adduser pixelastic sudo</code>, but this didn't work here. There wasn't even an <code>admin</code> group, and adding to <code>sudo</code> didn't seem to change anything.</p>
<p>Instead, I had to edit the <code>/etc/sudoers</code> file, using <code>visudo</code>.</p>
<p><em>If you've never used <code>vi</code> before, press <code>i</code> to enter edit mode, and <code>vi</code> will acts as a common editor. Press <code>Esc</code> when you've finished, then <code>:x</code> to save and exit</em></p>
<p>I added a new line just below the one starting with <code>root</code> and copied it, simply by changing the user name.</p>
<pre><code lang="ini">root    ALL=(ALL) ALL<br />pixelastic ALL=(ALL) ALL  </code></pre>
<p>Your new user should now have the sudo powers.</p>
<p>Unfortunatly, on my build one more thing was missing. It might not be the case on your plug, but we'd better check.</p>
<pre><code lang="sh">$ which sudo<br /> /usr/bin/sudo<br />$ ls -l /usr/bin/sudo<br /> -rwxr-xr-x 1 root root 114976 2011-02-14 08:08 /usr/bin/sudo</code></pre>
<p>Check the permissions, if you have this output, then something is wrong. The <code>sudo</code> executable should have the <code>s</code> permissions, otherwise it won't work.</p>
<pre><code lang="sh">$ chmod u+s /usr/bin/sudo</code></pre>
<p>Now, we can logout from the <code>root</code> session, and login back with our new user</p>
<pre><code lang="sh">$ ssh pixelastic@10.0.0.1<br />$ sudo pwd<br /> /home/pixelastic</code></pre>
<h4>What next ?</h4>
<p>Now, one last sensible thing to do is to change the root password for something stronger, and even disable login as <code>root</code> through ssh. To do that, simply edit the <code>/etc/ssh/sshd_config</code> file and set <code>PermitRootLogin</code> to <code>no</code>.</p>
<p>You could also add your keys to the plug to avoid typing your password, install your softs, and link the plug to your router to make it accessible from the outside.</p>
<p>I plan to replace Ubuntu for Debian on my Dreamplug, I'll post about that later.</p>