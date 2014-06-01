---
layout: post
title: "Improved form spam protection"
custom_v2_id: 186
---

<p>My spam protection is really simple. Most spam bots will fill all input fields they'll find in a form. If one is named website or email, they will most certainly want to fill them first.</p>
<p>So I've added to every form a fake input field with a <code>name="email" </code>that have to stay empty. I also labeled it "Spam bait" and displayed a little sentence to tell my human readers to keep this field empty.</p>
<p>I also hide the whole field using Javascript because most of the bots don't have Javascript enabled, but legitimate users do.</p>
<h4>Does it work ?</h4>
<p>To say the truth I don't know. In the previous version of this website I haven't any kind of spam protection and was receinving almost a dozen spam mails a day.</p>
<p>Now that I've added this protection, I don't receive spam anymore. But that doesn't mean my protection is working, it may just mean that the spam bots needs a little time to adjust to the new website.</p>
<h4>Improving the existing</h4>
<p>One week ago, two spam comments managed to get past my protection. I have currently no way to judge my protection efficiency. Maybe that was the only two spam comments aimed at my website and I let them both slip in. Maybe I was under a mass attack and managed to block thousand of spam and those two were the only two to beat me.</p>
<p>I don't know, I have absolutly no numbers on that.</p>
<h4>Getting some stats</h4>
<p>So today, I decided to add some extra measures. I'm keeping count of every spam I block (this number will be displayed below the comment list if at least one spam was blocked).</p>
<p>I'll also log some informations when someone is posting a comment : headers sent, if javascript is enabled and the delay between displaying the form and submitting it.</p>
<p>It is useless to build protection if you don't know what you want to be protected against. So I'll let the actual protection in place and will come back to check the numbers in a couple of weeks.</p>
<p>I'll then know exactly how performs my existing spam protection and will be able to extract spam patterns from the information I'll gather.</p>
<p>I think I'll add a timing system, to block comments that were posted too fast. If nothing works I'll use Akismet, but I want to try to defeat them on my own first.</p>