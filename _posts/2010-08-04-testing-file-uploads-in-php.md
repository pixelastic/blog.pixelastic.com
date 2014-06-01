---
layout: post
title: "Testing file uploads in PHP"
custom_v2_id: 210
---

<p>I just had to write unit tests for a file upload script I had to write. As it is not <a title="The question I asked on Stack Overflow" href="http://stackoverflow.com/questions/3402765/how-can-i-write-tests-for-file-upload-in-php/3410684#3410684" target="_blank">that easy</a> <a title="Same question asked in french on an old topic" href="http://www.foonews.info/fr-comp-lang-php/10256260-tests-unitaires-formulaire-dupload-de-fichier.html" target="_blank">to do</a>, I'll share my findings with you.</p>
<p>My problem was on how I was going to simulate a file upload in a test case. Sure I could simulate a whole post request either using curl of simpleTest webtester. But that would only give me a full overview of the upload process, not its inner details.</p>
<p>There was <a title="Using PHPT to do that" href="http://www.mail-archive.com/internals@lists.php.net/msg35782.html" target="_blank">a way to do that</a> using <a title="PHPT" href="http://qa.php.net/phpt_details.php#post_raw_section" target="_blank">PHPT</a>, which seems to be the unit tests used by PHP itself. It is supposed to simulate any kind of query. Unfortunatly, setting that up seemed a little to complex for me.</p>
<h4>So, how did I do ?</h4>
<p>I finally found a way to do that by :</p>
<ol>
<li>Spoofing the <code>$_FILES</code> array and putting arbitrary test data inside</li>
<li>Copying a test file to the <code>tmp/</code> directory for testing purpose. Actually the directory does not matter (see 3.)</li>
<li>Wrapping all calls to <code>move_uploaded_file</code> and <code>is_uploaded_file</code> to its own methods. Those two php methods won't work with dummy upload because they weren't really uploaded through <code>POST</code></li>
</ol>
<p>So, instead of calling <code>move_uploaded_file</code>, I called <code>$this-&gt;moveUploadedFile()</code>, and instead of calling <code>is_uploaded_file()</code>, I called <code>$this-&gt;isUploadedFile()</code></p>
<p>And when times comes to test my class, I just extends the class, overwrite those two methods with new one that uses <code>rename() </code>and <code>file_exists()</code> instead.<code><br /></code></p>
<h4>What does that change ?</h4>
<p>The fondamental difference between the former and the latter functions is that the former checks that the target really was uploaded through POST while the latter does not care.</p>
<p>It is extremely important that you use the correct upload method because it provide an additional security check. If you just blindly <code>rename()</code> files specified by your user, you'll ending up putting the <code>database.php</code> and <code>config.php</code> files in the webroot renamed as <code>i_want_to_be_hacked.txt</code></p>
<p>The other good news is that by wrapping those methods around those functions, you can create mock objects and test all the various return scenarios.</p>