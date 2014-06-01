---
layout: post
title: "Testing a custom ErrorHandler in cakePHP"
custom_v2_id: 218
---

<p>I just finished writing the test case for a custom <code>AppError </code>class. Writing the tests case was indeed much more difficult than writing the class itself.</p>
<p>Here are some things I've found that may interest anyone wanting to test their own <code>ErrorHandlers</code>. Most of the ideas are taken from the core <code>ErrorHandlerTest</code>.</p>
<h4>Anatomy of an error</h4>
<p>Every class in cakePHP extends <code>Object</code>. And in <code>Object </code>is defined a method named <code>cakeError</code>. It means that anywhere in your app you can call <code>$this-&gt;cakeError(</code>) and the whole app will stop and display the specified error.</p>
<p>What <code>cakeError </code>does is instantly create an instance of either <code>Controller </code>or <code>CakeErrorController</code>, find the correct view, render it, and stop.</p>
<p>Because of the use of static variables, <code>exit </code>calls and other happyness, testing several errors in a test case needs us to define some new classes to shortcircuit most of the logic.</p>
<h4>Preparing the test</h4>
<p>This step is actually pretty short. Just load the default <code>ErrorHandler </code>by calling <code>App::import('Core','Error');</code></p>
<h4>Creating a dummy AppController</h4>
<p>Then, you'll have to create a new <code>AppController </code>class that extends <code>Controller</code>.</p>
<p>We will override the <code>header </code>method to prevent '<em>Headers already set</em>' error when calling several errors in a row.</p>
<p>We will also override the <code>render</code> method to store in an inner property the name of the rendered action. It will help test that the correct error is rendered.</p>
<p>You may also need to define a custom list of helpers if your custom views are using any custom helpers.</p>
<p>Here is what it looks like on my side :</p>
<pre><code lang="php">class AppController extends Controller {<br />	// Helpers used in the view. If not set, will generate a fatal error<br />	var $helpers = array('Caracole.Fastcode', 'CaracolePacker.Packer');<br />	// Overriding the header method. If not set, will generate 'Headers already set' errors;<br />	function header($header) {<br />		$this-&gt;header = $header;<br />	}<br />	// Overriding render method to keep track of the rendered error<br />	function render($action) {<br />        	$this-&gt;renderedAction = $action;<br />        	return parent::render($action);<br />	}<br />}<br /></code></pre>
<h4>Creating a TestErrorHandler</h4>
<p>This class will extends your <code>AppError</code>. It will just overwrite two methods to make it correctly work in a test case.</p>
<p>First, we'll need to overwrite the <code>__construct</code>. The default construct will set the inner <code>$this-&gt;controller</code> property to either a <code>Controller </code>or a <code>CakeErrorController </code>instance depending if its the first error fired or not. I must admit that I haven't really understand the difference between the two. But I know that <code>CakeErrorController </code>extends <code>AppController </code>while <code>Controller </code>extends <code>Object</code>.</p>
<p>And as we need to overwrite methods of this property, it being a <code>CakeErrorController </code>is great, while it being a <code>Controller </code>is bad. Anyway, what I did was copy/paste the parent <code>__construct</code> into <code>TestErrorHandler </code>and just force it to always create a <code>CakeErrorController </code>instance.</p>
<p>The other method we need to overwrite is the <code>_stop</code>. If we don't, the whole script will halt after the first error you'll test.</p>
<p>So, enough talk, here's the code :</p>
<pre><code lang="php">class TestErrorHandler extends AppError {<br />	// Copy/paste of ErrorHandler construct method, but force a new instance of CakeErrorController as $this-&gt;controller each time<br />	// CakeErrorController extends AppController, so we can overwrite its methods<br />	function __construct($method, $messages) {<br />		App::import('Core', 'Sanitize');<br /><br />		// Forcing CakeErrorController<br />		$this-&gt;controller =&amp; new CakeErrorController();<br />		$options = array('escape' =&gt; false);<br />		$messages = Sanitize::clean($messages, $options);<br /><br />		if (!isset($messages[0])) {<br />			$messages = array($messages);<br />		}<br /><br />		if (method_exists($this-&gt;controller, 'apperror')) {<br />			return $this-&gt;controller-&gt;appError($method, $messages);<br />		}<br /><br />		if (!in_array(strtolower($method), array_map('strtolower', get_class_methods($this)))) {<br />			$method = 'error';<br />		}<br />		if ($method !== 'error') {<br />			if (Configure::read('debug') == 0) {<br />				$parentClass = get_parent_class($this);<br />				if (strtolower($parentClass) != 'errorhandler') {<br />					$method = 'error404';<br />				}<br />				$parentMethods = array_map('strtolower', get_class_methods($parentClass));<br />				if (in_array(strtolower($method), $parentMethods)) {<br />					$method = 'error404';<br />				}<br />				if (isset($code) &amp;&amp; $code == 500) {<br />					$method = 'error500';<br />				}<br />			}<br />		}<br />		$this-&gt;dispatchMethod($method, $messages);<br />		$this-&gt;_stop();<br />	}<br /><br />	// Preventing the error from stopping all the request<br />	function _stop() {<br />		return;<br />	}<br />}<br /></code></pre>
<h4>Writing your tests</h4>
<p>Ok, your almost done. You just have now to write your tests. They have to follow a special syntax to correctly work.</p>
<p>First, you'll have to wrap your <code>ErrorHandler </code>creation between <code>ob_start()</code> and <code>$output= ob_get_content()</code>, otherwise you'll end up with error popping right into your test case because the <code>ErrorHandler </code>force the controller to render the view.</p>
<p>You'll be able to access interesting properties through <code>$errorHandler-&gt;controller-&gt;renderedAction</code> and <code>$errorHandler-&gt;controller-&gt;header</code>. You can also directly test the view output through <code>$output</code>.</p>
<p>Ok, so here's one of my tests :</p>
<pre><code lang="php">// DEV : Error will use the error layout<br />function testCallingErrorInDevWillUseErrorLayout() {<br />	ob_start();<br />	$errorHandler = new TestErrorHandler('missingController', $this-&gt;errorParams);<br />	$result = ob_get_clean();<br />	$this-&gt;assertEqual($errorHandler-&gt;controller-&gt;layout, 'error');<br />}<br /></code></pre>
<h4>Conclusion</h4>
<p>It took me some hours to glue all this pieces together, I hope it may be useful to others, too. Writing the <code>AppError </code>itself was way easier, but as I'm now test infected I don't imagine writing code without the corresponding tests.</p>