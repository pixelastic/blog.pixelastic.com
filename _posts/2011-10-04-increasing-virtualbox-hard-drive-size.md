---
layout: post
title: "Increasing VirtualBox hard drive size"
custom_v2_id: 317
---

<p>While trying to import a huge (1.7Go) mysql dump file into my VM I was blocked by mysql telling me that not enough space was left on the device to complete the operation.</p>
<p>As I was running a VM, I thought it would be a simple matter of increasing the virtual hard drive size.</p>
<p>Turns out it wasn't that simple. After much trial and error, here is how I finally did it.</p>
<h4>Creating a new hard drive</h4>
<p>VirtualBox let you easily add new devices, such as hard drives to your VM. I simply created an empty 120Go hard drive and booted my VM.</p>
<p>Here, under Ubuntu, I cloned my current hard drive to the new one using :</p>
<pre><code lang="sh">sudo dd if=/dev/sda of=/dev/sdb</code></pre>
<h4>Fixing the guest partition</h4>
<p>Once finished, I opened Gparted, selected <code>/dev/sdb</code> and saw that I had 112Go unallocated. I couldn't easily add them to the initial partition as a swap partition was in the way.</p>
<p>I finally decided to remove the swap partition and resize the initial one to the (almost) complete size of the hard drive.</p>
<p>I left 1Go free in case I ever needed to create a new swap partition later to fix the one I deleted.</p>
<p>Then, I closed the VM. Get back to VirtualBox panel and remove the original drive, keeping only the new 120Go one.</p>
<p>One reboot later, my Ubuntu was proudly displaying its 120Go.</p>