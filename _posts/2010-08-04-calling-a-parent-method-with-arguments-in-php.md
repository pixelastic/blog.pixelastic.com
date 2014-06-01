---
layout: post
title: "Calling a parent method with arguments in PHP"
custom_v2_id: 211
---

For testing purpose I just needed to overwrite an existing class to add some
more logic to some methods before returning a call to its parent method.

I needed to do that in a test case to save in an inner variable the result so
I can clean up my mess after each test ran.

The key is calling `call_user_func_array` with the right syntax. It seems that
some version of PHP prior to 5.3 choke (like in segmentation fault) if an
alternate syntax is given.

Here is what worked for me :

    
    class TestDocument extends Document {  
        function foo() {  
            return $this->fooResult= call_user_func_array(array('parent', 'foo'), func_get_args());  
        }  
    }  
    


