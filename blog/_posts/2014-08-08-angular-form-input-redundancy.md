---
layout: post
title: "Angular form input redundancy"
tags: angular, html
---

I love angular for the simplicity offered by the two-way binding between form
inputs and displayed values. It also has pretty good mechanisms for validating
and sanitizing data.

But I hate angular for how it treats the HTML markup as a second class citizen.
You have to pollute your markup with all sorts of attributes, and it ends up
with a great deal more logic than it should.

Angular is good for making complex forms, so you'll write quite a bit of them.
You'll end up with some very long views, with a great deal of redundancy. This
is not DRY at all, and it leaves a bad taste in my mouth.

Let's take a sample form :

```html
<form name="subscription" novalidate>
  <label for="firstName">
  <input type="text" name="firstName" id="firstName" ng-model="firstName" ng-required>

  <label for="lastName">
  <input type="text" name="lastName" id="lastName" ng-model="lastName">

  <button type="submit">Submit</button>
</form>
```

### Give them a name

Every input field should have a `name` attribute. Otherwise you won't know
which input holds which value once submitted to your backend. Even if you're
not submitting the form in the usual web 1.0 way but using
fancy-ajaxy-asynchronous-SPA mechanisms, you're still basically sending a list
of key/value to your backend.

### Adding some validation

Let's say I need the `firstName` to be required. Good thing I'm using Angular,
I only have to add the `ng-required` attribute and I'm done.

Well... not quite. You'll also have to add a `novalidate` to the parent `form`
otherwise the browser default validation mechanism might interfere.

You'll also need to add a `name` to the `form`. And make sure that neither the
form `name` nor the input `name` include any dash (`-`), otherwise it might
silently fail.

### So what about accessibility ?

For accessibility reasons, you have to bind your labels to the corresponding
`input` elements. For `radio` and `checkbox` element you can get away with
wrapping the actual `input` inside the `label`, but for text element the `for`
attribute on the `label` must be used.

The value of the `for` on the label must be equal to the value of the `id` on
the input. That's too bad we have to use an `id`, it would have been so much
easier if we could simply reuse the `name` field. But no, let's repeat
ourselves and add an `id` field.

### How do I access my data ?

Now that you have a form and Angular, you'll want to access the data right
? There are two ways you can access data from your form in your Controller.

If you give a name to a form, you can access it in the scope simply by
referencing it by name. In our example, you now have access to
`$scope.subscription` on the Controller. I don't really like Angular defining
objects in my `$scope` from something defined in the view. It might overwrite
another object with the same name I defined in my controller.

Anyway, you can then access informations about the form from this object. It
contains keys for each input fields (using their `name` attribute), which in
turn holds informations about their validation (`$valid`, `$invalid`, `$dirty`,
`$pristine`) and the value it holds (`$modelValue` and `$viewValue`).

I don't really like tapping into this object either as it seems too low level
into Angular own plumbing system.

The other way, the recommended one, is to manually define with which value each
input is bound, using the `ng-model` attribute. You'll usually re-use the same
name you already used for `name` and `id` (unless you want to be really
confusing).

### Copy/Paste nightmare

As you've seen, this absolutely does not follow the DRY principle. Angular,
contrary to Ember, is not a Convention over Configuration framework, and we can
clearly see this weakness here. 

This gets worse when you have to add new fields
to your form. You won't rewrite them from scratch, so you'll use copy/paste and
expose yourself to errors. If you forgot to change one `name`, `id` or
`ng-model` you might create weird bugs, hard to find, because their root cause
is inside your 300 lines long view file.

### A solution ?

I haven't found a satisfying solution to this problem as of today. The only one
I can think of could be a macro in your IDE to auto-generate input fields with
the right name written in `name`, `id` and `ng-model`. But this is hardly
a portable solution. The other one would be to create a metadirective that
automatically adds the correct value in the correct attribute. But writing
directives that adds other directives is complex and I'm not sure if it will
not simply hide the complexity away and make it even harder to debug.



