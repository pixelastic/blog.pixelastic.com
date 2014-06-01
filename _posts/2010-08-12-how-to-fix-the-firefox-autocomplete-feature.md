---
layout: post
title: "How to fix the Firefox autocomplete 'feature'"
custom_v2_id: 219
---

<p>Firefox can be quite a pain sometimes. I usually praise this browser features but today I had to deal with one tricky 'intelligent' feature.</p>
<p>You know that autocomplete/autofill feature, so that when you enter your user name, Firefox automatically fill the corresponding password field so you won't have to do it ?</p>
<p>Well, it is bad, and here's why.</p>
<h4>How does it work ?</h4>
<p>I haven't read the source code, but from what I've experienced it seems to work like that :</p>
<p>For each password field, FF will find the related username text field. This is just a very basic search, it assume that the closest previous text field is the related one. Now, everytime you enter a value in the text field that match one of the username saved, it will autofill the password field.</p>
<p>Note that if you have more than 5 password fields on a page, the feature will be disabled.</p>
<h4>What is terribly wrong with this approach</h4>
<p>Let's imagine you are a registered user of a website. You want to update your preferences. You have a nice page with lots of input fields where you can change your email, password and date of birth.</p>
<p>For security reasons, your password is not displayed. For convenient reasons, the website also don't ask you to type your password everytime your want to update your settings. It assumes that if you let the password field blank, it means that you don't want to change it. And if you really want to change it, then it asks for a confirmation, to make sure your correctly typed it.</p>
<p>So, with this autocomplete feature, if your email is also your login for the website (as it is often the case), Firefox will autofill the password field with your password. Meaning that if you submit your form, you'll be met with an error because your password and it's confirmation does not match.</p>
<p>You'll then have to manually clear the content of the password field everytime your want to edit your profile. Which is counter-intuitive. The whole convenient method of not changing the password if left empty is rendered useless.</p>
<p>The worst part is that most users won't understand when the error comes and will blame the webdeveloper.</p>
<h4>Solutions that does not work</h4>
<p>First, Firefox is just doing a very wild guess on that fields. And, there is no way to disable this feature from the page markup. Sure, as a user you can disable it in your browser setting, but as a web developper, you can't disable it.</p>
<p>There is a non-standard <code>autocomplete="off"</code> argument, but it does not work in our case. It is supposed to prevent the browser to store previously entered values on sensible fields (like credit card numbers).</p>
<p>I've tried putting this <code>autocomplete </code>attribute on every input field, even on the form itself. Setting the <code>value </code>attribute does not work either. Even updating the value through Javascript would not work because the password field will get re-populated on every blur event on the text field.</p>
<h4>A solution that does work</h4>
<p>The final solution I've found is to add a dummy password field between your real mail and password fields. That way, Firefox will autocomplete this dummy password instead of the real one.</p>
<p>Unfortunatly this adds clutter to your markup, but with a little <code>display:none</code> in CSS it won't ever be seen by your users.</p>