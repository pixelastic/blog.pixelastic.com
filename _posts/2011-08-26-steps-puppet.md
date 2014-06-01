---
layout: post
title: "First steps with puppet"
custom_v2_id: 308
---

<p>I've never used puppet before this project. It in installed on our main server, monitoring the whole pool of servers used to host our game. It includes php hosts, sql data nodes and sql front servers as well as a couple of load balancer.</p>
<p>Puppet keeps a snapshot of the config that must be deployed on each server and keep them in sync. We just have to edit the puppet files, and the same config is replicated on each server.</p>
<p>I did not install puppet, our sysadmin did it, and I have no idea how he did it actually, I'm just fiddling with specific configurations here. But as it took me quite a bit to grasp, here is how it works, and some quirks to be aware of.</p>
<h4>The puppet files</h4>
<p>Puppet is installed in <code>/etc/puppet</code>. Our different modules are stored in<code> /etc/puppet/modules</code>. A module is a set of programs and config files that work together.</p>
<p>For example, we have one for the <code>loadbalancers</code>, one for the <code>http </code>part, one for <code>mysql</code>, and even one for <code>vim</code>. I'm going to focus on the <code>http </code>one, because it contains config files for memcache, lighttpd and php.</p>
<p>Modules are split in two parts : the manifest and the files. You can find each in <code>/etc/puppet/modules/{modulename}/manifests</code> and in <code>/etc/puppet/modules/{modulename}/files</code>.</p>
<p>As you can imagine, the manifest contains a list of directive telling puppet what programs need to be installed, what directories need to be present (with specific user and group) as well as what files need to be copied.</p>
<p>The <code>files/</code> directory contains all the files that puppet might need for this module. It will copy them from this directory to the final servers, according to the manifest config.</p>
<h4>Manifest syntax</h4>
<p>The manifest uses a very simple syntax, using blocks of <code>key =&gt; value</code> to define config. I've mostly use the simple <code>file </code>directives, to copy files and create directories.</p>
<p>One can also use <code>package </code>directories, to install things and handle dependencies, but I haven't messed with that (yet) so I won't talk about them here.</p>
<p>Here are a couple of simple file orders :</p>
<pre><code lang="ini">file { "/etc/lighttpd/scripts":<br />	ensure  =&gt; directory,<br />	owner   =&gt; root,<br />	group   =&gt; root,<br />	mode    =&gt; 550<br />}<br />file { "/etc/lighttpd/lighttpd.conf":<br />	owner   =&gt; root,<br />	group   =&gt; root,<br />	mode    =&gt; 644,<br />	source  =&gt; "puppet:///http/$target/lighttpd/lighttpd.conf",<br />	require =&gt; Package["lighttpd"],<br />	notify  =&gt; Service["lighttpd"],<br />}</code></pre>
<p>The first part will create a<code> /etc/lighttpd/scripts</code> directory on the final server, with a user and group <code>root </code>and 550 permissions mode.</p>
<p>The second part will copy the file stored in <code>/etc/puppet/modules/http/{target}/lighttpd/lighttpd.conf</code> on the puppet server to <code>/etc/lighttpd/lighttpd.conf</code> on the final server. I'm not quite sure what the <code>require </code>and <code>notify </code>lines are for.</p>
<p><code>$target</code> is a special variable. In my case it can take either the value <code>valid</code> or <code>prod</code>, allowing me to define custom config based on the environment. Valid and prod environment are supposed to have the exact same config, but separating them allow for testing a config change in one environment without potentially breaking the working prod environment. I'm not exactly sure how this <code>$target</code> var is set, this is one more thing our sysadmin did. Thanks to him.</p>
<h4>Pulling changes</h4>
<p>Puppet is configured to check its servers every 30mn. If some config files changed, or a directory isn't there anymore, it will recreate them, according to the manifest. But you can force the pulling of changes from the final servers themselves. Just log to one of the servers puppet is monitoring and type</p>
<pre><code lang="sh">$ sudo puppetd --test</code></pre>
<p>The <code>--test</code> argument is a bit misleading. It actually does not seem to do any test at all, it simply pulls the puppet files from the puppet server and updates its files accordingly. It will notify you of any errors it might find, and even print a <code>diff </code>of the files changed.</p>
<h4>One last thing</h4>
<p>I've lost 30mn checking and re-checking my puppet file because my <code>php.ini</code> changes weren't updated. In fact, I just forgot to reload <code>lighttpd</code>...</p>