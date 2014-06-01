---
layout: post
title: "CSS3 gradients with CSSTidy"
custom_v2_id: 188
---

Gradients are one of the new cool stuff CSS3 brought with it. Like the others
cool things, it still suffer from a partial implementation and vendor-specific
properties.

It also isn't correctly parsed by CSSTidy. Here I'll show you how to patch
your CSSTidy to make it eat gradients correctly.

#### Quick and dirty patch

First, you'll need to edit the huge `parse()` method in c`sstidy.ph`p. You'll
have to add a condition to explictly tell CSSTidy not to discard `-webkit-
gradient` and `-moz-linear-gradient`.

Just open your `csstidy.php` file, find the `parse()` method and locate the
`case 'instr'` in the huge `switch `statement.

    
    if (!($this->str_char === ')' && in_array($string{$i}, $GLOBALS['csstidy']['whitespace']) && !$this->str_in_str)) {  
    	$this->cur_string .= $temp_add;  
    } **else {**  
    **	if ($this->sub_value=="-webkit-gradient" || $this->sub_value=="-moz-linear-gradient") {**  
    **		$this->cur_string.=' ';**  
    **	}**  
    **}**  
    

In bold, the `else `part to add. This will make sure your webkit and firefox
gradient rules will get processed correctly.

I don't really understand WHY it work, but it does. The `parse() `method is a
huge uncommented mess, it is quite difficult to understand it. There must be a
better way, a more generic one than specifying some properties, but I didn't
manage to come with anything better than that.

Fortunatly, the next part is cleaner.

#### Telling CSSTidy which properties not to merge

If you write a css like the following, only the latest (`color:white`) rule
will get through CSSTidy.

    
    body {  
    	color:red;  
    	color:white;  
    }  
    

That's logical, because CSSTidy will remove any unused CSS declaration.
Unfortunatly, this is not what we want, because we need to declare several
`background:` rules, one for Webkit, and one for Firefox.

By looking at CSSTidy source code, we can find that it contain a quick fix to
allow the `cursor:` property to be defined several time (to cope with the old
`cursor:pointer` / `cursor:hand` issue).

I just extended this quick fix to work for other properties as well, and even
managed to allow them to be passed as a config value.

#### Defining the config value

First, open the `csstidy.php` file, and around line 310 you should find a list
of default config values. Just add the following :

    
    $this->settings['multiple_properties'] = array('cursor', 'background');  
    

This will define the default list of properties that are allowed to be defined
several times in a css rule.

Next, we'll edit the `set_cfg()` method to allow the passing of array values.
Just replace the else statement with this one :

    
    else if(isset($this->settings[$setting]) && $value !== '') {  
    	// Merging array settings  
    	if (is_array($value) && is_array($this->settings[$setting])) {  
    		$this->settings[$setting] = array_merge($this->settings[$setting], $value);  
    	} else {  
    		// Setting classic setting  
    	$this->settings[$setting] = $value;  
    	}  
      
    	if ($setting === 'template') {  
    		$this->_load_template($this->settings['template']);  
    	}  
    	return true;  
    }  
    

You can now pass a list of properties to be added to the existing list by
calling `->set_cfg('multiple_properties', array('property1', 'property2'));`

Now, find the `css_add_property(`) method, and around line 1066, change the`
if (strtolower($property) == 'cursor') `if statement to this more generic one
:

    
    if (in_array($property, $this->get_cfg('multiple_properties')))  
    

And now, in `csstidy_print.php`, find the` _print()` method, and replace the
`case PROPERTY` block with this (more concise) one :

    
    case PROPERTY:  
    	// Converting back multiple properties  
    	$multipleProperties = $this->parser->get_cfg('multiple_properties');  
    	foreach($multipleProperties as $property) {  
    		$propertyLength = strlen($property);  
    		if (substr($token[1], 0, $propertyLength)==$property) $token[1] = $property;  
    	}  
      
    	// Applying correct casing  
    	$caseProperties = $this->parser->get_cfg('case_properties');  
    	if ($caseProperties==2) $token[1] = strtoupper($token[1]);  
    	if ($caseProperties==1) $token[1] = strtolower($token[1]);  
    	  
    	$out .= $template[4] . $this->_htmlsp($token[1], $plain) . ':' . $template[5];  
    break;  
    

#### And that's it

You now can have gradients compressed with CSSTidy. Well sort of, because this
is just a quick and dirty patch, as I'm not the creator of CSSTidy.

This could surely be improved in a less hacky way, for example by compressing
the color code used in the gradients...

