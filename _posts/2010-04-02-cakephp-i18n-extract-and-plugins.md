---
layout: post
title: "cakePHP i18n extract and plugins"
custom_v2_id: 65
---

Cake has a lot of wonderful tools in its console. One of them is the `i18n
extract` task that reads every file of your app, and extract strings that
should be translated (used with `__()`, `__d()`, etc).

With cake 1.3 RC3 it even stored each domain string in its own `.pot` file.

But, as far as I know (I've posted on the google group about that, maybe
someone will show me where I'm wrong), the console task is limited when
dealing with plugins.

Let's say I have a plugin in my app. I'm using `__d('plugin_name', 'My plugin
string')` in my plugin and `__('My app string')` in the main app.

If I run the `cake i18n extract` in my plugin directory, it will correctly
generate the `.pot `file in my plugin `locale/` folder.

But if I run it in the main app, it will scan every plugin file and thus
finding any plugin string and save them in the `default.pot` or in its own
`plugin_name.pot` file (depending on the value of the merge option).

I don't need the `plugin_name.pot` files in `app/locale`, I already have them
in `app/plugins/plugin_name/locale`. I know it's no big deal, I just have to
delete the useless files created every time I run the `cake i18n extract` on
the main app but it is kind of irritating.

So I updated the `cake/console/libs/tasks` to add a new option to the task,
named '`plugins`' (value : yes/no. Default to no).

If set to no, the extract task will skip every plugin directory when
extracting files. This way, I have no more clutter, it only extract string
that are in the app.

All I had to do was updating the `execute()` method, and replacing the end of
the method (from line 152) with this one :


```php
$this->params['plugins'] = isset($this->params['plugins']) ? $this->params['plugins'] : 'no';
if (empty($this->__files)) {
  if ($this->params['plugins']=='yes') {
    $this->__searchFiles();
  } else {
    $this->__searchFilesExcludePlugins();
  }
}
```

And then add this method to the class :

```php
function __searchFilesExcludePlugins() {
  foreach ($this->__paths as $path) {
    $Folder = new Folder($path);
    $filelist = $Folder->tree($path);
    foreach($filelist[1] as &$file) {
      // We discard plugins
      if (strpos(str_replace($path, '', $file), DS.'plugins')===0) continue;
      // We keep those that match the pattern
      if (!preg_match('/^.*\.(php|ctp|thtml|inc|tpl)$/i', $file)) continue;
      $this->__files[]= $file;
    }
  }
}
```


