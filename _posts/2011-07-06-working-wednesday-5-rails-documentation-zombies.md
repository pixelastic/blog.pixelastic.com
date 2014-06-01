---
layout: post
title: "Working on Wednesday #5 : Rails documentation and Zombies"
custom_v2_id: 298
---

<p>Today I continue on my Rails for Zombie learning. Actually, I wake up kind of late (11am), had to deal with noisy neighbors and make some shopping before being really able to start working. It's 2pm now, and I just open my browser.</p>
<h4>Back to Zombies</h4>
<p>I like the clean syntax Ruby provides. I like being able to pass custom parameters without having to care about the order. This could be achieved in cakePHP using array for options, but is much more clean the Ruby way, using <code lang="sh">truncate(zombie.graveyard, :length =&gt; 10, :omission =&gt; '')</code></p>
<p>Also the <code lang="sh">link_to</code> and <code>new_{Model}_path</code>, <code>edit_{Model}_path</code> are clever and allow easy access to the link you always use. This force you to logically organise your app.</p>
<p>The way Rails controllers pass vars to the view (using <code lang="sh">@</code>) is also cleaner than the cakePHP <code>set</code> method. I love those little things the language permits.</p>
<p><code lang="sh">before_filter</code> also seems more powerful than in cake world, being able to define several of them and restrict them to certain action. Could be extended (I guess) to an ApplicationController that could check on <code>show</code>, <code>edit</code>, etc that the specified id exists and display an error message if not.</p>
<p>I didn't quite get the various <code lang="sh">respond_as</code> for JSON and XML. Why should I have to pass the <code>@tweet</code> while I don't have to for the html view ?</p>
<p>Also, the Rails routings system is more appealing to me than its cakePHP counterpart. I would have loved to have such a nice tutorial for cake when I learned it. Routing is very well explained in Rails for Zombies.</p>
<p>After completing the Zombie tutorial, I headed to the famous blog tutorial every web language should have. Once again, I started reading the doc and a few things caught my attention as very promising :</p>
<h4>Command line interface</h4>
<p>I like the way one can create a new app simply with one command line. Such feature is also provided by cakePHP but I never managed to make it work the way I wanted to. That might have been influenced by the fact that I was working on Windows at that time.</p>
<h4>Directory structure</h4>
<p>I also note that a Rail application seems greatly structured : there are spaces defined for documentation, tests, database migration, dependencies, logs, deployment scripts and so on.</p>
<h4>Databases</h4>
<p>This is great that Rails directly provides two distinct DB configurations : development and production. I will no longer have to do it myself.</p>
<p>Rails also uses SQLite3 as the default database for development. As I wasn't very familiar with this technology, I made some researchs. Turns out that SQLite is a very simple DB system, perfectlynsuited for the development period as it does not require a DB server.</p>