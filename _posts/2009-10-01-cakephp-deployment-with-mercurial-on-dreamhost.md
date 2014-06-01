---
layout: post
title: "cakePHP deployment with Mercurial on Dreamhost"
custom_v2_id: 22
---

<p>I now use Mercurial on my daily work flow and have set up some methods on my dev machine to ease the pain of installing mercurial and make it work on any new webserver.</p>
<p>Here are some snippets that automate all that stuff. You may have to change one thing or two to accomodate your own setup.</p>
<p>First, I create a custom <code>.bashrc</code> file that I will put on the webserver and create into the following method :</p>
<pre><code lang="sh">hgInstall() {<br /> mkdir -p ~/.packages/src<br /> cd ~/.packages/src<br /> wget http://www.selenic.com/mercurial/release/mercurial-1.2.tar.gz<br /> tar xvzf mercurial-1.2.tar.gz<br /> cd mercurial-1.2<br /> python setup.py install --home=~/.packages/<br /><br /> echo -e "[ui]\nusername = Pixelastic &lt;tim@mailastic.com&gt;" &gt;&gt; ~/.hgrc<br /> echo -e "[extensions]\nhgext/hbisect=!\nhgext.imerge=! &gt;&gt; ~/.hgrc<br /><br /> . ~/.hgrc<br /> cd ~/<br /> hg version<br />}<br /><br /></code></pre>
<p>Let me explain. I first create a directory to store the packages I will download (in this example I will only download one package, but as I don't like to have files all around my server, I just keep them in this place). I will then download Mercurial 1.2 in this new directory, unzip it and install it.</p>
<p>Next step is configuring the default user and correcting some bugs with Dreamhost trying to load non-existing extensions (<code>hgext/hbisec</code>t and <code>hgext.imerge</code>). As I've made a change to <code>.hgrc</code>, I reload it and get back to the default directory while displaying hg version.</p>
<p>That's almost done, I also have to edit the .bash_profile and add the following lines</p>
<pre lang="robots"><code lang="ini">export PYTHONPATH=~/.packages/lib/python<br />export PATH=~/.packages/bin:$PATH</code></pre>
<p>Ok, so this method will download, install on configure Hg on the Dreamhost server. That's all very well, but I had to manually setup the .bashrc, let's see if we cannot automate that as well.</p>
<p>Now, I'm editing my .zsh_aliases on my local machine (or your .bash_aliases if you're using bash) to add the following method</p>
<pre lang="robots"><code lang="sh">dreamhost() {<br /> scp ~/Documents/Config/Dreamhost/.bashrc ~/Documents/Config/Dreamhost/.bash_profile $1:~/<br /> ssh $1 '. ~/.bashrc'<br /> scp ~/.ssh/id_rsa.pub ~/Documents/Config/Dreamhost/.ssh/xpsfixe.pub $1:~/<br /> ssh $1 'addKeys'<br /> scp ~/Documents/Config/Dreamhost/cakeClearCache.sh $1:~/<br /> ssh $1 'chmod +x ~/cakeClearCache.sh'<br /> ssh $1 'hgInstall'<br /> ssh $1<br />}</code></pre>
<p>Ok, so this one is a little more complex. You have to call this method with one paremeter, being the user@domain credentials to connect to your Dreamhost server. What it will do is upload (using ssh) files from your local machine to the server and then apply some commands on the machine using ssh.</p>
<p>First it will upload both the local version .bashrc and .bash_profile that are sitting on your dev machine and "reload" the .bashrc, allowing you to use the previously defined hgInstall directly in the shell</p>
<p>Then, it will upload your ssh key(s) to the server and add them to the list of allowed keys (more on that later, just skip the addKeys line for now.)</p>
<p>The next step is uploading (and giving the correct chmod) a special script that will clear cakePHP cache (more on that later too)</p>
<p>And the final step is calling the previously explained hgInstall method. So the only thing you have to do is put this method in your .zsh_aliases (and the corresponding keys, .bashrc and scripts in their corresponding places) then run dreamhost() and Hg will be installed on your server.</p>
<p>So now let me get back a little on the two details I skipped. The first is the key stuff. What I'm doing is uploading your ssh key(s) to the server and then calling addKeys. It will authorize those keys to connect using ssh without having to type login/pass on each request. Here is the addKeys code (you have to put it in your .bashrc file and modify the filename to your own)</p>
<pre lang="robots"><code lang="sh">addKeys() {<br /> mkdir .ssh<br /> cat id_rsa.pub &gt;&gt; .ssh/authorized_keys<br /> cat xpsfixe.pub &gt;&gt; .ssh/authorized_keys<br /> rm id_rsa.pub<br /> rm xpsfixe.pub<br /> chmod go-w ~<br /> chmod 700 ~/.ssh<br /> chmod 600 ~/.ssh/authorized_keys<br />}</code></pre>
<p>It will basically create the .ssh dir and authorized_keys file with your keys info. It will then delete the files and set the correct chmod.</p>
<p>And the second part was about that cache clearing thing. When you update your app using Hg, you do not want to update the cache files created by Cake as they contain filepath reference and are likely to be different between your test and prod environment and would surely broke your whole app. So, you set an ignore rule in the .hgignore about them like the following :</p>
<pre lang="robots"><code lang="ini">syntax:glob<br />app/tmp/cache/cake_*<br />app/tmp/cache/views/*.php<br />app/tmp/cache/models/cake_*<br />app/tmp/cache/persistent/cake_*<br /></code></pre>
<p>It does work fine almost all the time, but it sometimes lead to errors as the cache is not regenerated between each hg update. Sometimes you have to alter a model schema or the way a value is stored in cache and if you don't clear your cache, it can yield to unexpected results as the data will be wrongly parsed and used.</p>
<p>So what i did to avoid that was to create a script that will clear the cache for you. Here is the code (you have to be inside the project dir for this to work)</p>
<pre lang="robots"><code lang="sh">cd app/tmp/cache<br />rm -f cake_*<br />rm -f views/*\.php<br />rm -f models/cake_*<br />rm -f persistent/cake_*<br />cd ../../../</code></pre>
<p>It will remove all the cache files generated by cake that could interfere after an update. You just have to wrap thoses lines in a method in your .bashrc (mine is called cakeClearCache) and execute it after each update or when you have caching issues.</p>
<p>Well, I think you guessed that I did not stop here. Manually applying the method after each update can be a little tedious. So I put the previous code in a file named cakeClearCache.sh (you can spot that I uploaded this file in the dreamhost() method earlie)r. I also added the following line to my /project/.hg/hgrc on my server (if you don't have this file, just create it, it's a project-based hg configuration file)</p>
<pre lang="robots"><code lang="ini">[hooks]<br />update = ~/cakeClearCache.sh</code></pre>
<p>It means that everytime an hg update is done, the specified script is fired. That's really fine for us, it means that cache will be cleared on each update. Sounds good.</p>
<p>One last thing to do was creating the hgrc file automatically. That's why I created the following method (add it to the .bashrc file in the server). It is just a wrapper that will create the hgrc file after doing an hg init</p>
<pre lang="robots"><code lang="sh">hgInitStart() {<br /> hg init<br /> echo -e "[hooks]\nupdate = ~/cakeClearCache.sh" &gt;&gt; ./.hg/hgrc<br />}<br /></code></pre>
<p>So instead of doing hg init, just do hgInitStart. You can then start cloning your project here.</p>
<p>And one last thing, I also created a method that will set correct chmod to app/tmp and app/webroot/files</p>
<pre lang="robots"><code lang="sh">cakeCorrectChmod() {<br /> chmod 777 ./app/tmp -R<br /> chmod 777 ./app/webroot/files -R<br />}</code></pre>
<p>And created a wrapper around it to call just after having cloned the project that will update it and set the correct chmods</p>
<pre lang="robots"><code lang="sh">hgInitEnd() {<br /> hg update tip<br /> cakeCorrectChmod<br />}</code></pre>
<p>That's all. I bet anyone slightly more experienced in shell scripting could do better than that, but as I have struggled a little to get this right I thought I could share it.</p>