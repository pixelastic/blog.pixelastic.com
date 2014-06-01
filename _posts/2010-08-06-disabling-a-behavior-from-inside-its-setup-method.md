---
layout: post
title: "Disabling a Behavior from inside its setup() method"
custom_v2_id: 215
---

Sometime you write a nice Behavior, that will automate a lot of stuff that
almost all your models will need. But, unfortunatly, a couple of models won't
need it. Actually, attaching it to them will even break your code.

So what do you do ? Do you resort to manually fill the `$actsAs` variable of
each model, except for the two lonely loosers, or defining the `$actsAs` of
your main `AppModel `really seems more appaling ?

#### Lazyness to the rescue

If, like me, you prefer writing less code, you'd probably go with the
`AppModel` approach. All you have to do is define a `setup()` method in your
Behavior and check if it is applied to the right or wrong type of model.
Fortunatly for us, the `$model` is passed as first argument.

Once you've identified the faulty models, you just have to disable the
behavior for them. The `BehaviorCollection `that comes bundle into
`$model->Behaviors` has a nice couple of `enable`/`disable` methods.
Unfortunatly, they won't work from inside the `setup()` method because the
Behavior is not yet correctly instanciated.

What you can do, however, is to hack inside the `BehaviorCollection `to update
the inner `_disabled` key to add your own Behavior to the list.

    
    function setup(&$model, $config = array()) {  
            [...]  
    	if ($faultyModel) {  
    	        $model->Behaviors->_disabled[] = 'MyBehavior';  
    	}  
    }  
    

This is more than a bit hacky, I have to admit that. But it does the trick.
Enjoy.

