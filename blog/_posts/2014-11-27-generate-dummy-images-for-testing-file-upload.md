---
layout: post
title: "Generate dummy images for testing file upload"
tags: convert, exiftool, upload
---

Today, I needed to test a file upload mechanism, and needed a bunch of
different files, to be able to test that the max file size, max/min file
dimensions and image type where correctly checked.

I asked my good friend the command line and came up with the following command
to generate the needed files.

```sh
$ dd if=/dev/urandom of=1mo.binary count=1024 bs=1024
1024+0 records in
1024+0 records out
1048576 bytes (1,0 MB) copied, 0,0684895 s, 15,3 MB/s
$ ls
total 1,1M
-rw-r--r-- 1 tca tca 1,0M nov.  27 12:00 1mo.binary
```

This created a `1mo.binary` binary file of exactly 1Mo. That can be useful
if you simply need to test size limits. But I also needed my files to be valid
jpg files. So I used `convert`.

```sh
$ convert -size 640x640 xc:blue 640.jpg
$ ls
total 12K
-rw-r--r-- 1 tca tca 2,7K nov.  27 12:04 640.jpg
```

This created a valid blue jpg file of 600x600 px. But the file size was way to
small, and I simply needed to have bigger filesize but not bigger file
dimensions.  Best way to do it was to add crappy metadata that will simply adds
to the filesize. So I used `/dev/urandom` again to get random data.

```sh
$ cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 1048576 | head -n 1 > 1mo.txt
$ ls
total 1,1M
-rw-r--r-- 1 tca tca 1,1M nov.  27 12:04 1mo.txt
-rw-r--r-- 1 tca tca 2,7K nov.  27 12:04 640.jpg
```

This generated a `1mo.txt` file of random alphanumeric garbage. You can
change the `fold -w` value to increase the size of the generated file. Next
step was to feed this value to our jpg file.

```sh
$ exiftool 640.jpg -comment\<=1mo.txt
$ ls
total 2,1M
-rw-r--r-- 1 tca tca 1,1M nov.  27 12:04 1mo.txt
-rw-r--r-- 1 tca tca 1,1M nov.  27 12:05 640.jpg
```

This updated the `640.jpg` file by adding the content of `1mo.txt` into the
`comment` metadata. You need to use the `<=` syntax to feed it the content of
the file because your shell might not like having a 1Mo argument. Also, you
need to escape the `<` or your shell will try to interpret it.

Now you're ready to generate jpg files of any dimensions and any filesize.





