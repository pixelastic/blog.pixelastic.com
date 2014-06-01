---
layout: post
title: "Paginated search results and custom url"
custom_v2_id: 170
---

I wanted for this blog a search feature, but I had some prerequisites for it :

  * The search url could be bookmarked
  * It should be paginated
  * It should play well with my custom url starting with /blog

## Defining custom urls

Here are the two routes I defined in my routes.php

    
```php
Router::connect('/blog/search/:keyword',  
    array('controller' => 'posts', 'action' => 'search'),  
    array(  
        'pass' => array('keyword'),  
        'keyword' => '[^/]+'  
    )  
);  
Router::connect('/blog/search/*', array('controller' => 'posts', 'action' => 'search'));  
```

Going to` /blog/search/*keyword*` will start a search on the keyword, while
going to `/blog/search/ `would display a search form.

## Writing the method

I started by creating a `search `action in my `PostController`, then creating
a form submitting to this action, with a `keyword `input field.

In the `search `method, the first thing I do is checking if some POST data is
submitted (coming from the search form). If so, I redirect to the same page,
but passing the `keyword `as first parameter.

If no `keyword `is passed nor data submitted, I'll display a simple search
form.

And finally if a `keyword `is specified, I'll do a paginated search on every
posts whose `name `or `text `contains the `keyword`.

    
```php
function search() {  
  // We redirect to get it in GET mode  
  if (!empty($this->data)) {  
    return $this->redirect(array('keyword' => urlencode($this->data['Post']['keyword'])));  
  }  

  // Search index  
  if (empty($keyword)) {  
    return $this->render('search_index');  
  }  
  
  // Adding conditions to name and text  
  $keyword = urldecode($keyword);  
  $this->paginate = Set::merge(  
    $this->paginate,  
    array(  
      'conditions' => array(  
        'AND' => array(  
          'OR' => array(  
            'Post.name LIKE' => '%'.$keyword.'%',  
            'Post.text LIKE' => '%'.$keyword.'%'  
          )  
        )  
      )  
    )  
  );  
  // Getting paginated result  
  $itemList = $this->paginate();  
  
  $this->set(array(  
    'keyword' => $keyword,  
    'itemList' => $itemList  
  ));  
}  
```
    


