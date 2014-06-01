---
layout: post
title: "Quick overview of the Prestashop admin panel"
custom_v2_id: 54
---

One of my client wants to move an old osCommerce site to a new platform.
osCommerce is really an old system, it does not handle plugins (you have to
hack the core to add functionnality), has tablefull implementation and all the
html and php code is mixed up.

I decided to move it to Prestashop. Why Prestashop ? Well, obviously because
there is not that much choice on the e-commerce open source website scene
nowadays. The only other choice would have been Magento and from what I heard
it is quite a pain to install and make it running.

For this project, I need to act very quickly and the new website should be up
and running in a matter of weeks. I'll use either a free theme or buy one
online, but I won't have time to involve a full design process in this. I'll
also have to migrate the complete product, customer and image database from
one system to the other.

That won't be an easy task but... well... I have to do it.

Anyway, before starting this whole progress I wanted to see what Prestashop
really had to offer me. I read their full feature list and hell, I even went
to there open presentation, here in Paris, when the v1.0 was realeased but
from what I've seen it was a lot of talk, a lot of features a lot of
everything but very little attention to the details.

Well, after testing the demo admin panel a little bit I can say that my first
impression was correct. Prestashop seems to be able to do a lot of stuff,
really. But the way it is presented to the user is far from optimal. There are
a lot of little mistakes that make using the interface more difficult that it
should be.

For example they are using icons to illustrate almost any action or link. But
sometimes the icons do not have ANY link to the action. The icon for the
"tags" section is a dark cloud, the icon for the search engines is a key is an
arrow, they use the same icons for very different actions (editing a tab and
paying with cheque). An icon is supposed to convey in a rapid and easy visual
way what is text is about, but for Prestashop it is more like "What is that
supposed to mean ?"

SEO-friendly url are achieved through the use of .htaccess. Normal would you
think ? Well yep, usually. But Prestashop does that by generating a huge
.htaccess (one line for each product) and mapping each product individually.
I'm not really sure, and haven't run benchmarks on this but I guess it forces
the server to parse the .htaccess file for each request and redirect to the
correct page. It smells like a huge performance bottleneck for me, especially
with a website using i18n and multiples urls.

I would have saved the "slug" of each product (in multiple languages if
needed) in the database and accessed products only based on their id. Of
course, I would have hooked every methods that is supposed to write an html
link or any url to a special method that would create the correct url based on
the id, slug and language.

They also use a default implementation of tinyMCE with a lot of useless
options (like layers, html table, etc). They also have kept the default
"insert image" implementation, asking for the image url instead of hooking a
custom image upload script, much more useful.

I'll have to use that admin panel anyway. I just hop that I do not
underestimate the time needed to move the shop to this platform.

