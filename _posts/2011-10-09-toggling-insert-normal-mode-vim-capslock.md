---
layout: post
title: "Toggling insert/normal mode in vim with CapsLock"
custom_v2_id: 319
---

<p>You know that CapsLock key on your keyboard ? The sole usage of this key is to SHOUT ON TEH INTERNETS§§§. I decided to disable it completly as I never use it on purpose.</p>
<p>I also wanted to use it in vim to toggle between normal and insert mode with one key instead of the default <code>i</code>/<code>Esc</code>.</p>
<h4>Disabling CapsLock</h4>
<p>Disabling CapsLock is a fairly straightforward process. The xmodmap program is responsible for binding keyboard events to your software and you can change the default behavior by creating an <code>~/.Xmodmap</code> file.</p>
<p>Just put the following code in it and the pressing the CapsLock key will no longer block your next keys in Caps.</p>
<pre><code lang="ini">clear Lock</code></pre>
<h4>Catching it in vim</h4>
<p>Now, to get it in vim, you'll have a little more work to do. First, CapsLock is not one of the default vim keycodes, so you won't be able to remap it to any useful function. To use it in vim, we will hook it directly on xmodmap to another key, one that is part of vim default keycodes.</p>
<p>I choose the virtual F13 key. Your physical keyboard might only have F keys from 1 to 12, but the internal software seems to be able to react to 37 of them. So, why not using them ?</p>
<p>In your <code>~/.Xmodmap</code> file, this is as easy as adding the following line</p>
<pre><code lang="ini">keycode 66 = F13</code></pre>
<p>66 is the internal code for the CapsLock key. We just define that pressing the physical CapsLock key should trigger the F13 virtual key.</p>
<p>Now, in <code>~/.vimrc</code>, we will tell vim to explictly listen to extended F keys (from 13 to 37) which it does not do by default.</p>
<pre><code lang="ini">set &lt;F13&gt;=^[[25~</code></pre>
<p><code>^[[25~</code> is the special keyboard code sent to vim when the F13 key is triggered. Here we just define that such a keyboard code should be interpreted in vim as an <code>&lt;F13&gt;</code> vim key.</p>
<p>Now, you can use <code>&lt;F13&gt;</code> in your custom vim mappings</p>
<h4>Toggling normal/insert mode in vim</h4>
<p>vim accepts two kinds of mapping. Those triggered in normal mode (using <code>nnoremap</code>) and those triggered in insert mode (using <code>inoremap</code>).</p>
<p>Here we want that pressing CapsLock (or <code>&lt;F13&gt;</code> in vim as we defined) in normal mode will go to insert mode, like pressing <code>i</code> does. And we also want to get back to normal mode when pressing CapsLock in insert mode, just like pressing <code>Esc</code> does.</p>
<pre><code lang="ini">nnoremap &lt;F13&gt; i<br />inoremap &lt;F13&gt; &lt;Esc&gt;l</code></pre>
<p>Notice the <code>l</code> after Esc. It is here to prevent the caret to move back one character when exiting insert mode.</p>
<h4>Fixing the shell</h4>
<p>One last thing to fix is your shell. By defining in xmodmap that pressing CapsLock would trigger an F13 event, it means that whatever software that react on F13 will now react on CapsLock. Unfortunatly, zsh does react on F13. It insert a <code>~</code> character on it (just like it does with F12).</p>
<p>To disable it, we'll simply define a key binding in <code>~/.zshrc</code> so pressing F13 does nothing.</p>
<pre><code lang="ini">bindkey -s "\e[25~" ""</code></pre>
<p>Here it is. You can now press CapsLock anywhere and it won't have any effect. Plus, pressing it in vim will toggle insert/normal mode.</p>