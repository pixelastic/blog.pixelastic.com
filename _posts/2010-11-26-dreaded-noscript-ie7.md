---
layout: post
title: "The dreaded <noscript> on IE7"
custom_v2_id: 246
---

This `<noscript>` tag on IE7 is making me crazy. Here are some "interesting"
facts about it :

## No content through Javascript

You can't get its content though javascript. It can be targeted but neither
`.innerHTML` nor `.textContent` is set. It does not have any `.childNodes`
either.

## Gets displayed even when scripts are enabled

If you set `noscript { display:block; border:15px solid red;},` it will get
displayed even if Javascript is enabled. But with no content inside, you'll
only have borders and background...

## Styling it anyway

If you want to style it, just add an inner element and style this one :

    
    <noscript><p>Lorem ipsum</p></noscript>
    
    noscript p { background:blue; }

## Disabling Javascript on IE7

If you want to disable Javascript on IE7, you'll have to go to Tools >
Internet Options > Security > Custom and setting the "Enable ASP scripts" to
No.

Yes, this doesn't make any sense.

  

