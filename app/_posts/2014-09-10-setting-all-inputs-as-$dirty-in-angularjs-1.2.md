---
layout: post
title: "Setting all inputs as $dirty in AngularJS 1.2"
tags: angular, $dirty, $valid, validation
---

By design, in Angular, all forms and inputs are `$invalid` by default. They are
also `$pristine`, meaning they haven't been touched. So if you need to display
an error message next to a field, you not only have to check if the field is
`$invalid`, but also if it's `$dirty`.

Now imagine you load your page, containing a form. You have several fields, and
none have any validation rules applied (no `ng-required`, nor `ng-pattern`). At
this stage, you form is `$invalid`, because at least on of its fields is
`$invalid`.

Each field will switch to `$dirty` when a value is typed in it. Switching to
`$dirty` will also trigger validation rules (if any), and updating its
`$valid`/`$invalid` property accordingly. When all fields will become `$valid`,
the parent form will also automatically become `$valid`.

The problem with that is when you want to submit your form without entering
anything in any of the fields. Your form is considered `$invalid`.
You have to manually focus each field and enter a value to make it become
`$valid`.

I haven't found a nice way in Angular to trigger validation rules on all fields
of a form at once, to recalculate its validity. What I've found is that if
I update the `viewValue`, then the field becomes `$dirty` and validation rules
kicks in and can pass my field to `$valid`. So updating the `viewValue` with
itself (thus, not changing anything) becomes a hackish way to trigger
validation.

So I coded the following method. It takes a `$scope` as argument and will loop
through each form in the scope, and trigger each field validation in this form
through the `setViewValue` hack explained above. It will also handle nested
forms.

```javascript
function setAllInputsDirty(scope) {
  _.each(scope, function(value, key) {
    // We skip non-form and non-inputs
    if (!value || value.$dirty === undefined) {
      return;
    }
    // Recursively applying same method on all forms included in the form
    if (value.$addControl) {
      return setAllInputsDirty(value);
    }
    // Setting inputs to $dirty, but re-applying its content in itself
    if (value.$setViewValue) {
      return value.$setViewValue(value.$viewValue);
    }
  });
}
```

Note that it does some weak duck typing to check if an element is a form or an
input by checking for some methods. This will easily break, so be careful.
