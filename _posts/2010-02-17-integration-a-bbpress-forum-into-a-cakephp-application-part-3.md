---
layout: post
title: "Integration of a bbPress forum into a cakePHP application (part 3)"
custom_v2_id: 48
---

<p>Let's go back to bbPress now. With the previous post, you should be able to create bbPress user directly from your app.</p>
<h4>Redirecting bbPress to the cakePHP app actions</h4>
<p>What we'll be doing now is adding some hooks on every user-related action on bbPress to redirect them to their equivalent in your app. No need to have two different login form, hey ?</p>
<p>Create a new php file in your <code>app/webroot/forum/my-plugins/</code> directory, and copy and paste the following code :</p>
<pre lang="php"><code lang="php">/*<br />Plugin Name: cakePHP User<br />Description:  Remaps each login/register/forgotpass action to those of your own application<br />Version: 0.1<br />Author: Pixelastic<br />Author URI: http://www.pixelastic.com/<br /><br />License: CC-GNU-GPL http://creativecommons.org/licenses/GPL/2.0/<br /><br />*/<br /><br />define( 'APP_URL', 'http://www.myapp.com/' );<br />/**<br /> *    __convertToAppUrl<br /> *    Convert a given bbPress URI to one mapped to the main application<br /> **/<br />function cake_convertToAppUrl($uri) {<br />	 // We explode the path in different subdirs<br />	 $paths = explode('/', $uri);<br />	 $nbrPath = count($paths);<br /><br />	 // We get the last part of the url<br />	 $endUri = substr($uri, strrpos($uri, "/")+1);<br /><br />	 $mappedUrl = array(<br />		 // Register<br />		 'register.php' =&gt; 'users/add',<br />		 // Lost password<br />		 'password-reset.php' =&gt; 'users/pass',<br />		 // Login<br />		 'bb-login.php' =&gt; 'users/login',<br />		 // Logout<br />		 'bb-login.php?action=logout' =&gt; 'users/logout',<br />		 // Profile editing<br />		 'edit' =&gt; 'users/edit/'.$paths[$nbrPath-2]<br />	 );<br /><br />	 // If there is a mapping, we return it, otherwise we don't touch the uri<br />	 return (!empty($mappedUrl[$endUri])) ? APP_URL.$mappedUrl[$endUri] : $uri;<br />}<br />// We filter both bb_uri and bb_get_uri<br />add_filter('bb_uri', 'cake_convertToAppUrl', 1);<br />add_filter('bb_get_uri', 'cake_convertToAppUrl', 1);</code></pre> <p>It will hook every method that ask for a url and convert the result to return the corresponding url in your own app.</p>
<p>Don't forget to enable this plugin in your bbPress admin panel.</p>
<p>Of course, feel free to change the destination url to reflect those of your app.</p>
<h4>Additional information</h4>
<p>Note that the<code> users/edit/ </code>method takes the bbPress <code>nicename </code>as argument, so you should have to convert it before displaying the edit form.</p>
<p>I also edited my template and added an hidden field in the bbPress login form to check if the login was coming from the app or the forum and redirect accordingly.</p>