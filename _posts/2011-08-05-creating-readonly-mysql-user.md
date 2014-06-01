---
layout: post
title: "Creating a readonly mysql user"
custom_v2_id: 302
---

I wanted to give access to a database to a colleague, so he can connect and
extract some useful stats from our database.

As I didn't want to give him nor the root, nor my access nor even an access
with writing permission to avoid potential issues, I created a readonly user.

First, connect to the mysql server :

    
    mysql --user=root -p

And type your password when asked

Now that you are in the mysql prompt, create the 'readonly' user and give him
`SELECT `permission on all tables

    
    CREATE USER 'readonly'@'%' IDENTIFIED BY 'your_password';  
    GRANT SELECT ON *.* TO 'readonly'@'%';

Also note that once connected with root, you can see the list of users by
running :

    
    SELECT host,user,pass FROM mysql.user;  
    

Nothing fancy here, everything was found after a few minutes of googling.

Also, if you ever need to delete the user :

    
    DROP USER 'readonly'@'%';

Â

