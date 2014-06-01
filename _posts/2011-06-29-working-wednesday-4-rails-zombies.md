---
layout: post
title: "Working on Wednesday #4 : Rails for Zombies"
custom_v2_id: 294
---

<p> </p>
<p>(I finally managed to update Ubuntu to the 10.10 version, configure Unity to make it more usable, and I'm not ready to start the RoR tutorial I wanted to start last week.)</p>
<p>I used <code>vim</code> this week (instead of <code>nano</code>) for very simple file editing. I will force myself to use only <code>vim</code> on wednesday to really learn it. I plan to completly drop Komodo Edit once I'll be familar enough with vim to gain more time than I lose.</p>
<h4>Rails for Zombies</h4>
<p>Anyway. I finally get to start the Rails for Zombies tutorial. And here is what I learned.</p>
<p>There are two distinct things I'm going to learn here : Ruby and Rails. I discovered that I was already familiar with a lot of basic concepts of Rails, thanks to cakePHP. Model and table convention, model relationships (belongs to, has many, etc) were exactly the same.</p>
<p>Ruby on the other hand was new. But also very interesting. No need to add <code>()</code> after a method to call it when no args are passed, possibility to chain method of the same object (much like jQuery) and the use of dynamic (yet strongly typed) vars.</p>
<p>The first part of the tutorial (basic CRUD) was easy. I didn't find how to make a complex SQL query like this (cake) one :</p>
<pre><code lang="php">$Zombie-&gt;find('all', array(<br />'order' =&gt; array('Zombie.graveyard' =&gt; 'ASC', 'Zombie.name' =&gt; 'DESC'<br />));<br /></code></pre>
<p>I guess it's just a matter of time before I learn how to to do in Rails anyway. I saw that there was more "advanced" method (much like the cake <code>find</code> method) that would surely allow such finding.</p>
<h4>Part 2 : Validation and Relationships</h4>
<p>The second part of the tutorial was more about models. Validation rules were pretty much the same as those of cakePHP. But the Ruby syntax makes it more concise.</p>
<p>I couldn't find how to retrieve the validation errors when saving an object using the <code>create</code> method (no problem when manually calling <code>save</code>, though).</p>
<p>I enjoyed being able to create binded instances by simply adding the binded element to the model. Not very clear isn't it ? Here some code to explain it better. The last two lines have exactly the same effect :</p>
<pre><code lang="php">class Zombie &lt; ActiveRecord::Base<br />end<br />class Weapon &lt; ActiveRecord::Base<br />belongs_to :zombie<br />end<br />Weapon.create(:name =&gt; "Rocket Launcher", :zombie_id =&gt; 2)<br />Weapon.create(:name =&gt; "Rocket Launcher", :zombie =&gt; Zombie.find(2))</code></pre>
<p>Later on, I had to select all weapons binded to a specific Zombie. I was able to find the a specific zombie using any of the two following commands :</p>
<pre><code lang="php">z = Zombie.where(:name =&gt; "Ash").first<br />z = Zombie.find(:first, :conditions =&gt; { :name =&gt; "Ash" })</code></pre>
<p>Then, I wanted to find the weapons binded to this zombie. First I tried the following command :</p>
<pre><code lang="php">Weapon.where(:zombie_id =&gt; z.id)</code></pre>
<p>Obviously, this worked. But I wanted to test some more of the Rails magic. So I tried something along the lines of what I did in the previous chapter and tried to use my <code>z</code> var directly instead of <code>z.id</code>.</p>
<pre><code lang="php">Weapon.where(:zombie =&gt; z)</code></pre>
<p>This didn't worked. Well, I guess I'll also learn why later one. But one even more weird thing is that the following command did work even I'm not really sur why ?</p>
<pre><code lang="php">Weapon.where(:zombie_id =&gt; z)</code></pre>
<p>That's all I did today (well I also did some more Mercurial an Dingux testing, but I that wasn't really work)</p>
<br />