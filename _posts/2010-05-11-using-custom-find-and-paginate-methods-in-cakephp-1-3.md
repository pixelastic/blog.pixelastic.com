---
layout: post
title: "Using custom find and paginate methods in cakePHP 1.3"
custom_v2_id: 88
---

For the blog plugin I'm writing I needed a way to fetch only blog posts that
were actually published. I didn't want to write the find conditions every time
I had to make a request so I tried to define a custom find method.

I remember having read something about that a while ago, in a blog or in a
changelog and so I thought it will be quite easy to implement using some cake
automagic.

It was not that easy, I had to override two core methods in my `AppModel`, but
here the result :

## Using custom find methods

I wanted to be able to call my custom method writing
`$this->Post->find('published')` so I created a `__findPublished()` method in
my Post model.

It basically returns a `find('all')` with custom conditions.

I then edited my AppModel file to hook on the default `find()` method :


```php
function find($type, $options = array(), $order = null, $recursive = null) {
  $methodName = '__find'.ucfirst($type);
  // Using default method if not defined
  if (!method_exists($this, $methodName)) {
    // We force default fields and order keys or we could run into trouble for undefined index
    $options = Set::merge(array('fields' => array(), 'order' => array()), $options);
    return parent::find($type, $options, $order, $recursive);
  }
  // Using custom method
  return $this->{$methodName}($options, $order, $recursive);
}
```

(Note that there may still be some issues with this method, especially if the
$type parameter is not a string. I'm always using the `find()` method with a
string as first argument but maybe you're not, or the core still use the old
implementation.)

Anyway, what it does is testing if a `__findSomething()` method is defined,
and if it is it returns its results, otherwise it just delegates to the
default `find()` method.

## Using custom find methods in paginate

So far, so good. But now how do you tell cake to use this custom find when
paginating stuff ? The first part is easy (but required some digging into the
core code). It appears that if the zero key of the `$paginate` var is set to a
string, this will be used as the find type.

One easy way to do this is calling `array_unshift($this->paginate,
'published')` just before the `$this->paginate('Post')` call in the
controller.


```php
// Getting the paginated post list
array_unshift($this->paginate, 'published');
$itemList = $this->paginate($this->model);
$this->set('itemList', $itemList);
```

You'll notice that your custom find method is used for the pagination. What
you may not notice at first sight is that the total count of results is not
correct. Cake still uses the default `find('count')` without using the custom
method.

We will now need to create a `__paginateCountPublished()` method in our `Post
`model that will return the total count of posts to paginate.

Forcing Cake to do what we want is a little trickier this time. We will need
to create a `paginateCount()` method in our `AppModel`. If such a method
exists for a given model, Cake will use it instead of the default
`find('count')` when paginating results. By creating it in the `AppModel `we
make sure that all the paginate counts use it.

This method takes a third argument called $extra which will contain our custom
find name. If set, we will return the custom paginate count. If not set, we
revert to the default way of calculating the total count (copy/pasted from the
core).

So, here the `paginateCount()` method to add to your `AppModel `:


```php
function paginateCount($conditions = array(), $recursive = null, $extra = array()) {
  // If no custom find specified, we return the default count
  if (empty($extra['type'])) {
      $parameters = compact('conditions');
      if ($recursive != $this->recursive) {
          $parameters['recursive'] = $recursive;
      }
      return $this->find('count', array_merge($parameters, $extra));
  }

  // We return the __paginateCountSomething
  $methodName = '__paginateCount'.ucfirst($extra['type']);
  return $this->{$methodName}($conditions, $recursive, $extra);
    }
```

And don't forget to create a` __paginateCountPublished($conditions = array(),
$recursive = null, $extra = array())` method in your `Post `model

## And you're done

You can now do some `$this->Post->find('published')` magic in your controller.
And don't forget the `array_unshift()` tip to use the custom find in a
paginate call, it have to be the first key.

