---
layout: post
title: "Beginner's introduction to Unit Testing and TDD"
custom_v2_id: 191
tags: cakephp, simpletest, tests, unit-testing, tdd
---

I first heard of TDD and Unit Testing one year ago, by reading discussions
about cakePHP. Cake was boasting about its complete testing.

Back in these days I only had a vague understanding of what that meant. I
guessed it was a way to prove that the code you wrote did not have any bug, or
if it had, you could find them easily and make sure that you did not break
existing code with a new release.

That sounded exciting and I tried to write some tests for my own app. I gave
up really quickly as I found that you need both a good understanding of the
inner workings of cake and some familiarity with testing before being able to
write tests.

Some weeks ago, I decided to gave it another try. This time I started by
reading more general concepts about the whole testing thing before writing
anything. That's how I learned that Unit Testing and TDD are two different
thing, the former leading to the latter.

## So, what exactly is Unit Testing ?

A Unit Test is a simple test (function) you write that will test that one tiny
little part of your whole application is doing what it is supposed to do. Most
of the time, you'll end up testing one particular method of one particular
class. You pass a specified input parameter to you function, and you test that
the returned value is the one you were expecting.

Unit Testing is _just_ that : writing automated tests for methods you wrote.
You'll then have to run all your tests and you'll be able to spot in a matter
of seconds which tests failed, and thus see where a bug occured. Testing this
way is order of magnitude faster than manually testing your app, one page at a
time.

Before learning what Unit Testing was, I was writing my methods whenever I
needed them and just assumed that they were bugless. Now, I can write a test
to formerly prove that they are. And I can even re-run this same test every
time I refactor my code to see if my refactoring did not broke any previous
behavior.

The more precise your tests are, the easier it will be for you to debug where
the bug is coming from.

## And what is Test Driven Development ?

TDD is a whole new way of writing code. Instead of writing your method then
write the test for it, you write the test before. You can even write several
tests before, in fact as much as you can think of.

It forces you to conceptualise (in your head) what you exactly want your
method to do. What inputs should be accepted, what should be returned, what
are the edge cases, what arguments are optional, etc.

Once you've done all this, you just write the tests for each of this things.
Test your method with a specifically formatted input, and check the expected
result. Do that for every edge case you can think of. Then, run the tests. It
will fail, because you haven't even started writing the method. But that's ok,
and should I say, that's the goal.

Now you have a set of rules, kinda like specs. You know what your method
should do because you've written that down with your tests. You can start
writing your method, and you'll know that you haven't finished it until all
the tests passes. Thanks to the tests, you'll know for sure when you're done
on a specific method.

Thanks to TDD, you'll have a precise measure of where you are in the
development cycle. If all your code is test covered and that you only add new
code that is also covered, you can release you app as often as you want.

## And how is it good for me ?

First of all, you will know for sure when you're done working on a method. If
all the tests passes, you're good. If at least one test fails, it means that
you can't still use this method in production because it may have undesirable
side effects.

it will force you to better think about what you really want to do before
writing anything. I used to rarely take time to stop and think, but instead
rushed into writing code to "make it work". Now, I'm spending more time with a
pen an paper before, writing down all I want my method to do.

I didn't see the benefit of it at first, but I forced myself to do it, and
it's suprising how fast you can see the benefits. It will allow you to see
more easily edge cases you hadn't thought of, and prepare yourself in
consequence.

## But I spend so much time writing tests, while I could be adding new features instead !

Yeah, I thougt that too. Writing tests is a chore. It takes a lot of time,
especially if you've never wrote any before (but it gets much easier with
practice).

Writing tests for an existing app is even more difficult. Most of the time,
the code is not easily testable and will need refactoring to allow testing.
While refactoring code just to test it may seem kind of useless (at least
that's what I thought), the benefits are huge. You only have to write tests
once, and the debug value it offers you will stay forever. Compare this to the
time you'll have to spend manually debugging a complicated class.

Tests are also universal and they act as a pretty good documentation. If you
ever work in a team, tests are a great way to make other people understand
what your code is supposed to do. And if someone else needs to edit your code,
they'll just have to run the tests to see if they break something.

It is true that writing testable code and corresponding tests takes time. But
it is not true that you could spend this time on new features. If you don't
write tests for a feature, how could you tell that it's bugless ? We can just
have your word for it, while when using tests we have a boolean answer to this
question. Tests passes, it works, tests failed, it does not work.

If you don't know for sure that a feature is bugless, you'll never be sure if
a bug won't appear later and that's you'll have to come back and track it
down. Maybe the bug won't show until one month or two, but you know how hard
it is to debug a two-month old code, even written by yourself.

With tests, you do yourself a favor, by asserting that you won't have to get
back to this code later. So yes, it will take longer to write a new feature
with tests, but at least you'll be able to say "Ok, it's done, and it's
working", while with a feature that hasn't been tested, you'll ended up saying
"Ok it's done, I think it should work. Well, we'll see...".

## You've convinced me, I want to start writing tests now.

Great !

First, I discourage you to start and write tests for your whole application
right now. The bigger the app, the faster you'll be fed up with tests. It's
much more harder to write tests after, than before. So just write tests for
one class or two at the moment, add new features to your app (using the TDD
approach), and get back to writing tests to the rest of the app later.

For your firsts tests, you can choose an existing class. I found that models
are the easiest classes to tests. You'll need fixtures for that, but I won't
detail it here, the cake documentation is clear enough on the subject. You'll
also have to create a test case, but again, everything is in the
documentation. If it does not feel clear enough for you, just ask in the
comments and I'll add a more detailed explanation.

And now, here are some advices I've learned, I thought I could share them with
you :

  * The number of tests you'll have to write is not dependent on the number of methods you have in your class. Most of the methods will need several tests, while some rare methods won't need any. Just write one test for each outcome you want to test. The cake Core tests usually make one test method for each method in the class. I prefer to make several small tests, that way I can more easily spot the part that is failing.
  * You can name your test methods the way you want, they just have to start with `test`. Do not hesitate to be very specific in the method name. I have methods called `test404ErrorIfInvalidUserId` or `test404ErrorIfNonExistentuser`
  * Make calls to `App::import()` at the top of your file to load every class you'll need.
  * Use and abuse the `startTest `method. This method is called before every test, this is a good way to reset vars to make sure one previous test call will not impact subsequent calls. I got the habit to define a property of the test case as the object I want to test. For example, when testing a model, I'll write something along the lines of :


```php
function startTest() {
$this->model = ClassRegistry::init('User');
}
```

  * Try to refactor you code to split logic into several small methods, each with its own goal and logic. This will be easier to test.
  * If you have to test code that relies on an external library and make static calls to it, just wrap the static calls inside a method of your class and mock (see MockObjects) the method.
  * You'll have to create a test case (extending `CakeWebTestCase`) to test view generation. This test case will be able to make get (using `get()`)queries to your site, and allowing you to test the resulting source code of the page against regular expression using `assertPattern()`/`assertNoPattern()`
  * If you have code that rely on `exit`, just replace that code to `$this->_stop()`, it's a method wrapping `exit `that was created just to make testing easier. If you have code using `die()`, then you're screwed.

As I'm also still discovering Unit Testing in cake, I'll surely post other
tips as I encounter them.
