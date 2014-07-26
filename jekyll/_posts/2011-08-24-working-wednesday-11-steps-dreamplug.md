---
layout: post
title: "Working on Wednesday #11 : First steps with my Dreamplug"
custom_v2_id: 306
tags: ubuntu, wednesday, dreamplug
---

A while back, I ordered a Dreamplug. It's a micro computer more or less the
size of a hard drive. It uses very little electricity, has ethernet, usb, sata
and sd ports as well as bluetooth and wifi connectivity.

I wanted one to primarily work as a git and mercurial server to host my repos,
as well as host a few websites I might be working on. As it's not the more
powerful of device and will be using my home ADSL connection, it's also a good
fit for testing web performance optimisations.

Actually, I have a lot of ideas for this plug (ssh tunnel, dropox-like server,
etc).

## First, let's establish a connection

To do any of that, you first have to log into your device. This first step
might have been the one that caused me the much trouble.

I simply wanted to connect to the plug through SSH. I didn't want to plug it
to my router because it would then have emit an open wifi network. Instead, I
wanted to access it through a simple ethernet cable.

To do that I had to plug the Ethernet cable on the second slot (the one the
closer to the lights) on the plug, then turn it on. I didn't manage to connect
with the cable in the other plug nor if I plugged it after turning the device
on.

What took me a while to figure is that the Dreamplug have its own ip address :
`10.0.0.1`. To enable transfer between your host and the plug, you have to set
a fixed ip address to your ethernet (mine was `eth0`)

```sh
$ sudo ifconfig eth0 10.0.0.2
```

I chose `10.0.0.2` because it's close to the Dreamplug address and I will
remember it better, but you can actually choose anything you want, it
absolutely does not matter.

## Connect through ssh

Once the first step is done, you are now able to connect to the device through
SSH.

```sh
$ ssh root@10.0.0.1
```

The default password is `nosoup4u`. I chose to keep it for now, as I'll have
to type it a lot, but I'll change it once everything is installed.

First thing you should do is create a new user. Using `root` for the day to
day activities is a bad habit.

```sh
$ adduser pixelastic
```

You'll be prompted for password and other misc informations. Once done, we
will give sudo power to this user.

On others Ubuntu machines, I usually do a `adduser pixelastic admin` or
`adduser pixelastic sudo`, but this didn't work here. There wasn't even an
`admin` group, and adding to `sudo` didn't seem to change anything.

Instead, I had to edit the `/etc/sudoers` file, using `visudo`.

_If you've never used `vi` before, press `i` to enter edit mode, and `vi` will
acts as a common editor. Press `Esc` when you've finished, then `:x` to save
and exit_

I added a new line just below the one starting with `root` and copied it,
simply by changing the user name.

```sh
root    ALL=(ALL) ALL
pixelastic ALL=(ALL) ALL
```

Your new user should now have the sudo powers.

Unfortunatly, on my build one more thing was missing. It might not be the case
on your plug, but we'd better check.

```sh
$ which sudo
 /usr/bin/sudo
$ ls -l /usr/bin/sudo
 -rwxr-xr-x 1 root root 114976 2011-02-14 08:08 /usr/bin/sudo
```

Check the permissions, if you have this output, then something is wrong. The
`sudo` executable should have the `s` permissions, otherwise it won't work.

```sh
$ chmod u+s /usr/bin/sudo
```

Now, we can logout from the `root` session, and login back with our new user

```sh
$ ssh pixelastic@10.0.0.1
$ sudo pwd
 /home/pixelastic
```

## What next ?

Now, one last sensible thing to do is to change the root password for
something stronger, and even disable login as `root` through ssh. To do that,
simply edit the `/etc/ssh/sshd_config` file and set `PermitRootLogin` to `no`.

You could also add your keys to the plug to avoid typing your password,
install your softs, and link the plug to your router to make it accessible
from the outside.

I plan to replace Ubuntu for Debian on my Dreamplug, I'll post about that
later.
