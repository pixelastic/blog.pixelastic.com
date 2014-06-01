---
layout: post
title: "Installing jshint with node v0.6.6"
custom_v2_id: 331
---

<p>Yesterday, I've tried to install nodejs and the jshint package to add automatic jshint parsing to my vim.</p>
<p>Well, it wasn't so simple due to a bug in the npm version shipped with node.</p>
<p>Here are the complete commands to run to make it work, in case I had to do it again :</p>
<pre><code lang="sh"># Download and extract node<br />cd ~/local/src<br />wget http://nodejs.org/dist/v0.6.6/node-v0.6.6.tar.gz<br />tar xvzf node-v0.6.6.tar.gz<br />rm node-v0.6.6.tar.gz<br /># Compile and install<br />cd node-v0.6.6<br />./configure<br />make<br />sudo make install<br /># Update npm<br />sudo npm install npm@alpha -g<br /># (Optional) Clear npm cache<br />npm cache clean jshint<br /># Install jshint<br />sudo npm install jshint -g<br /></code></pre>
<p>Source : <a href="https://github.com/isaacs/npm/issues/1888" target="_blank">https://github.com/isaacs/npm/issues/1888</a></p>