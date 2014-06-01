---
layout: post
title: "Catching PHP errors with simpleTest"
custom_v2_id: 194
---

I needed to write a test that should fail if the method I was testing
triggered a PHP `E_NOTICE` error (namely, an "_undefined index_" kind of
error).

SimpleTest provides both `expectError()` and `expectException()` methods. I
have only been able to make the former work with manually triggered errors
(using `trigger_error()`), and the latter only catchs Exceptions.

After hours of googling, and reading SimpleTest source code, I finally managed
to come up with a solution.

## Redefining the error handler

It still amaze me how awfuly complicated it is to do such a simple thing.
Anyway, the key is to redefine the error handler function so you can
shortcircuit both PHP and SimpleTest on the way they managed errors.

Doing so you can detect when the code you test produce an error. Based on the
`$errno` and `$errstr` supplied, you can even filter to exactly the error
you're looking for.

Unfortunatly, you'll be blocked inside your newly defined `error_handler`
function. It means you won't have access to the test, so won't be able to call
`$this->pass()` nor `$this->fail()`, because `$this` does not reference
anything.

## Throw me out of here

The only trick I've found to get out of this function and back in the scope of
your test is to throw an Exception. Namely, an `ErrorException`.

Doing so we can rewrote our test to put the part that is triggering the error
inside a `try `/ `catch `statement and manually pass or fail the test.

## Don't you forget something ?

One **very** important thing not to forget here is to restore the
`error_handler` to its original value once you won't need it. If you don't,
you will surely broke all your subsequent tests because SimpleTest use its own
`error_handler` too.

We have to restore it in two places, both when the code triggered and error /
throw an exception and when it don't.

## Cut the speech, show me the code

Okay, here's the code. Don't forget to adapt the condition in the
`error_handler` to match your error.

    
    function testGotUndefinedIndex() {
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
            $this->fail();
            return;
        }
    
        // Very important : restoring the previous error handler
        restore_error_handler();
        // Manually asserting that the test succeed
        $this->pass();
    }
    

Â

