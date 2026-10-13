---
layout: post
title: "Cleaner code"
tags: clean code
---

In a previous job, I did a lot of code reviews with a team of more junior
developers. My job was to help them write better, more readable and more
maintainable code. There was something that came back really often in my
reviews: simplifying the `if` flow.

I'll give you a code example, along with the modifications I suggested to it.

_Note that the code is not the real code of the app, but one crafted for the
needs of this blog post._

## The original code

```javascript
function isFormValid(inputs) {
  if (inputs.age < 50) {
    if (inputs.gender === 'M' && inputs.firstName !== '' && inputs.lastName !== '') {
      return true;
    } else if (inputs.gender === 'F' && inputs.firstName !== '' && inputs.lastName !== '' && inputs.maidenName !== '') {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
```

What does it do? It is a (simplified) form validation method. Given an `age`,
`gender`, `firstName`, `lastName` and possibly `maidenName`, it checks if the
form is valid.

The rules are:

- `firstName` and `lastName` are mandatory fields.
- If you're a woman, `maidenName` is then also mandatory.
- The form is always valid if you're older than 50.

As it is currently written, the code works, but it is very verbose and not
straightforward. Let's rewrite it.

## Remove useless `else`

The more branching a code has, the more difficult it is to visualize in your
mind. Bugs will sneak in more easily in a code that is hard to understand. As
the saying goes: _the less code you have, the less bugs you can have_.

The first step I usually take is to remove all the cruft. The `else`s in this
code are useless. Every preceding `if` does a `return`, so if the code goes
inside that branching, the whole method would stop. The `else` is then useless
and only adds noise.

Let's rewrite the method:

```javascript
function isFormValid(inputs) {
  if (inputs.age < 50) {
    if (inputs.gender === 'M' && inputs.firstName !== '' && inputs.lastName !== '') {
      return true;
    } 
    if (inputs.gender === 'F' && inputs.firstName !== '' && inputs.lastName !== '' && inputs.maidenName !== '') {
      return true;
    } 
    return false;
  }

  return true;
}
```

What we have now is a simple test to see if the user is under 50 at the start,
where we then test for the two only passing scenarios and return `false`
otherwise. If above 50, we always return `true`.

We've changed a complex multi-level deep nesting of `if`/`else` into a simple
branching and enumerations of valid cases. This is easier to grasp.

## Return early, return often

But this code is not yet clear enough. I don't like the big `if` surrounding
almost the whole method. What we should do is revert the condition to discard
the edge-cases earlier and leave the bulk of the method to test the common
cases.

```javascript
function isFormValid(inputs) {
  if (inputs.age >= 50) {
    return true;
  }

  if (inputs.gender === 'M' && inputs.firstName !== '' && inputs.lastName !== '') {
    return true;
  } 
  if (inputs.gender === 'F' && inputs.firstName !== '' && inputs.lastName !== '' && inputs.maidenName !== '') {
    return true;
  } 

  return false;
}
```

In the first lines of the method, we check for the easy validations, the one
that can fit in one line and return quickly. This lets our mind quickly discard
all the edge cases, and focus the code on the most common use-cases. This way,
we do not have to mentally keep track of all the pending `if`/`else` the
previous code was creating.

## Shorter conditions

The code is getting more readable already, but there are still code duplication
that we should avoid. We are testing for `inputs.firstName !== '' &&
inputs.lastName !== ''` twice. Let's move that into a carefully named variable.

```javascript
function isFormValid(inputs) {
  if (inputs.age >= 50) {
    return true;
  }
  
  var mandatoryNamesDefined = (inputs.firstName !== '' && inputs.lastName !== '');
  if (inputs.gender === 'M' && mandatoryNamesDefined) {
    return true;
  } 
  if (inputs.gender === 'F' && mandatoryNamesDefined && inputs.maidenName !== '') {
    return true;
  } 
  return false;
}
```

This change has two benefits. First, the `if` reads better in plain english if
you read it in your mind. This will help further contributors (or even you, in
6 months time) understand what the `if` is actually testing.

Second, if in the future you decide that only the `firstName` is mandatory,
you'll only have to change the `var mandatoryNamesDefined` declaration and all
your checks will be impacted.

Extracting this check into a variable was easy. The hardest part is correctly
naming the variable. If you have trouble finding a nice name for your variable,
this might be because you're trying to fit to many checks in one variable. Split
it in several and then combine them.

## One step further

There is still one change we can add. People can only chose a gender of `M` or
`F`, so we can even reverse the way checks are made at the end by using the
_return early, return often_ rule again and inverting the conditions.


```javascript
function isFormValid(inputs) {
  if (inputs.age >= 50) {
    return true;
  }
  
  var mandatoryNamesDefined = (inputs.firstName !== '' && inputs.lastName !== '');
  if (!mandatoryNamesDefined) {
    return false;
  } 

  if (inputs.gender === 'F' && inputs.maidenName === '') {
    return false;
  } 

  return true;
}
```

Now the code reads like a bullet point list, much closer to the original spec:

- If older than 50, the form is valid.
- If firstName and lastName are empty, the form is invalid.
- If you're a woman and haven't filled your maidenName, the form is invalid.
- All other cases are valid.

## Conclusion

Code is like literature. Writing it is really easy, anybody can do it. You just
have to learn the basic syntax and here you go. Writing code that reads well is
harder, and you have to methodically re-read it several times and remove all the
useless parts so the reader mind grasps everything easily.

Think of the next person that will read your code to add a new feature or fix
a bug. That next person might well be you. You don't want to spend more time
understanding the code than actually fixing it. Make your (future) self a favor,
and write code that reads easily.
