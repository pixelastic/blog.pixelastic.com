---
layout: post
title: "Using a fixture with a model using $useTable in cakePHP"
custom_v2_id: 193
---

It seems that if you're creating a fixture for a model that uses an
unconventional table name, the `CakeTestFixture `does not manage to correctly
create the needed table when your test starts.

In fact, it will try to insert the fixture records into the right table (the
one defined in `$useTable`), but won't have created the table beforehand.

In fact this is because it will correctly rely on the model `$useTable`
property when inserting records but will try to guess the table name based on
the model name when creating the table.

Anyway, the quick fix I've found so far is to define the `$table` property of
your fixture to match your model `$useTable`.

    
```php
class Client extends Model {  
  var $useTable = 'users';  
}  

class ClientFixture extends CakeTestFixture {  
  var $table= 'users';  
}  
```
    

I've filed a bug report as well as suggested a fix to allow cake to
automatically use the correct table.

