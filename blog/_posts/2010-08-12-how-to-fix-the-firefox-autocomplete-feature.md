---
layout: post
title: "How to fix the Firefox autocomplete 'feature'"
custom_v2_id: 219
tags: password, firefox, feature, autocomplete
---

Firefox can be quite a pain sometimes. I usually praise this browser features
but today I had to deal with one tricky 'intelligent' feature.

You know that autocomplete/autofill feature, so that when you enter your user
name, Firefox automatically fill the corresponding password field so you won't
have to do it ?

Well, it is bad, and here's why.

## How does it work ?

I haven't read the source code, but from what I've experienced it seems to
work like that :

For each password field, FF will find the related username text field. This is
just a very basic search, it assume that the closest previous text field is
the related one. Now, everytime you enter a value in the text field that match
one of the username saved, it will autofill the password field.

Note that if you have more than 5 password fields on a page, the feature will
be disabled.

## What is terribly wrong with this approach

Let's imagine you are a registered user of a website. You want to update your
preferences. You have a nice page with lots of input fields where you can
change your email, password and date of birth.

For security reasons, your password is not displayed. For convenient reasons,
the website also don't ask you to type your password everytime your want to
update your settings. It assumes that if you let the password field blank, it
means that you don't want to change it. And if you really want to change it,
then it asks for a confirmation, to make sure your correctly typed it.

So, with this autocomplete feature, if your email is also your login for the
website (as it is often the case), Firefox will autofill the password field
with your password. Meaning that if you submit your form, you'll be met with
an error because your password and it's confirmation does not match.

You'll then have to manually clear the content of the password field everytime
your want to edit your profile. Which is counter-intuitive. The whole
convenient method of not changing the password if left empty is rendered
useless.

The worst part is that most users won't understand when the error comes and
will blame the webdeveloper.

## Solutions that does not work

First, Firefox is just doing a very wild guess on that fields. And, there is
no way to disable this feature from the page markup. Sure, as a user you can
disable it in your browser setting, but as a web developper, you can't disable
it.

There is a non-standard `autocomplete="off"` argument, but it does not work in
our case. It is supposed to prevent the browser to store previously entered
values on sensible fields (like credit card numbers).

I've tried putting this `autocomplete `attribute on every input field, even on
the form itself. Setting the `value `attribute does not work either. Even
updating the value through Javascript would not work because the password
field will get re-populated on every blur event on the text field.

## A solution that does work

The final solution I've found is to add a dummy password field between your
real mail and password fields. That way, Firefox will autocomplete this dummy
password instead of the real one.

Unfortunatly this adds clutter to your markup, but with a little
`display:none` in CSS it won't ever be seen by your users.