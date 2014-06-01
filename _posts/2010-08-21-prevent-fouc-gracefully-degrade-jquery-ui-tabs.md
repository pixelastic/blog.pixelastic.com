---
layout: post
title: "How to prevent a FOUC but still gracefully degrade the jQuery UI tabs"
custom_v2_id: 223
---

I finally managed to fix something that was bugging me for a very long time.
I'm talking about the jQuery UI tabs.

They are pretty useful actually, but I always hated that FOUC they produce.
For one split second, you'll see all your tabs content, then they'll be neatly
re-arranged in tabs.

What I want are my tabs displayed correctly right away, on first load.

## First, the markup

Here's a typical tabs markup :

    
    <div class="tabs">  
        <ul>  
            <li><a href="#firstTab">First tab</a></li>  
            <li><a href="#secondTab">Second tab</a></li>  
        </ul>  
      
        <div class="tabPanel" id="firstTab">  
            First tab content  
        </div>  
          
        <div class="tabPanel" id="secondTab">  
            Second tab content  
        </div>  
    </div>  
    

## CSS to hide all tabs if Javascript is disabled

If your Javascript is disabled, so will jQuery UI. We will then hide the
`<ul>` because it serves no purpose here. We will only show it if js is
enabled

    
    .tabs ul { display:none; }  
    .js .tabs ul { display:block; }  
    

## Applying jQuery UI tabs

By doing a` $('.tabs').tabs();` jQuery UI will treat your `<ul>` as your tab
menu and all your `.tabPanel` as their corresponding contents. It will hide
all your panels, except for the first one. It does so by adding a` .ui-tabs-
panel` class to every `.tabPanel` as well as a `.ui-tabs-hide` to every panel
it hides.

Right now, you should add another CSS rule to hide the unused panels :

    
    .ui-tabs-hide { display: none; }  
    

But if you look at your page now, you'll see all your tabs content before they
get hidden. That is the FOUC I was talking about. The jQuery UI documentation
indicate that to remove it, you should directly add the `.ui-tabs-hide` class
to panels you'll want to hide.

As also pointed in the doc, it will not gracefully degrade because users
without Javascript won't even be able to see your other tabs. Also, it asks
you to add server-side logic (HTML markup with jQuery specific classes) for
something that should be handled entirely client-side.

## Removing the FOUC while gracefully degrade

Ok, so what I did was writing two simple rules that will directly hide all
unused panels while still displaying the active one, even before jQuery UI
takes action.

    
    .js .tabPanel + .tabPanel { display:none;}  
    

That way, no FOUC, and users without Javascript still see all the content.
Unfortunatly, if you now try clicking on your tabs, you'll see that nothing
happens and you get stuck with your default panel always visible.

## Fixing the jQuery UI tabs

As jQuery will add new classes to my elements, I'll just have to write more
specific rules that use those classes. Here's the little piece of logic I came
up with :

    
    .js .tabPanel.ui-tabs-panel { display:block;}  
    .js .tabPanel.ui-tabs-panel.ui-tabs-hide { display:none;}  
    

All the jQuery panels are shown, except for the one hidden by jQuery. All
those rules being more and more specific, they will get applied once the tabs
are activated but still override the previous `display:` declarations.

## Conclusion

This is how I fixed an issue that was bugging me for years. Unfortunatly the
CSS rules being dependent on the markup used, I haven't yet been able to write
them in a global form that could be added to the main jQuery UI css files.

  *[FOUC]: Flash Of Unstyled Content

