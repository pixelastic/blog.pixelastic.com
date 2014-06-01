---
layout: post
title: "Javascript speed tip : reduce variable lookup"
custom_v2_id: 195
---

<p>It appears that, according to this video, when inside a Javascript function (or closure), if you want to access a variable, the closer your scope is to this variable, the faster you'll get it.</p>
<p>In simpler words, accessing a global variable (like <code>document</code>, or <code>window</code>) from inside a function will always be slower that accessing a locally defined variable.</p>
<p>It also means that, when inside a method of an object, accessing a variable defined in this method will be faster that accessing a property of the parent object, which itself will be faster that accessing a global variable.</p>
<p>So, for example, if you need to access at least twice a global variable like <code>window </code>or <code>document </code>in a method, you'd better cache it in a local variable first.</p>
<pre><code lang="js">function myTestFunction() {<br />	var button = document.getElementById('button');<br />	var header = document.getElementById('header');<br />}<br /></code></pre>
<p>is bad and could be rewritten as :</p>
<pre><code lang="js">function myTestFunction() {<br />	var doc = document;<br />	var button = doc.getElementById('button');<br />	var header = doc.getElementById('header');<br />}<br /></code></pre>
<p> </p>