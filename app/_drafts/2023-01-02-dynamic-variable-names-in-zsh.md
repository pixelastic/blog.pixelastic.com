Imagine the following scenario:

```
local projects=(blog www meetups)
local color_project_blog=146
local color_project_www=75
local color_project_meetups=23
```

And now you'd like to iterate on all projects, and display their associated
color. You need dynamic variables, where part of the variable name is itself
coming from another variable.

This will be achieved using two zsh modifiers: `(P)` and `:-`.

## Building a variable name using dynamic variables

`local name=${real_name:-Alice}` means: set the `$name` variable to the content
of the `$real_name` variable. If `$real_name` is empty, use `Alice` as the
default
value.

Anything after the `:-` is used after the default value, and it can even
interpolate variables. So if you also have `local default_name="Alice"`, then
you can have `local name=${real_name:-Default name set to $default_name}`.

That way, `$name` is equal to `$real_name`, unless `$real_name` is empty, in
which case it's set to `Default name is Alice`.

One can even remove the first variable to force zsh to use the default value. So
`local name=${:-Default name is $default_name}` is valid syntax and will set
`$name` to `Default name is Alice`, allowing one to interpolate
variable names when setting variables.

## Reading such a dynamic variable

We now have a fancy way of building a string with variable interpolation inside
a `${}`.

We're going to couple that with `${(P)}` to read the content of such
variable.

```zsh
local projects=(blog www meetups)
local color_project_blog=146
local color_project_www=75
local color_project_meetups=23

for project_name in $projects; do
  local project_color=${(P)${:-color_project_${project_name}}}
  echo "${project_name} color is ${project_color}"
done
```



