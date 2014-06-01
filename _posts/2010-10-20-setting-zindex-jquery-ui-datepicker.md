---
layout: post
title: "Setting the z-index of a jQuery UI datepicker"
custom_v2_id: 234
---

I ran into a collision issue with two of my absolutly positionned elements on
a form page. I had an invisible flash buttun (used to launch an upload
process) as well as jQuery UI datepicker.

The form was built in a way that when the datepicker was displayed, it was
supposed to be on top of the invisible Flash button. Unfortunatly the button
was in fact "on top" of the datepicker, but being invisible you do not notice
it until you click.

This resulted in an upload dialog popping up and many confused users.

## The fix

The Flash `z-index` is fixed in my CSS (10), so I thought that adding a
greater `z-index` to the jQuery UI datepicker in CSS would be enough.

It is not. The jQuery UI datepicker seems to automatically set the `z-index`
to 1, whatever you specified.

I checked the [datepicker options](http://jqueryui.com/demos/datepicker/),
looking for a `zIndex` key, but found nothing...

I tried the `beforeShow `event, to manually set the `z-index`, but it seems
that jQuery still update my value to 1 AFTER the event.

So I finally resorted to adding a small timeout to re-add my value after
jQuery. This is a bit of a hack but given the context this is the only way I
found.

    
    // Set the datepicker zIndex on load  
    element.datepicker({  
    [...]  
    	'beforeShow': function(input, datepicker) {  
    		setTimeout(function() {  
    			$(datepicker.dpDiv).css('zIndex', 100);  
    		}, 500);  
    	},  
    [...]  
    });  
    

Â

