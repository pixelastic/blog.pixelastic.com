---
layout: post
title: "cakePHP deployment with Mercurial on Dreamhost"
custom_v2_id: 22
tags: ssh, mercurial, hg, dreamhost, cakephp
---

I now use Mercurial on my daily work flow and have set up some methods on my
dev machine to ease the pain of installing mercurial and make it work on any
new webserver.

Here are some snippets that automate all that stuff. You may have to change
one thing or two to accomodate your own setup.

First, I create a custom `.bashrc` file that I will put on the webserver and
create into the following method :


```sh
hgInstall() {
 mkdir -p ~/.packages/src
 cd ~/.packages/src
 wget http://www.selenic.com/mercurial/release/mercurial-1.2.tar.gz
 tar xvzf mercurial-1.2.tar.gz
 cd mercurial-1.2
 python setup.py install --home=~/.packages/
 echo -e "[ui]\nusername = Pixelastic <tim@mailastic.com>" >> ~/.hgrc
 echo -e "[extensions]\nhgext/hbisect=!\nhgext.imerge=! >> ~/.hgrc

 . ~/.hgrc
 cd ~/
 hg version
}
```

Let me explain. I first create a directory to store the packages I will
download (in this example I will only download one package, but as I don't
like to have files all around my server, I just keep them in this place). I
will then download Mercurial 1.2 in this new directory, unzip it and install
it.

Next step is configuring the default user and correcting some bugs with
Dreamhost trying to load non-existing extensions (`hgext/hbisec`t and
`hgext.imerge`). As I've made a change to `.hgrc`, I reload it and get back to
the default directory while displaying hg version.

That's almost done, I also have to edit the .bash_profile and add the
following lines


```sh
export PYTHONPATH=~/.packages/lib/python
export PATH=~/.packages/bin:$PATH
```

Ok, so this method will download, install on configure Hg on the Dreamhost
server. That's all very well, but I had to manually setup the .bashrc, let's
see if we cannot automate that as well.

Now, I'm editing my .zsh_aliases on my local machine (or your .bash_aliases if
you're using bash) to add the following method


```sh
dreamhost() {
 scp ~/Documents/Config/Dreamhost/.bashrc ~/Documents/Config/Dreamhost/.bash_profile $1:~/
 ssh $1 '. ~/.bashrc'
 scp ~/.ssh/id_rsa.pub ~/Documents/Config/Dreamhost/.ssh/xpsfixe.pub $1:~/
 ssh $1 'addKeys'
 scp ~/Documents/Config/Dreamhost/cakeClearCache.sh $1:~/
 ssh $1 'chmod +x ~/cakeClearCache.sh'
 ssh $1 'hgInstall'
 ssh $1
}
```
Ok, so this one is a little more complex. You have to call this method with
one paremeter, being the user@domain credentials to connect to your Dreamhost
server. What it will do is upload (using ssh) files from your local machine to
the server and then apply some commands on the machine using ssh.

First it will upload both the local version .bashrc and .bash_profile that are
sitting on your dev machine and "reload" the .bashrc, allowing you to use the
previously defined hgInstall directly in the shell

Then, it will upload your ssh key(s) to the server and add them to the list of
allowed keys (more on that later, just skip the addKeys line for now.)

The next step is uploading (and giving the correct chmod) a special script
that will clear cakePHP cache (more on that later too)

And the final step is calling the previously explained hgInstall method. So
the only thing you have to do is put this method in your .zsh_aliases (and the
corresponding keys, .bashrc and scripts in their corresponding places) then
run dreamhost() and Hg will be installed on your server.

So now let me get back a little on the two details I skipped. The first is the
key stuff. What I'm doing is uploading your ssh key(s) to the server and then
calling addKeys. It will authorize those keys to connect using ssh without
having to type login/pass on each request. Here is the addKeys code (you have
to put it in your .bashrc file and modify the filename to your own)


```sh
addKeys() {
 mkdir .ssh
 cat id_rsa.pub >> .ssh/authorized_keys
 cat xpsfixe.pub >> .ssh/authorized_keys
 rm id_rsa.pub
 rm xpsfixe.pub
 chmod go-w ~
 chmod 700 ~/.ssh
 chmod 600 ~/.ssh/authorized_keys
}
```
It will basically create the .ssh dir and authorized_keys file with your keys
info. It will then delete the files and set the correct chmod.

And the second part was about that cache clearing thing. When you update your
app using Hg, you do not want to update the cache files created by Cake as
they contain filepath reference and are likely to be different between your
test and prod environment and would surely broke your whole app. So, you set
an ignore rule in the .hgignore about them like the following :


```
syntax:glob
app/tmp/cache/cake_*
app/tmp/cache/views/*.php
app/tmp/cache/models/cake_*
app/tmp/cache/persistent/cake_*
```

It does work fine almost all the time, but it sometimes lead to errors as the
cache is not regenerated between each hg update. Sometimes you have to alter a
model schema or the way a value is stored in cache and if you don't clear your
cache, it can yield to unexpected results as the data will be wrongly parsed
and used.

So what i did to avoid that was to create a script that will clear the cache
for you. Here is the code (you have to be inside the project dir for this to
work)


```sh
cd app/tmp/cache
rm -f cake_*
rm -f views/*\.php
rm -f models/cake_*
rm -f persistent/cake_*
cd ../../../
```

It will remove all the cache files generated by cake that could interfere
after an update. You just have to wrap thoses lines in a method in your
.bashrc (mine is called cakeClearCache) and execute it after each update or
when you have caching issues.

Well, I think you guessed that I did not stop here. Manually applying the
method after each update can be a little tedious. So I put the previous code
in a file named cakeClearCache.sh (you can spot that I uploaded this file in
the dreamhost() method earlie)r. I also added the following line to my
/project/.hg/hgrc on my server (if you don't have this file, just create it,
it's a project-based hg configuration file)


```ini
[hooks]
update = ~/cakeClearCache.sh
```

It means that everytime an hg update is done, the specified script is fired.
That's really fine for us, it means that cache will be cleared on each update.
Sounds good.

One last thing to do was creating the hgrc file automatically. That's why I
created the following method (add it to the .bashrc file in the server). It is
just a wrapper that will create the hgrc file after doing an hg init


```sh
hgInitStart() {
 hg init
 echo -e "[hooks]\nupdate = ~/cakeClearCache.sh" >> ./.hg/hgrc
}
```

So instead of doing hg init, just do hgInitStart. You can then start cloning
your project here.

And one last thing, I also created a method that will set correct chmod to
app/tmp and app/webroot/files


```sh
cakeCorrectChmod() {
 chmod 777 ./app/tmp -R
 chmod 777 ./app/webroot/files -R
}
```

And created a wrapper around it to call just after having cloned the project
that will update it and set the correct chmods


```sh
hgInitEnd() {
 hg update tip
 cakeCorrectChmod
}
```

That's all. I bet anyone slightly more experienced in shell scripting could do
better than that, but as I have struggled a little to get this right I thought
I could share it.
