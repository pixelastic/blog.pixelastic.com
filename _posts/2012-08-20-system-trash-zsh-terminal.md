---
layout: post
title: "Use the system trash with ZSH terminal"
custom_v2_id: 340
---

<p>When you start using the terminal as your main file explorer instead of a GUI one, you soon discover two important things.</p>
<p>First, it is much faster to browse accross your filesystem, copying and moving files in the terminal that it is with your mouse. This is hard to believe at first (how can writing text on a dull black screen be faster than drag'n'dropping ?) but it is nonetheless true (after a bit of practice, sure).</p>
<p>The second thing is that it is also much much easier to <strong>permanently delete very important files </strong>as deleting a file through the terminal has no trash bin nor any other safeguard mechanism.</p>
<h4>Scripting a rm replacement</h4>
<p>At first, I scripted my own rm <code>rm</code> replacement that was manually moving files to <code>~/.local/share/Trash/files</code> (the common Trash directory) instead of deleting them. But it was a bit naive and couldn't really work on removable drives nor provide a "restore" mechanism.</p>
<p>Fortunatly, the <code>trash-cli</code> package on Ubuntu provides a set of methods to deal with the trash from the command line. They have very explicit names such as <code>trash</code>, <code>list-trash</code>, <code>restore-trash</code> or <code>empty-trash</code>.</p>
<h4>ZSH aliases</h4>
<p>I had to resort to quite a bit of ZSH tweaking to make it a perfect <code>rm</code> replacement. First, I added a simple alias for the <code>rm</code> command.</p>
<pre><code>alias rm='trash'
</code></pre>
<p>Then I also wanted to change the default <code>rmdir</code> command. I could have used the same type of alias (<code>alias rmdir='trash'</code>) but I would have lost the builtin ZSH autocompletion of directories zsh provides with <code>rmdir</code>.</p>
<p>When you define aliases with ZSH, you can choose if you want it to autocomplete based on the right hand side of your alias (<code>NO_COMPLETE_ALIASES</code>) or the left hand side (<code>COMPLETE_ALIASES</code>). Yes, the name of the options seem wrong to me too, but this is actually how it works.</p>
<p>I prefer setting <code>NO_COMPLETE_ALIASES</code> so I can use the correct autocompletion on my commands with my aliases, but for the <code>rmdir</code> case this was proving to be an issue.</p>
<h4>rmdir autocompletion</h4>
<p>So, I started writing my own <code>rmdir</code> implementation in a custom script. This was merely a wrapper to <code>rmdir</code> but putting it in its own script allowed me to change its name and thus changing its autocomplete method.</p>
<p>I named it <code>better-rmdir</code>, and put it in my <code>$PATH</code>. Here is the code</p>
<pre><code>#!/usr/bin/zsh
trash $@
</code></pre>
<p>As you can see, this is just a wrapper, taking the initial arguments and passing them to <code>trash</code>.</p>
<p>But I also created a file named <code>_better-rmdir</code> and put it in my <code>$FPATH</code> (this is where ZSH goes looking to autocomplete methods). I just copied the code of the original <code>_directories</code> method (that you can probably find in <code>/usr/share/zsh/functions/Completion/Unix/</code>), and adapted it to fit my newly created <code>better-rmdir</code></p>
<pre><code>#compdef better-rmdir
local expl

_wanted directories expl directory _files -/ "$@" -
</code></pre>
<p>And finally, I added an alias (<code>alias rmdir='better-rmdir'</code>) and everytime I ask for an autocomplete on <code>rmdir</code> it actually looks for the autocomplete of <code>better-rmdir</code>, which is the code contained in <code>_better-rmdir</code> and which in turn return only directories.</p>
<p>Now I have complete <code>rm</code> and <code>rmdir</code> commands in my terminal that move files to the trash.</p>