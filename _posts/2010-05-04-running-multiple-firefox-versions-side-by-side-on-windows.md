---
layout: post
title: "Running multiple Firefox versions side by side on Windows"
custom_v2_id: 83
---

<p>Whenever you upgrade your Firefox, the new version will overwrite the previous one. If you want to open multiple Firefox versions side by side, here's my way :</p>
<ul>
<li>First, uninstall all your previous Firefox installation(s). Make sure to backup any important data beforehand (I personnaly use MozBackup to do that).</li>
<li>Then install the latest available stable version. This will be the main Firefox version, the one you'll be using on your dayjob and the one you'll always update.</li>
<li>Now run the Firefox ProfileManager.<br /> To do that, create a shortcut to your <code>firefox.exe</code> file, then edit this shortcut. In the "Target" field, add <code>-Profilemanager</code>.<br />My field looks like : <code>"C:\Program Files\Internet\Firefox\firefox.exe" -Profilemanager</code></li>
<li>You now have to create one new profile for each FF version you plan on testing. Give them meaningful names. I named mine "FF3.0".</li>
<li>Now download the corresponding Firefox version from <a href="http://www.oldversion.com/Mozilla-Firefox.html">oldversion.com</a></li>
<li>Do not install it, but extract its content (using a archiving tool like winrar or 7-zip) in a tmp directory. Remove the <code>optional </code>directory as well as <code>removed-files.log</code> and <code>setup.exe</code>.</li>
<li>Copy the content of <code>localized/</code> into <code>nonlocalized/</code> (overwrite files if asked).</li>
<li>You can now rename the <code>nonlocalized/</code> directory and move it around on your hard drive.<br /> I renamed mine to <code>Firefox 3.0/</code> and put it alongside the main Firefox, in <code>C:\Program Files\Internet\Firefox 3.0\</code></li>
<li>Create a shortcut to the <code>firefox.exe</code> file in this directory and edit the target field. <br />This time, we have to specify which profile to use. Just add <code>-P "FF3.0" -no-remote</code> in the target field.<br />Mine now looks like <code>C:\Program Files\Internet\Firefox 3.0\firefox.exe" -P "FF3.0" -no-remote</code></li>
</ul>
<p>That's it.<br />Now, just run your classic Firefox shortcut to open the most up to date Firefox version, and use the custom shortcuts to open previous versions.</p>
<p>I personnaly also rename the different <code>firefox.exe</code> to <code>firefox30.exe</code>, or <code>firefox35.exe</code> to more easily spot them in the taskmanager.</p>
<p>I also edit each <code>.exe</code> with ResHack to change their taskbar icons. I haven't yet managed to change their title.</p>
<p>Edit : Now I can't open .html files directly from the explorer nor follow links from my IM. I still don't know exactly what of the steps above caused that.</p>