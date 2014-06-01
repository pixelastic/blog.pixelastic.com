---
layout: post
title: "Testing IE6 and IE7 using VirtualBox on Windows"
custom_v2_id: 243
---

<p>Testing various IE version as always been a chore. Back in the days, I managed to install both IE7 and use a standalone IE6 version.</p>
<p>Then, I discovered <a title="IETester" href="http://www.my-debugbar.com/wiki/IETester/HomePage" target="_blank">IETester</a> that became a lifesaver (my IE6 standalone tends to crash a little too often). It would allow me to test various IE versions side by side.</p>
<p>Unfortunatly, the emulation wasn't perfect, some ajax calls were returning errors and the Flash support wasn't so good.</p>
<p>Additionnaly, there was not way to use the <a title="IEDebugBar" href="http://www.debugbar.com/?langage=en" target="_blank">IEDebugBar</a> nor the WebPageTest plugin.</p>
<h4>Switching to VM</h4>
<p>I finally decided to switch to a Virtual Machine. This would allow me to have an exact snapshot of a given OS/IE version.</p>
<p><a title="VirtualBox" href="http://www.virtualbox.org/" target="_blank">VirtualBox</a> is free, so this was my choice. Microsft used to provide <a title="Win/IE downloads for VirtualPC" href="http://www.microsoft.com/downloads/en/details.aspx?FamilyId=21EABB90-958F-4B64-B5F1-73D0A413C8EF&amp;displaylang=en" target="_blank">free downloads of various flavors of Windows/IE</a>, but it seems to be only working with their proprietary VirtualPC (which only works under Windows 7).</p>
<p>So I took the long road, and manually installed a Windows XP Pro through VirtualBox, using my Windows XP cd.</p>
<p>I used the same serial than my main windows XP. I'm not exactly sure if legally, I'm allowed to do that. How does a VM fits inside the legal statements ? Am I allowed to use one windows activation key inside itself ? Well, I don't really know and don't care that much.</p>
<h4>Starting with some housekeeping</h4>
<p>I ended up with a nice and clean WinXP install. I had to add an antivirus quick if I wanted to keep it clean. VirtualBox provides a Shared Folder feature to exchange files between the host and the guest.</p>
<p>Start by adding shared folders to your guest (Devices &gt; Shared Folders).</p>
<p>Then install the "Guest Additions", <del>just mount the <code>VBoxGuestAdditions.iso</code> found in your VirtualBox installation directory, using DaemonTools and run the installer.</del></p>
<p>Don't be as silly as I was. Do not install the Guest Additions on your host, but on your guest. Yeah, seems more logical that way. Just select the options in the Devices menu of your guest window. Reboot after the installation.</p>
<p>You should now be able to access your shared folders by opening the windows Explorer (Windows + E), and going to Network places &gt; All network &gt; VirtualBox Shared Folders</p>
<h4>Accessing your websites</h4>
<p>I then updated the <code>C:\WINDOWS\system32\drivers\etc\hosts</code> file to bind all requests made to my still-in-development websites to my host.</p>
<pre><code lang="ini">10.0.2.2        www.pixelastic<br />10.0.2.2        s1.pixelastic<br />10.0.2.2        s2.pixelastic<br />10.0.2.2        s3.pixelastic</code></pre>
<p>You can find your host ip by doing a <code>ipconfig /all</code> in a command prompt.</p>
<p>You then just have to go to http://www.pixelastic/ in IE6 to display the correct website. You can even switch to the Seamless mode to display your IE6 inside your main host.</p>