---
layout: post
title: "Installing jshint with node v0.6.6"
custom_v2_id: 331
---

Yesterday, I've tried to install nodejs and the jshint package to add
automatic jshint parsing to my vim.

Well, it wasn't so simple due to a bug in the npm version shipped with node.

Here are the complete commands to run to make it work, in case I had to do it
again :

    
```sh
# Download and extract node  
cd ~/local/src  
wget http://nodejs.org/dist/v0.6.6/node-v0.6.6.tar.gz  
tar xvzf node-v0.6.6.tar.gz  
rm node-v0.6.6.tar.gz  
# Compile and install  
cd node-v0.6.6  
./configure  
make  
sudo make install  
# Update npm  
sudo npm install npm@alpha -g  
# (Optional) Clear npm cache  
npm cache clean jshint  
# Install jshint  
sudo npm install jshint -g  
```

Source : [https://github.com/isaacs/npm/issues/1888](https://github.com/isaac
s/npm/issues/1888)

