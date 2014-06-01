---
layout: post
title: "Displaying a date in the correct locale with cakePHP"
custom_v2_id: 190
---

<p>The easiest way to display a date in a given format is to use a combination of <code>strftime()</code> and <code>strtotime()</code>.</p>
<p>Sometimes, you also need your date to be displayed in a specific language. For example, for a french website, I needed a date to be displayed as "<em>mardi 03 août 2010</em>" instead of "<em>Wednesday, August 3rd</em>".</p>
<h4>Setting the locale</h4>
<p>To achieve that, you just have to tell PHP which locale to use when displaying date with <code>setlocale(LC_TIME, $locale)</code>.</p>
<p>The value of <code>$locale</code> is OS dependent, though. For example, on a linux server, you have to set <code>fr_FR</code> while it is <code>fr</code> or even <code>french </code>on Windows.</p>
<p>Fortunatly, you can pass an array of locales to <code>setlocale</code>(, and the system will use the first one it can find. You just have to pass an array containing all possible values and you'll be good to go.</p>
<p>I wrote a little method that use the <code>L10n </code>object that comes with cakePHP to automate the creation of such an array. Just feed him a 3-letter language code and it will return an array of the most common locale names.</p>
<pre><code lang="php">function getLocales($lang) {<br />	// Loading the L10n object<br />	App::import('L10n');<br />	$l10n = new L10n();<br /><br />	// Iso2 lang code<br />	$iso2 = $l10n-&gt;map($lang);<br />	$catalog = $l10n-&gt;catalog($lang);<br /><br />	$locales = array(<br />		$iso2.'_'.strtoupper($iso2).'.'.strtoupper(str_replace('-', '', $catalog['charset'])),    // fr_FR.UTF8<br />		$iso2.'_'.strtoupper($iso2),    // fr_FR<br />		$catalog['locale'],                // fre<br />		$catalog['localeFallback'],        // fre<br />		$iso2                            // fr<br />	);<br />	return $locales;<br />}<br /></code></pre>
<p>You may note that I set in first position a locale with the mention of the encoding. This is only used on Linux machines, Windows does not handle that. That's a pity, but I'll show you how to correctly make it work underWwindows.</p>
<p>As a side note, <code>setlocale</code> will not <code>return false</code> if the locale is not found, it will just fail to load it.</p>
<h4>Displaying date in UTF8</h4>
<p>If your app is in UTF8 (and it should be !) you may run into problem when trying to display a simple <code>strftime("%B", strtotime($date))</code> on Windows.</p>
<p><code>%B</code> translate to the current month name. For a month like <em>Août</em> (<em>August</em>) the funny <em>û</em> will not get correctly displayed, because Windows does its locale translation in its native encoding.</p>
<p>You'll need to manually encode it in utf8, but if you do so on a linux machine, as the result is already encoded in utf8 you may end in double encoding the same string, resulting in others display errors.</p>
<p>Note also that if your format string itself contains utf8 encoded characters (like<code> %A %d %B %Y à %Hh%M</code>), encoding it in utf8 again will also result in wrong characters displayed.</p>
<p>What I've done is creating a simple method in an helper that will take care of encoding the result if needed.</p>
<pre><code lang="php">function time($format, $date = null) {<br />	// On Windows, we will force the utf8 encoding of the date<br />	if (DIRECTORY_SEPARATOR == '\\') {<br />		return utf8_encode(strftime(utf8_decode($format), strtotime($date)));<br />	}<br />	// On linux, this is already taken care of by setlocale()<br />	return strftime($format, strtotime($date));<br />}<br /></code></pre>
<p>This way, we make sure that the date is correctly displayed in utf8, no matter the OS, even if you already supply utf8 characters in the format string.</p>