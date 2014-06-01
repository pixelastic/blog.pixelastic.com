---
layout: post
title: "cakePHP wrapper for EmailComponent::send()"
custom_v2_id: 264
---

As I already wrote in a [previous post](/blog/230:displaying-html-mails-sent-
from-cakephp-in-squirrelmail), the cakePHP `EmailComponent `seems to have some
quirks, forcing me to add more code to send an email.

I stumbled upon one more issue today : a `View` poisoning coming from the
`EmailComponent`. Some vars I was passing to my view through the use of a
custom `Helper `were wipe away if I send a mail in the same request.

It took me some time to track it down, but I finally decided that I'll now
wrap calls to `$this->Email->send()` into a `__sendEmail()` custom method
where I'll add my tweaks.

This will help migrating to a newer cake version easier when those bugs will
be fixed.

## Easy debug

Debugging emails is not an easy task, but is greatly eased by cake. One can
set the delivery type to `debug `and the mail will be generated like a normal
mail, but won't be sent. Instead, its content will be saved in `Session`.

My wrapper will allow switching from normal to debug mail thanks to an
argument.

## View cleaning

I'll also clear the `ClassRegistry `from the `View `created by the
`EmailComponent`. The `Email `view is shared with the display view and this
can result in vars being lost or not correctly set. I think all those troubles
are gone in cake 2.0 but I haven't tested it yet.

## The __sendMail method

Here is the method code. You should add it to your AppController :

    
```php
function __sendMail($sendAsDebug = false) {  
  if (empty($this->Email)) {  
    return false;  
  }  
  // Debug mode  
  if (!empty($sendAsDebug)) {  
    $this->Email->delivery = 'debug';  
  }  
  // We force adding the boundaries and header otherwise some webmail (like SquirelMail) won't correctly display them  
  $this->Email->_createboundary();  
  $this->Email->__header[] = 'MIME-Version: 1.0';  
  $this->Email->send();  
  // We display debug info  
  if (!empty($sendAsDebug)) {  
    debug($this->Session->read('Message.email.message'), true);  
  }  
  // We also need to clear the generated view so our display does not get poisoned by the Email display  
  ClassRegistry::removeObject('view');  
}
```

