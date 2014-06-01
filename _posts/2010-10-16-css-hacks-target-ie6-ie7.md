---
layout: post
title: "Some CSS hacks to target IE6 and IE7"
custom_v2_id: 232
---

After stopping using ugly IE hacks and moving to conditionnal comments to load
a special IE stylesheet, I now use conditional comments to mark my body
element with classes reflecting the current IE version.

    
    <!--[if IE 6]><body class="ie ie6 ie-lt8 ie-lt9"><![endif]-->  
    <!--[if IE 7]><body class="ie ie7 ie-lt8 ie-lt9"><![endif]-->  
    <!--[if IE 8]><body class="ie ie8 ie-lt9"><![endif]-->  
    <!--[if IE 9]><body class="ie ie9"><![endif]-->  
    <!--[if !IE]><!--><body class="nie"><!--<![endif]-->  
    

This saves me a lot of trouble : less files to manage and easier fixes to
write. I quite happy with this solution and have tested it accross several
projects for the past 3 months. It works really well.

I had to work on a legacy project last week, where this technique wasn't
implemented but all the css code was still compressed using CSSTidy. And I ran
into a couple of issues.

#### CSSTidy messes the star and underscore hacks

Using the brilliant `_property` and `*property` hacks to target IE6 and IE7
does not work in conjunction with CSSTidy.

For the `_property hack`, the property is kept as-is, with the underscore, but
as they are alphabetically arranged, the `_background` gets added before the
`background`, rendering it absolutly useless.

On the other hand, on the `*property`, the `*` gets removed, and the value is
merged with the original value of the correct property. Useless too.

#### Other solutions that worked

To avoid digging into CSSTidy one more time, I tried to find other ways to
achieve the same effect.

To target IE6 I used the `!ie6` hack by writing `.mySelector { property:value
!ie6; }`. IE6 is dumb enough to understand any `!blahblah` as `!important`.

I could have also used the fact that IE6 understands `.class1.class2` as
`.class2`, and could have written `.ie6.mySelector { property:value; }` (of
course, you have absolutly no `class="ie6"` in your code)

To target IE7 I made a custom selector that its parsing engine is the only one
to understand : `*:first-child + html .mySelector { property:value; }`

Â

