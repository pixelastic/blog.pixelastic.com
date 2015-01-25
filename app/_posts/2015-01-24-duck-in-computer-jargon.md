---
layout: post
title: "Duck in computer jargon"
tags: duck, jargon
---

I've been struck by how often we, developers, use the word _duck_ in our
jargon.  Here is a little list of the usages that came from the top of my mind.

## Duck Typing

This might be the more [common usage][DuckTyping]. It comes from the saying
that, _if it quacks like a duck, it is probably a duck_. I've mostly
encountered it in the Ruby ecosystem, where you don't really care about which
class an object belongs to, as long as it answers your calls to a specific
method.

```ruby
class Duck
  def quack
    puts "Quaaaaack!"
  end
end

class NotReallyADuckButIDontCare
  def quack
    puts "Coin-Coin!"
  end
end

Duck.new().quack # Quaaaaack
NotReallyADuckButIDontCare.new().quack # Coin-Coin!
```

This is quite useful when iterating over collections of
similar-but-yet-different objects and wanting to call a specific method on each
of them, when every object implements it slightly differently.

## Duck Feature

That's the name we use for a feature in a project who adds absolutely no value,
and we know it will never make it to the final product. But we keep it because
we know that at some point, either the marketing departement or the management
departement will feel the urge to ask us to change something to our product.
And when that moment arise, we just remove the _duck feature_ to please them.

This one, allegedly, come from the good old days of Interplay, when [they were
developing Battle Chess][DuckFeature]. The animation artist did a very great
job at animating one of the pieces and was very proud of his job. But he knew
that someone will have something to say about it and ask him to change
something (just because they could). So he added a little duck, walking
side-by-side with the Queen. As expected, he was asked to remove the duck,
which he did, without altering the real Queen animation.

## Rubber Duck Debugging

How many times have we been stuck on a problem for minutes or hours, and
finally asking a colleague for help, or posting a question on StackOverflow
? And when writing our question, or exposing our problem to our colleague, the
solution came right at us, clear as day. 

That's because we were so focused on the issue, that we did not take the time
to reassess why we needed to do it, and most of the time, we just discovered
that we actually had no issue to fix at all.

So next time, instead of disturbing a colleage, try talking to yourself, or
even better, to a [rubber duck][RubberDuckDebugging], explaining your issue,
and you might find the answer simply by explaining the problem.

## Canary Release

You might have heard of [Chrome Canary][ChromeCanary]. This is the next Chrome
official release, but available sooner, for front-end developers. This allow
developers to test new features and API earlier, and report bugs, so the
official release will be more polished. This can also be applied to [full
architecture][CanaryRelease] deployment, when you're running the old and new
versions in parallel, but only a selected few are using the new platform at
first.

But why is it named _Canary_ ? Well, it comes from the old coal mines, where
miners where carriying crates of small canaries to test for poisonous gases.
The analogy is the same, we first test on a small subset of users, and if
everything is working fine, we'll deploy to everybody.

## Any others ?

The duck jargon seems to be used a lot in programming and I'm sure there are
other instances that I'm not aware of. I'll update this post whenever I'll
encounter a new one.

[DuckTyping]: http://en.wikipedia.org/wiki/Duck_typing
[DuckFeature]: http://programmers.stackexchange.com/questions/122009/developing-a-feature-which-sole-purpose-to-be-taken-out
[RubberDuckDebugging]: http://en.wikipedia.org/wiki/Rubber_duck_debugging
[CanaryRelease]: http://martinfowler.com/bliki/CanaryRelease.html
[ChromeCanary]: https://www.google.fr/chrome/browser/canary.html
