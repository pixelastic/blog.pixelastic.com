---
layout: post
title: "Correctly instanciating models in components"
custom_v2_id: 216
tags: behaviors, cakephp, classregistry, php, setup
---

I sometime need access to a specific model in a component. Say a `User `model
for checking user rights in an `Auth `component. In that cases, I just create
an instance of the model by calling a `$myModel =
&ClassRegistry::init($myModelName)`. It works perfectly.

Today I found that it wasn't working exactly as I wanted. In fact, behaviors
used by models loaded that way are not completely set up. All their callback
methods (`beforeFind`, `afterFind`, `beforeSave`, `afterSave`) works as
expected, but the main `setup` method is never called.

This caused some havoc in my app because some **reaaaaally **important stuff
was defined in the `setup` method

## There I fixed it

I just manually fired all the `setup` methods by calling a simple :


```php
foreach($myModel->Behaviors->_attached as $behaviorName) {
  $myModel->Behaviors->{$behaviorName}->setup($myModel);
}
```


Once again, small fix, but does the trick. I did not file a bug report because
I'm not really sure this is bug or if that is so by design.
