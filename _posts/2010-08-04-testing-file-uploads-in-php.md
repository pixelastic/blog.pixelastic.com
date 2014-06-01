---
layout: post
title: "Testing file uploads in PHP"
custom_v2_id: 210
---

I just had to write unit tests for a file upload script I had to write. As it
is not [that easy](http://stackoverflow.com/questions/3402765/how-can-i-write-
tests-for-file-upload-in-php/3410684#3410684) [to do](http://www.foonews.info
/fr-comp-lang-php/10256260-tests-unitaires-formulaire-dupload-de-
fichier.html), I'll share my findings with you.

My problem was on how I was going to simulate a file upload in a test case.
Sure I could simulate a whole post request either using curl of simpleTest
webtester. But that would only give me a full overview of the upload process,
not its inner details.

There was [a way to do that](http://www.mail-
archive.com/internals@lists.php.net/msg35782.html) using
[PHPT](http://qa.php.net/phpt_details.php#post_raw_section), which seems to be
the unit tests used by PHP itself. It is supposed to simulate any kind of
query. Unfortunatly, setting that up seemed a little to complex for me.

## So, how did I do ?

I finally found a way to do that by :

  1. Spoofing the `$_FILES` array and putting arbitrary test data inside
  2. Copying a test file to the `tmp/` directory for testing purpose. Actually the directory does not matter (see 3.)
  3. Wrapping all calls to `move_uploaded_file` and `is_uploaded_file` to its own methods. Those two php methods won't work with dummy upload because they weren't really uploaded through `POST`

So, instead of calling `move_uploaded_file`, I called
`$this->moveUploadedFile()`, and instead of calling `is_uploaded_file()`, I
called `$this->isUploadedFile()`

And when times comes to test my class, I just extends the class, overwrite
those two methods with new one that uses `rename() `and `file_exists()`
instead.`

`

## What does that change ?

The fondamental difference between the former and the latter functions is that
the former checks that the target really was uploaded through POST while the
latter does not care.

It is extremely important that you use the correct upload method because it
provide an additional security check. If you just blindly `rename()` files
specified by your user, you'll ending up putting the `database.php` and
`config.php` files in the webroot renamed as `i_want_to_be_hacked.txt`

The other good news is that by wrapping those methods around those functions,
you can create mock objects and test all the various return scenarios.

