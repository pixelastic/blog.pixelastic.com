---
layout: "post"
title: "Making my agent find my own CLI helpers"
tags: claude-code, zsh, ai
---

Over the years, I made myself a long list of CLI helpers. Stuff like
`git-worktree-create` or `video-volume-increase`. They help me get the info I want or
do the action I need without having to remember the exact underlying command and
args to type.

But when I ask Claude to create a branch or get me the dimensions of a video, it
would use bare `git` or `ffmpeg` commands. That inconsistency buggued me at
first but I thought that given the agent was smarter than I was, it didn't need
an alias, it could just remember the complete and complex command so it didn't
really matter.

## Well, it mattered, actually

When I ask the agent for a new worktree, what I have in mind is running my
custom `git-worktree-create` helper. I packed a lot of
complexity away behind that command:

- It stops early when the current directory is not a git repository.
- It starts a new branch.
- It creates the worktree folder in a shared directory, with a naming convention.
- It handles git submodules.
- It installs dependencies.
- It handles edge cases (invalid chars in branch names, etc.).
- It also takes care of some edge cases or additional tweaks for some specific repos.

This command started as a simple `git worktree add /worktree/dir branch-name`
wrapper but grew over time to the complex beast it is today. And its tests grew
with it. That command does exactly what I want it to do, and I have tests to
prove it now. I feel safe using it, knowing it will do exactly what I expect it
to do.

## Letting the agent know

I'd like the agent to use that helper. But the agent doesn't know about it. It
still thinks "Creating a worktree" is running `git worktree add /worktree/dir
branch-name` and that's it.

I found myself having to tell it: "Use the `git-worktree-create` helper
instead." often. And I had to do that for all my helpers.

I started adding lines into my `CLAUDE.md` to tell it about my favorite helpers
but I quickly realized it wouldn't scale with the 1000+ helpers I currently have.

What I did instead was writing two **other** helpers. `helper-list` would list all my
helpers and `helper-documentation` would explain how to use on.

### `helper-list`

`helper-list` takes a query and returns only the helpers that
match that query.

![A terminal running `helper-list git worktree`. It prints about 25 helpers, from `git-worktree-path` to `complete-git-worktrees-linked`. Each helper name sits in orange, next to a one-line description in white.](/img/files/making-my-agent-find-my-cli-helpers/helper-list-git-worktree.png)

All my helpers follow a consistent naming scheme of
`<domain>-<object>-<action>`. For example `git-branch-create`,
`docker-image-list`, `notion-page-read`, etc.

Finding them is a matter of piping `find` into `fzf` to get some fuzzy-matching
against the query and displaying them. As my helpers have explicit enough names, the agent
can guess which one would be useful to it.

### `helper-documentation`

Knowing that a helper exists is only the first step. Now the agent needs to know
how to use it. `helper-documentation` takes a helper name as input, and returns
its header documentation comments (including description, usage, etc).

![A terminal running `helper-documentation git-worktree-create`. It prints the helper description, "Create a Worktree for a branch (new or existing) and cd into it", then a usage line with the example `git-worktree-create fix/my-bug`.](/img/files/making-my-agent-find-my-cli-helpers/helper-documentation-git-worktree-create.png)

By making sure all my helpers are properly documented, documentation usage
can easily be resurfaced to the agent.

### `CLAUDE.md`

To wrap this all together, here is what I added to my `CLAUDE.md`:

```markdown
Prefer dedicated CLI helpers over raw commands.
Examples:


| Instead of…              | Use…                         |
|--------------------------|------------------------------|
| `git` complex pipelines  | `git-*` helpers              |
| `convert`, `imagemagick` | `img-*` helpers              |
| `ffmpeg` pipelines       | `audio-*`, `video-*` helpers |


Discover helpers with `helper-list <domain> [action]`.
Read the flags and usage of a helper with `helper-documentation <name>`.
```


## The result

Now, I can just focus on adding more helpers and more helpers, following my
naming convention and documenting them properly. I'm assured my agent will be
able to use them without me having to update anything in my `CLAUDE.md`.
Those helpers are useful to both me and the agent.

A helper that finds my other helpers feels a bit meta, but it works really well.

One more benefit is that I can now configure Claude to allow specific commands
(like `git-worktree-create`) without needing to give it a blanket permission to
the whole `git` command.
