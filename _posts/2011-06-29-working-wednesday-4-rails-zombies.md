---
layout: post
title: "Working on Wednesday #4 : Rails for Zombies"
custom_v2_id: 294
---

(I finally managed to update Ubuntu to the 10.10 version, configure Unity to
make it more usable, and I'm not ready to start the RoR tutorial I wanted to
start last week.)

I used `vim` this week (instead of `nano`) for very simple file editing. I
will force myself to use only `vim` on wednesday to really learn it. I plan to
completly drop Komodo Edit once I'll be familar enough with vim to gain more
time than I lose.

## Rails for Zombies

Anyway. I finally get to start the Rails for Zombies tutorial. And here is
what I learned.

There are two distinct things I'm going to learn here : Ruby and Rails. I
discovered that I was already familiar with a lot of basic concepts of Rails,
thanks to cakePHP. Model and table convention, model relationships (belongs
to, has many, etc) were exactly the same.

Ruby on the other hand was new. But also very interesting. No need to add `()`
after a method to call it when no args are passed, possibility to chain method
of the same object (much like jQuery) and the use of dynamic (yet strongly
typed) vars.

The first part of the tutorial (basic CRUD) was easy. I didn't find how to
make a complex SQL query like this (cake) one :


```php
$Zombie->find('all', array(
'order' => array('Zombie.graveyard' => 'ASC', 'Zombie.name' => 'DESC'
));
```

I guess it's just a matter of time before I learn how to to do in Rails
anyway. I saw that there was more "advanced" method (much like the cake `find`
method) that would surely allow such finding.

## Part 2 : Validation and Relationships

The second part of the tutorial was more about models. Validation rules were
pretty much the same as those of cakePHP. But the Ruby syntax makes it more
concise.

I couldn't find how to retrieve the validation errors when saving an object
using the `create` method (no problem when manually calling `save`, though).

I enjoyed being able to create binded instances by simply adding the binded
element to the model. Not very clear isn't it ? Here some code to explain it
better. The last two lines have exactly the same effect :


```ruby
class Zombie < ActiveRecord::Base
end
class Weapon < ActiveRecord::Base
belongs_to :zombie
end
Weapon.create(:name => "Rocket Launcher", :zombie_id => 2)
Weapon.create(:name => "Rocket Launcher", :zombie => Zombie.find(2))
```

Later on, I had to select all weapons binded to a specific Zombie. I was able
to find the a specific zombie using any of the two following commands :


```ruby
z = Zombie.where(:name => "Ash").first
z = Zombie.find(:first, :conditions => { :name => "Ash" })
```

Then, I wanted to find the weapons binded to this zombie. First I tried the
following command :


```ruby
Weapon.where(:zombie_id => z.id)
```

Obviously, this worked. But I wanted to test some more of the Rails magic. So
I tried something along the lines of what I did in the previous chapter and
tried to use my `z` var directly instead of `z.id`.


```ruby
Weapon.where(:zombie => z)
```

This didn't worked. Well, I guess I'll also learn why later on. But one even
more weird thing is that the following command did work even I'm not really
sur why ?


```ruby
Weapon.where(:zombie_id => z)
```

That's all I did today (well I also did some more Mercurial and Dingux testing,
but that wasn't really work)



