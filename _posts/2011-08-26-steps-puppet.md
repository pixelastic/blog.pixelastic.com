---
layout: post
title: "First steps with puppet"
custom_v2_id: 308
---

I've never used puppet before this project. It in installed on our main
server, monitoring the whole pool of servers used to host our game. It
includes php hosts, sql data nodes and sql front servers as well as a couple
of load balancer.

Puppet keeps a snapshot of the config that must be deployed on each server and
keep them in sync. We just have to edit the puppet files, and the same config
is replicated on each server.

I did not install puppet, our sysadmin did it, and I have no idea how he did
it actually, I'm just fiddling with specific configurations here. But as it
took me quite a bit to grasp, here is how it works, and some quirks to be
aware of.

## The puppet files

Puppet is installed in `/etc/puppet`. Our different modules are stored in`
/etc/puppet/modules`. A module is a set of programs and config files that work
together.

For example, we have one for the `loadbalancers`, one for the `http `part, one
for `mysql`, and even one for `vim`. I'm going to focus on the `http `one,
because it contains config files for memcache, lighttpd and php.

Modules are split in two parts : the manifest and the files. You can find each
in `/etc/puppet/modules/{modulename}/manifests` and in
`/etc/puppet/modules/{modulename}/files`.

As you can imagine, the manifest contains a list of directive telling puppet
what programs need to be installed, what directories need to be present (with
specific user and group) as well as what files need to be copied.

The `files/` directory contains all the files that puppet might need for this
module. It will copy them from this directory to the final servers, according
to the manifest config.

## Manifest syntax

The manifest uses a very simple syntax, using blocks of `key => value` to
define config. I've mostly use the simple `file `directives, to copy files and
create directories.

One can also use `package `directories, to install things and handle
dependencies, but I haven't messed with that (yet) so I won't talk about them
here.

Here are a couple of simple file orders :


```puppet
file { "/etc/lighttpd/scripts":
  ensure  => directory,
  owner   => root,
  group   => root,
  mode    => 550
}
file { "/etc/lighttpd/lighttpd.conf":
  owner   => root,
  group   => root,
  mode    => 644,
  source  => "puppet:///http/$target/lighttpd/lighttpd.conf",
  require => Package["lighttpd"],
  notify  => Service["lighttpd"],
}
```

The first part will create a` /etc/lighttpd/scripts` directory on the final
server, with a user and group `root `and 550 permissions mode.

The second part will copy the file stored in
`/etc/puppet/modules/http/{target}/lighttpd/lighttpd.conf` on the puppet
server to `/etc/lighttpd/lighttpd.conf` on the final server. I'm not quite
sure what the `require `and `notify `lines are for.

`$target` is a special variable. In my case it can take either the value
`valid` or `prod`, allowing me to define custom config based on the
environment. Valid and prod environment are supposed to have the exact same
config, but separating them allow for testing a config change in one
environment without potentially breaking the working prod environment. I'm not
exactly sure how this `$target` var is set, this is one more thing our
sysadmin did. Thanks to him.

## Pulling changes

Puppet is configured to check its servers every 30mn. If some config files
changed, or a directory isn't there anymore, it will recreate them, according
to the manifest. But you can force the pulling of changes from the final
servers themselves. Just log to one of the servers puppet is monitoring and
type


```sh
$ sudo puppetd --test
```

The `--test` argument is a bit misleading. It actually does not seem to do any
test at all, it simply pulls the puppet files from the puppet server and
updates its files accordingly. It will notify you of any errors it might find,
and even print a `diff `of the files changed.

## One last thing

I've lost 30mn checking and re-checking my puppet file because my `php.ini`
changes weren't updated. In fact, I just forgot to reload `lighttpd`...

