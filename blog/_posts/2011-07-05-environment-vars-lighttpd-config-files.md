---
layout: post
title: "Using environment vars in lighttpd config files"
custom_v2_id: 297
tags: lighttpd, include-shell
---

Our game is hosted on a farm of servers behind a load balancer. All servers
are identical except for their names (`prod-01`, `prod-02`, etc) and virtual
IP addresses.

In PHP, if I try to access `$_SERVER['SERVER_NAME']`, I only got the domain
name "prod.game.com". Actually, this was exactly the same var as the
`$_SERVER['HTTP_HOST']`.

For logging purposes, I needed to know the name of the server that my script
was currently running on. So I updated my `lighttpd.conf`

Lighty has a feature called `include_shell` that you can use in its config
files. It will basically run a shell script and add its output to your file.

So I wrote a simple shell script to define a `var.serverName` (this is a
custom value, name it as you want, but keep the `var` prefix) and then re-use
when needed.


```sh
#!/bin/bash
echo 'var.serverName="'$(uname -n)'"'
```

Then, I included it in my `lighttpd.conf` file using `include_shell
"/etc/lighttpd/scripts/serverName.sh"`

To define the PHP SERVER_NAME value :


```ini
setenv.add-environment = (
  "SERVER_NAME" => var.serverName
)
```

To add it as a Server: response Header :


```ini
server.tag = var.serverName
```

Note that `include_shell` directives are only called when you start lighty and
not on every request.
