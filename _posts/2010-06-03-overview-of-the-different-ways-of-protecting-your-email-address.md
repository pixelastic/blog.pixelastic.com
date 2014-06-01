---
layout: post
title: "Overview of the different ways of protecting your email address"
custom_v2_id: 179
---

<p>You surely know that displaying an email address as plain text in a website today is a sure way to get your mailbox full of viagra, rolex and poker ads in no time.</p>
<p>Spammer have bots running all day long, crawling through hundred of thousands of pages, grabbing everything that looks like something@somewhere.com.</p>
<p>Before going any</p>
<h4>Existing way of protecting your email address</h4>
<p>The safest way is to not display it in the first place. Nothing beats that. But if you really need to be contacted through email, here are some of the possible alternative.</p>
<h5>Using a contact form instead.</h5>
<p>That's what I'm doing on this very own site.</p>
<p>This way I don't have to display my address, I let my server script send the email for me.</p>
<p>Unfortunatly, it means that you have to protect your contact form against spam now. How to do that is not the scope of this post, however.</p>
<h5>Using an image</h5>
<p>Instead of writing your email as plain text, you can use an image inside which your email is written. Spam bots can't read images (well, they <strong>could</strong> but they won't bother when there is still so many clear email they can grab without worrying about images).</p>
<p>Unfortunatly it has two drawbacks. First, you force your reader to type your email as they can't copy/paste it. This lead to possible typos, and more importantly will frustrate your user.</p>
<p>Secondly, people browsing without images (yes, that does exists, either because they have a slow connection, browsing through an old mobile phone or using a text reader) won't be able to contact you.</p>
<h5>Spelling it aloud</h5>
<p>One of the better way is still to appeal to the human brain and telling your user what your email is, like "my name, at, my domain dot com" or "tim@nowhere.com where you have to change nowhere to pixelastic".</p>
<p>I've even seen someone using the very long form of : "tee ee em at pee hi ex ee el ah ess tee hi see dot see oh em". Sure, spammer won't get that, but the truth is, not many user won't either.</p>
<p>The drawback of this method is the same as the previous one, you force your user to type your address.</p>
<h4>Ain't there an easiest way ?</h4>
<p>Would'nt it be better if we hadn't to worry about that. If there was a way that all our reader would read the email, click on it and send us a mail ? While being protected from spam bots ?</p>
<p>Well, there have been attempt to do that, using various server side and client side techniques. Unfortunatly, all of them failed for at least one type of users.</p>
<h5>Encrypting email using unicode</h5>
<p>One can encrypt any string in Unicode using server script language. It will turn every character into an entity like &amp;#46;. Your browser will stil understand it correctly, and display it as the corresponding value.</p>
<p>We could assume that bots won't understand it, but I have no data to back that up. It would be trivial for an harvest bot to parse email using unicode, so I won't recommend it.</p>
<h5>Using CSS to display the mail</h5>
<p>Modern browser, with great CSS support can help in this process with the use of generated content and the :after pseudo class.</p>
<p>Let's look at the following code :</p>
<pre><code lang="html">&lt;span class="email" rel="@pixelastic.com"&gt;tim&lt;/span&gt;</code></pre>
<pre><code lang="css">span.email[rel]:after {<br />	content: attr(rel);<br />}<br /></code></pre>
<p>You just put your username in the <code>span</code>, and the domain name in the <code>rel </code>attribute and let CSS display it as one single email address.</p>
<p>But you need a browser with a correct CSS support to do that, otherwise you will only see the user part, which is not really useful.</p>
<h5>Using an HTTP redirect</h5>
<p>This one is a clever one that I haven't seen used a lot. Instead of making a link to a mailto:, you make the link go to a mail.php page that will only contain one php statement :</p>
<pre><code lang="php">header('Location: mailto:user@domain.com');<br /></code></pre>
<p>I'm not sure of the browser support of this, however. And it still won't solve the problem of displaying your email address.</p>
<h5>Adding HTML noise</h5>
<p>You can add HTML comments (<code>&lt;!--  --&gt;</code>), or useless elements (<code>&lt;span /&gt;</code>) all  around your email adress. They won't get processed by your browser that  will still display it as normal, but it will most likely make the spam  bot choke.</p>
<p>Unfortunatly, you can't use them in the <code>href="mailto:"</code> section of your link, so it is not a perfect fit either. But still, that's a good start.</p>
<h5>Using Javascript to populate the email</h5>
<p>The principle behind this one is that Javascript will write the email adress for you in the code. As most spam bots won't have Javascript enabled (again, I don't have source to back that up but I assume so), they won't be able to see it.</p>
<p>Just write your email address in a Javascript file, maybe in several different variables that you'll merge to create the final one. The more obfuscated your code is, the harder it will be for the spammer to add its logic to its bot.</p>
<h4>Conclusion</h4>
<p>There isn't one perfect solution yet. But maybe, merging several of them we could bypass the weaknesses to create something that really handle all the situations.</p>
<p>I have some ideas in the back of my head actually, I'll try to make something with them and post it here.</p>
<p>I'm pretty sure starting with an obfuscated HTML source (but still correctlt displaying), then adding an obfuscated Javascript layer to create the <code>mailto:</code> link is the way to go.</p>
<p>This would mean a better user experience for users with Javascript, but that's ok, that's what Javascript is for.</p>