---
layout: post
title: "cakePHP testing tip : Creating or edit a datasource on the fly"
custom_v2_id: 192
---

For one of the tests I'm currently writing, I needed to assert that my method
was correctly returning an error if the connection to the database was
impossible.

I couldn't find an easy way to change datasource credentials once the app was
initiated, so I decided to manually update the `ConnectionManager` inner
values.

Here's how I did it :

    
```php
// Getting the datasource cache in the ConnectionManager object  
$connectionManagerInstance = ConnectionManager::getInstance();  
$databaseConfig = &$connectionManagerInstance->_dataSources;  

// Saving the initial setting for reverting it later  
$_defaultConfig = $databaseConfig['default'];  
  
// Changing the password so the credentials will fail  
$databaseConfig['default']->config['password'].= 'pass';  
  
// Getting the updated datasource  
$connect = ConnectionManager::getDataSource('default');  
  
// Error handling when connection unavailable  
[...]  
  
// And reverting the settings back  
$databaseConfig['default'] = $_defaultConfig;  
```
    

This proved really useful when testing to simulate a database server error.

