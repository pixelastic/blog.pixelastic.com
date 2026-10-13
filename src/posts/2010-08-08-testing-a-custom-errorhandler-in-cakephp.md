---
layout: post
title: "Testing a custom ErrorHandler in cakePHP"
custom_v2_id: 218
tags: php, unit-testing, errorhandler, tests, simpletest, apperror, cakephp
---

I just finished writing the test case for a custom `AppError `class. Writing
the tests case was indeed much more difficult than writing the class itself.

Here are some things I've found that may interest anyone wanting to test their
own `ErrorHandlers`. Most of the ideas are taken from the core
`ErrorHandlerTest`.

## Anatomy of an error

Every class in cakePHP extends `Object`. And in `Object `is defined a method
named `cakeError`. It means that anywhere in your app you can call
`$this->cakeError(`) and the whole app will stop and display the specified
error.

What `cakeError `does is instantly create an instance of either `Controller
`or `CakeErrorController`, find the correct view, render it, and stop.

Because of the use of static variables, `exit `calls and other happyness,
testing several errors in a test case needs us to define some new classes to
shortcircuit most of the logic.

## Preparing the test

This step is actually pretty short. Just load the default `ErrorHandler `by
calling `App::import('Core','Error');`

## Creating a dummy AppController

Then, you'll have to create a new `AppController `class that extends
`Controller`.

We will override the `header `method to prevent '_Headers already set_' error
when calling several errors in a row.

We will also override the `render` method to store in an inner property the
name of the rendered action. It will help test that the correct error is
rendered.

You may also need to define a custom list of helpers if your custom views are
using any custom helpers.

Here is what it looks like on my side :


```php
class AppController extends Controller {
  // Helpers used in the view. If not set, will generate a fatal error
  var $helpers = array('Caracole.Fastcode', 'CaracolePacker.Packer');
  // Overriding the header method. If not set, will generate 'Headers already set' errors;
  function header($header) {
    $this->header = $header;
  }
  // Overriding render method to keep track of the rendered error
  function render($action) {
        	$this->renderedAction = $action;
        	return parent::render($action);
  }
}
```

## Creating a TestErrorHandler

This class will extends your `AppError`. It will just overwrite two methods to
make it correctly work in a test case.

First, we'll need to overwrite the `__construct`. The default construct will
set the inner `$this->controller` property to either a `Controller `or a
`CakeErrorController `instance depending if its the first error fired or not.
I must admit that I haven't really understand the difference between the two.
But I know that `CakeErrorController `extends `AppController `while
`Controller `extends `Object`.

And as we need to overwrite methods of this property, it being a
`CakeErrorController `is great, while it being a `Controller `is bad. Anyway,
what I did was copy/paste the parent `__construct` into `TestErrorHandler `and
just force it to always create a `CakeErrorController `instance.

The other method we need to overwrite is the `_stop`. If we don't, the whole
script will halt after the first error you'll test.

So, enough talk, here's the code :


```php
class TestErrorHandler extends AppError {
  // Copy/paste of ErrorHandler construct method, but force a new instance of CakeErrorController as $this->controller each time
  // CakeErrorController extends AppController, so we can overwrite its methods
  function __construct($method, $messages) {
    App::import('Core', 'Sanitize');

    // Forcing CakeErrorController
    $this->controller =& new CakeErrorController();
    $options = array('escape' => false);
    $messages = Sanitize::clean($messages, $options);

    if (!isset($messages[0])) {
      $messages = array($messages);
    }

    if (method_exists($this->controller, 'apperror')) {
      return $this->controller->appError($method, $messages);
    }

    if (!in_array(strtolower($method), array_map('strtolower', get_class_methods($this)))) {
      $method = 'error';
    }
    if ($method !== 'error') {
      if (Configure::read('debug') == 0) {
        $parentClass = get_parent_class($this);
        if (strtolower($parentClass) != 'errorhandler') {
          $method = 'error404';
        }
        $parentMethods = array_map('strtolower', get_class_methods($parentClass));
        if (in_array(strtolower($method), $parentMethods)) {
          $method = 'error404';
        }
        if (isset($code) && $code == 500) {
          $method = 'error500';
        }
      }
    }
    $this->dispatchMethod($method, $messages);
    $this->_stop();
  }

  // Preventing the error from stopping all the request
  function _stop() {
    return;
  }
}
```


## Writing your tests

Ok, your almost done. You just have now to write your tests. They have to
follow a special syntax to correctly work.

First, you'll have to wrap your `ErrorHandler `creation between `ob_start()`
and `$output= ob_get_content()`, otherwise you'll end up with error popping
right into your test case because the `ErrorHandler `force the controller to
render the view.

You'll be able to access interesting properties through
`$errorHandler->controller->renderedAction` and
`$errorHandler->controller->header`. You can also directly test the view
output through `$output`.

Ok, so here's one of my tests :


```php
// DEV : Error will use the error layout
function testCallingErrorInDevWillUseErrorLayout() {
  ob_start();
  $errorHandler = new TestErrorHandler('missingController', $this->errorParams);
  $result = ob_get_clean();
  $this->assertEqual($errorHandler->controller->layout, 'error');
}
```

## Conclusion

It took me some hours to glue all this pieces together, I hope it may be
useful to others, too. Writing the `AppError `itself was way easier, but as
I'm now test infected I don't imagine writing code without the corresponding
tests.
