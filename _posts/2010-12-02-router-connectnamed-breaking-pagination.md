---
layout: post
title: "Using Router::connectNamed without breaking pagination"
custom_v2_id: 247
---

In cakePHP, you can pass all sort of parameters to your urls by following the
`www.domain.com/controllers/view/foo:bar/foo2:baz` syntax.

You could then access `$this->params['foo']` and `$this->params['foo2']` in
your `Controller::view()` method.

#### Using Router::connectName()

This does not play nice with default routing. I mean, if you define a route to
add a vanity url like `www.domain.com/vanity` is routed to
`Controller:view()`, you'll write something like this :

    
    Router::connect('/vanity', array('controller' => 'controllers', 'action' => 'view'));

This will work as long as you don't specify any additional parameters. Once
you started to add any parameters, the Router won't be able to parse your url
and instead of returning `www.domain.com/vanity/foo:bar/foo2:baz` it will
return the default `www.domain.com/controllers/view/foo:bar/foo2:baz`

If you do want your custom parameters to be taken into account by your
`Router` rules, you have to manually add them, using`
Router::connectNamed(array('foo', 'foo2'))`.

#### Custom connectNamed()

I'll let you browse the [connectNamed()](http://api.cakephp.org/class/router
#method-RouterconnectNamed) documentation page for further details on how to
use it properly. But one important thing not to overlook is that if you ever
have to define a custom `Router::connectNamed()`, do not forget to add a
second parameter of `array('default' => true)`, this will allow all your
paginated links to keep working.

