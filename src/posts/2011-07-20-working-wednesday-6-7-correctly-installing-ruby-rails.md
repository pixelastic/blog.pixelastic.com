---
layout: post
title: "Working on Wednesday #6-#7 : Correctly installing Ruby on Rails"
custom_v2_id: 299
tags: wednesday, ruby-on-rails, rvm, bundler, ruby, gem
---

_This post spans two weeks because I couldn't manage to have a clean
Ruby/Rails install on my first try. I read a lot, installed ruby using various
methods, but finally managed to get it to work corretly._

## Cleaning up

First of all, you have to remove any ruby version you might have already
installed, just to be sure.


```sh
sudo apt-get remove ruby && sudo apt-get autoremove
```

## Installing RVM

Then, you have to install RVM before installing Ruby. My biggest mistake in my
various shots at installing Ruby was to install RVM last.

RVM is a very important part of the whole Ruby process. This is a little piece
of genius that allow you to create Ruby sandboxes. You can install various
Ruby versions side by side, even various gem versions and you simply tell RVM
which sandbox you want to use.

If you are absolutly positive that you will never ever work on more than one
Ruby project in your entire life, you can skip installing RVM and simply
install Ruby globally on your system. But you know that this will never
happen, so, avoid future troubles and install RVM first.

To install RVM, simply execute the following command


```sh
bash < <(curl -s https://rvm.beginrescueend.com/install/rvm)
```

This will download and execute the install script. Once it's finished, edit
your `.bashrc` or `.zshrc` to include the rvm config file whenever a shell is
launched.


```sh
[[ -r $HOME/.rvm/scripts/rvm ]] && source $HOME/.rvm/scripts/rvm
```

Just to sure to have the latest version, I also ran


```sh
rvm get head
rvm reload
```

## Updating your system

RVM depends on some binaries to work, so be sure to install them all. They are
listed when running `rvm notes`, but as the time of writing this was the list
for me :


```sh
sudo apt-get install build-essential bison openssl libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libsqlite3-0 libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev
```

## Installing Ruby

Once RVM is installed, installing the latest (1.9.2 as the time of writing)
Ruby version is as easy as :


```sh
rvm install 1.9.2
```

This will take some time, downloading and compiling Ruby. Next, tell RVM that
this is the version we are gonna use.


```sh
rvm use 1.9.2

```

You can always switch back to your system-wide ruby install by doing


```sh
rvm use system
```

## Creating a gemset

Plugins in Ruby world are named gems. They can easily be installed/uninstalled
to a project to provide advanced features. Rails itself is a gem.

The traditional way of using gem is to simpy using the RubyGem command `gem.`

When using RVM and its sandboxed mode however, the best way is to create a
gemset, and install gems in that gemset. This will allow us in the future to
switch between multiple gemset easily.

I suggest creating a gemset for each project you start. You can also install
gems in the global gemset so they get available to each project. As I'm new to
the Ruby world and still don't really know which gems ar "must-have", I'll
skip this part for now.

Let's create a new gemset for our new project. I'll name mine `pixelastic`,
but change the name to fit your project name


```sh
rvm gemset create pixelastic
rvm gemset use pixelastic 
```

You'll be now using the gemset `pixelastic`. You can list all available gems
in your current gemset by doing


```sh
gem list
```

Or list all the available gemsets by doing :


```sh
rvm gemset list
```

The one you are currently using will be prefixed by `=>`

## What is Rake ?

You might have noticed that your new gemset contains only one gem, named Rake.
You do not need too spend to much time on that. You simply have to know that
Rake is more or less the Ruby compiler. Your Ruby code will go through this
gem to became a running app.

## Installing Rails

As I said above, Rails is a gem like many other, so you can simply install it
by doing :


```sh
gem install rails
```

Note that because we are using RVM, the gem will only be installed in this
gemset and not globally. If you switch gemset, rails will no longer be
available.

If we weren't using RVM, the gem would have been installed globally. RVM is
actually wrapping itself around the `gem` command to sandbox it inside its own
gemset.

## Handling dependencies with Bundler

Installing Rails will install a bunch of other gems. One of them is Bundler.

Bundler is a Rails specific gem dependencies handler. Its features seems to
overlap thoses of RVM. At the time of writing, I haven't yet used it, but its
main use still seems to be its gemfile.

The goal of a gemfile (located in your project directory) is to list all the
gems your project will need (along with respective versions if provided).
Then, whenever you drop your project in a new environment, Bundler will be
able to download and install your gems for you.

If said environment uses RVM, then the gems will be saved in the gemset, if
not they will be installed globally. Bundler is absolutly not linked to RVM
and can be used independently.

The syntax of a gem file will not be discussed here as I have no previous
experience with them, but the command to read the gemfile and update the
project accordingly is :


```sh
bundle install
```

## Automatic switching gemset

One nice bit of RVM is that it is able to automatically detect the gemset to
use on a per project basis. You simply have to create a .rvmrc file in a
project, and RVM will execute it.

For example, to use my `pixelastic` gemset and Ruby 1.9.2, simply add the
following to your `.rvmrc`


```sh
rvm use 1.9.2@pixelastic
```

## References

I read a lot on the subject, to finally get it right. Here are the various
sources :

  * [Mark Grabanski](http://marcgrabanski.com/articles/gem-management-with-rvm-and-bundler)
  * [Railway.at](http://www.railway.at/2010/02/13/avoiding-rails-3-dependency-hell-with-rvm/)
  * [The official Get Started guide](http://guides.rubyonrails.org/getting_started.html)
  * [A Stack Overflow question about RVM, Gems and Bundler](http://stackoverflow.com/questions/4604064/ruby-gems-bundler-and-rvm-confusion)

## Update : Sqlite3

If you got error complaining about Sqlite3 missing, just

```sh
sudo apt-get install libsqlite3-0 libsqlite3-dev
```
