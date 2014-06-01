---
layout: post
title: "Catching PHP errors with simpleTest"
custom_v2_id: 194
---

<p>I needed to write a test that should fail if the method I was testing triggered a PHP <code>E_NOTICE</code> error (namely, an "<em>undefined index</em>" kind of error).</p>
<p>SimpleTest provides both <code>expectError()</code> and <code>expectException()</code> methods. I have only been able to make the former work with manually triggered errors (using <code>trigger_error()</code>), and the latter only catchs Exceptions.</p>
<p>After hours of googling, and reading SimpleTest source code, I finally managed to come up with a solution.</p>
<h4>Redefining the error handler</h4>
<p>It still amaze me how awfuly complicated it is to do such a simple thing. Anyway, the key is to redefine the error handler function so you can shortcircuit both PHP and SimpleTest on the way they managed errors.</p>
<p>Doing so you can detect when the code you test produce an error. Based on the <code>$errno</code> and <code>$errstr</code> supplied, you can even filter to exactly the error you're looking for.</p>
<p>Unfortunatly, you'll be blocked inside your newly defined <code>error_handler</code> function. It means you won't have access to the test, so won't be able to call <code>$this-&gt;pass()</code> nor <code>$this-&gt;fail()</code>, because <code>$this</code> does not reference anything.</p>
<h4>Throw me out of here</h4>
<p>The only trick I've found to get out of this function and back in the scope of your test is to throw an Exception. Namely, an <code>ErrorException</code>.</p>
<p>Doing so we can rewrote our test to put the part that is triggering the error inside a <code>try </code>/ <code>catch </code>statement and manually pass or fail the test.</p>
<h4>Don't you forget something ?</h4>
<p>One <strong>very</strong> important thing not to forget here is to restore the <code>error_handler</code> to its original value once you won't need it. If you don't, you will surely broke all your subsequent tests because SimpleTest use its own <code>error_handler</code> too.</p>
<p>We have to restore it in two places, both when the code triggered and error / throw an exception and when it don't.</p>
<h4>Cut the speech, show me the code</h4>
<p>Okay, here's the code. Don't forget to adapt the condition in the <code>error_handler</code> to match your error.</p>
<pre><code lang="php">function testGotUndefinedIndex() {
    // Overriding the error handler
    function errorHandlerCatchUndefinedIndex($errno, $errstr, $errfile, $errline ) {
        // We are only interested in one kind of error
        if ($errstr=='Undefined index: bar') {
            //We throw an exception that will be catched in the test
            throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
        }
        return false;
    }
    set_error_handler("errorHandlerCatchUndefinedIndex");

    try {
        // triggering the error
        $foo = array();
        echo $foo['bar'];
    } catch (ErrorException $e) {
        // Very important : restoring the previous error handler
        restore_error_handler();
        // Manually asserting that the test fails
        $this-&gt;fail();
        return;
    }

    // Very important : restoring the previous error handler
    restore_error_handler();
    // Manually asserting that the test succeed
    $this-&gt;pass();
}
</code></pre>
<p> </p>