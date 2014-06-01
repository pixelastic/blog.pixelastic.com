---
layout: post
title: "Integration of a bbPress forum into a cakePHP application (part 2)"
custom_v2_id: 47
---

We've done enough work on the forum for now. The time has come to edit our
cake files.

#### Creating the cakePHP models

We will create two models to help in speaking with the bbPress database.

Create a bb_usermeta.php model :

    
    class BbUsermeta extends AppModel {  
    	var $useTable = 'bb_usermeta';  
    	var $primaryKey = 'umeta_id';  
    }

Create a `bb_user.php` model :

    
    class BbUser extends AppModel {  
    	var $primaryKey = 'ID';  
      
    	var $hasMany = array(  
    		 'BbUsermeta' => array(  
    			 'className' => 'BbUsermeta',  
    			 'foreignKey' => 'user_id',  
    			 'dependent' => true  
    		)  
    	 );  
      
    	//We make sure, before saving, that the nicename is url-friendly  
    	function beforeSave() {  
    		if (!empty($this->data[$this->name]['user_nicename'])) {  
    			$this->data[$this->name]['user_nicename'] = Inflector::slug($this->data[$this->name]['user_nicename']);  
    		}  
    		return true;  
    	}  
      
    }

So, what was that about ?

We created two models to communicate with bbPress. bbPress stores user-related
information in `bb_users` as well as `bb_usermeta`. We defined the
`$primaryKey`, `$useTable` and `$foreignKey` of the `$hasMany` because the
bbPress tables do not follow the cakePHP convention.

We also add a nifty `beforeSave()` method to `BbUser `to make sure its
`user_nicename` (used as an url slug) is url-friendly.

#### How to save bbPress users from the cakePHP app

Great. Now you can easily add, edit and delete users from bbPress directly
from your app.

There are some things you should know about before doing that :

  * `first_name` and `last_name` are stored in `bb_usermeta`
  * the access rights are defined in `bb_usermeta` too, using the `bb_capabilities` key

Now that you know all that, you can easily create a behavior creating a new
bbPress user when creating a new user, deleting that bbPress user when
deleting the main user and updating the bbPress user when updating the main
user.

I myself wrote this behavior, but as it is part of a more general bbPress
plugin it may not work as-is. I'll try to publish it if anyone is interested.

