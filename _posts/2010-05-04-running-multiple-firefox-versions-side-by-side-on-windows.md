---
layout: post
title: "Running multiple Firefox versions side by side on Windows"
custom_v2_id: 83
---

Whenever you upgrade your Firefox, the new version will overwrite the previous
one. If you want to open multiple Firefox versions side by side, here's my way
:

  * First, uninstall all your previous Firefox installation(s). Make sure to backup any important data beforehand (I personnaly use MozBackup to do that).
  * Then install the latest available stable version. This will be the main Firefox version, the one you'll be using on your dayjob and the one you'll always update.
  * Now run the Firefox ProfileManager.  
To do that, create a shortcut to your `firefox.exe` file, then edit this
shortcut. In the "Target" field, add `-Profilemanager`.

My field looks like : `"C:\Program Files\Internet\Firefox\firefox.exe"
-Profilemanager`

  * You now have to create one new profile for each FF version you plan on testing. Give them meaningful names. I named mine "FF3.0".
  * Now download the corresponding Firefox version from [oldversion.com](http://www.oldversion.com/Mozilla-Firefox.html)
  * Do not install it, but extract its content (using a archiving tool like winrar or 7-zip) in a tmp directory. Remove the `optional `directory as well as `removed-files.log` and `setup.exe`.
  * Copy the content of `localized/` into `nonlocalized/` (overwrite files if asked).
  * You can now rename the `nonlocalized/` directory and move it around on your hard drive.  
I renamed mine to `Firefox 3.0/` and put it alongside the main Firefox, in
`C:\Program Files\Internet\Firefox 3.0\`

  * Create a shortcut to the `firefox.exe` file in this directory and edit the target field.   
This time, we have to specify which profile to use. Just add `-P "FF3.0" -no-
remote` in the target field.

Mine now looks like `C:\Program Files\Internet\Firefox 3.0\firefox.exe" -P
"FF3.0" -no-remote`

That's it.

Now, just run your classic Firefox shortcut to open the most up to date
Firefox version, and use the custom shortcuts to open previous versions.

I personnaly also rename the different `firefox.exe` to `firefox30.exe`, or
`firefox35.exe` to more easily spot them in the taskmanager.

I also edit each `.exe` with ResHack to change their taskbar icons. I haven't
yet managed to change their title.

Edit : Now I can't open .html files directly from the explorer nor follow
links from my IM. I still don't know exactly what of the steps above caused
that.

