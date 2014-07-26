---
layout: post
title: "Using cakePHP OpenId plugin on Windows"
custom_v2_id: 171
tags: openid, php, cakephp, windows
---

After all the praises I've read about OpenId, I decided to implement it in
this CMS. My goal was to set an easy way for readers to leave comments without
the need for registering to anything.

I thought it would also be great to add as a secondary, and easiest, mechanism
for logging in.

So I downloaded and installed the openID component by cakebaker. As I'm
running my dev environment under Windows, I had to set some settings.

## Fixing the pluginPath

I've save the OpenId component in a plugin, and it has a clever mechanism to
import the PHP OpenId library based on the folder it is saved.

Unfortunatly, the regexp used to know the name of the current plugin was
throwing errors on Windows, due to the backslashes used in the file path.

I updated the `getPluginName()` method to this new one and it did the trick :


```php
private function getPluginName() {
  $result = array();
  $ds = (Folder::isWindowsPath(__FILE__)) ? '\\\\' : DS;
  if (preg_match('#'.$ds.'plugins'.$ds.'(.*)'.$ds.'controllers#', __FILE__, $result)) {
      return $result[1];
  }

  return false;
  }
```


Basically it makes sure that the backslashes are correctly escaped under
Windows.

Edit : I've sent this patch to the OpenId component author and it is now fixed
in the latest versions.

## Generating randomness

The second fix was to change the `Auth_OpenID_RAND_SOURCE` constant to `null`.
This constant enable the library to generate randomness (AFAIK), by using the
`/dev/urandom`.

This does not exists on Windows, so I added the following lines in my
`bootstrap.php`


```php
if (Folder::isWindowsPath(__FILE__)) {
    define('Auth_OpenID_RAND_SOURCE', null);
}
```

## Connecting to SSL servers

The PHP bundle on Windows comes with `cURL `already builtin, but without the
bundle of the X.509 certificates of public CA. It means that the OpenId PHP
library will refuse to connect to any CA using an SSL connection because it
won't be able to check the certificate.

This does not happens on Linux, the list is correctly built in.

Fortunatly, we can pass a `CURLOPT_CAINFO` option to `cURL` to manually set a
pre-defined bundle, and there already is one shipped with the PHP OpenId
library.

All you have to do is add the following line on line 93 of the
`vendors/Auth/Yadis/ParanoidHTTPFetcher.php` file :

```php
curl_setopt($c, CURLOPT_CAINFO, str_replace('\\', '/', dirname(__FILE__)).'/../OpenID/ca-bundle.crt');
```

