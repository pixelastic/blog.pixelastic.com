---
layout: post
title: "Installing Ubuntu in VirtualBox to work as a development server"
custom_v2_id: 269
tags: virtualbox, lighttpd, cakephp, ubuntu, server, php5, memcached, php
---

I was tired of trying to install Lighttpd on Windows (hint : don't try, it's a
mess. I found no way to get vhosts and php as cgi at the same time). So I
finally decided that Linux was the way to go.

I have always developped using Windows, and even if I'm slowly migrating to
Ubuntu at home, I'm still using Windows 7 at work. The solution that best fits
me was still using my Windows environment for coding, but using Ubuntu inside
a VM to act as a server.

Let's see how I did that :

## Required components

First, let's clarify what I'll have to install for this project : Lighttpd as
the webserver, mysql and memcached for storing data and php5 to run cakePHP.

## Step One : Running Ubuntu inside a VM

Start by downloading the [Ubuntu iso](http://www.ubuntu.com/business/get-
ubuntu/download) (i's 687Mo, you'd better start this download first). I
personnaly used the 10.04 Desktop version (I tried the 10.10 Server version
first but I feel more confident with a UI).

Then, download [the latest VirtualBox version
](http://www.virtualbox.org/wiki/Downloads)(4.0.4 at the time of this
writing).

And mount the iso in VirtualBox and start the install. This is pretty easy and
you should be done in 10mn. Once the install is finished, you'll be prompted
to reboot. Do not reboot just now. Instead, shutdown your guest machine (you
can type `sudo halt` if the GUI does not work).

Once back in Windows, go to your VM config and unmount the install iso,
otherwise the install procedure will be started again everytime you load your
VM.

Once it's done, you can reboot the gues and once loaded, select the in
VirtualBox Menu => Devices => Install guest additions. The next popup can take
some long minutes to show, so be patient. This will install the guest
additions that will allow you to easily communicate between the guest and host
machines.

Once installed, reboot once more, and you should have the guest addition image
sitting on your desktop.

Start a terminal and install the guest additions by doing :


```sh
cd /media/{name of your VBOX image}
./autorun.sh
```

This will finish the guest addition installation. Reboot your guest machine
one last time and you'll be ready for step 2.

## Step 2 : Installing the server stuff

We will now install the various components we'll need. You could probably
install them all with one command but I'll split them in different line so
you'll correctly see what's installed.

First, lighttpd :


```sh
sudo apt-get install lighttpd
```

Now, memcached


```sh
sudo apt-get install memcached
```

And mysql server. This one will prompt you to enter the root password you'll
want.


```sh
sudo apt-get install mysql-server
```

Now we will install php5 as CGI (Lighty will run php as cgi), as well as the
needed dependency so php can connect to both mysql and memcache.


```sh
sudo apt-get install php5-cgi php5-memcache php5-mysql
```

Ok, you should now have everything correctly installed. We will configure all
that stuff later. You should now completely close your Virtual Machine and get
back to Windows. It's time to configure your host and guest so they can
correctly communicate

## Step 3 : Enabling communication between host and guest

What we will do in this section is configure your network so the guest machine
is considered part of your network and so you can connect to id using SSH and
classic http.

First, go back to your VM config and change the Network mode to "Bridged".
This will allow both machine to see each other in your network easily.

Then, define the Shared folder you want shared from your host in your guest. I
shared my websites directories so Lighty could access them from the guest.

Now, start your VM, and type `sudo ifconfig` in a terminal. You should see
your guest machine ip. Mine was 192.168.1.16.

Knowing that IP, you can define hosts in your Windows
`C:\Windows\System32\drivers\etc\hosts`

You should also install openssh server so that you'll be able to connect to
your guest machine using ssh :


```sh
sudo apt-get install openssh-server
```

We will now take care of the shared folder defined earlier. Selecting them in
VirtualBox only made them available for mounting in the guest, but you'll now
have to type some more commands to effectively see them. I needed to have
access to a project I coded in my host (let's name it `myproject`).

Here's how I made it available to Lighty :


```sh
sudo mkdir /var/www/myproject
sudo mount -t vboxsf -o rw,uid=$(id -u),gid=$(id -g www-data) myproject /var/www/myproject
```

This will create a directory in `/var/www` to hold the project, and will then
mount the shared folder to that directory. The uid/gid stuff indicate that you
(the current user) is the owner and `www-data` is the group. Doing so will fix
access rights issues you may have with Lighty.

You should have to re-run the last command on every login, so I strongly
suggest you to put it in `/etc/rc.local` so it gets executed automatically.

## Step 4 : Configuring all that stuff

I won't go into much details on how to configure lighty or php because it is
not the scope of this post. I might post on that subject later, though. But
here is one important step you shouldn't forget : uncomment the
cgi.fix_pathinfo=1 line in your php.ini.

Don't forget to reload Lighty after changes to its config files by running:


```sh
sudo /etc/init.d/lightppd restart

```

I also had one additional side-effect on my install : installing php5 also
installed Apache, causing Lighty to fail on startup because Apache was already
using the port 80. I fixed it by removing every reference to Apache by running
:


```sh
sudo update-rc.d -f apache2 remove
```

## Final note :

If you followed this instruction, you should have a server running inside a VM
that runs your website stored in your host. Isn't that pretty ?
