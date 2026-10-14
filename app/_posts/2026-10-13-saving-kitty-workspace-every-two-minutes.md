---
layout: "post"
title: "Saving my kitty workspace every two minutes"
tags: kitty, systemd, zsh
---

Yesterday, my Ubuntu laptop ran an update of packages, and once it was done, it
let me know I needed to reboot my laptop for the change to be completed. But I didn't
want to reboot my laptop right now. I had 12+ open tabs in Kitty, each split
into subwindows because I was working on various topics.

So I postponed the reboot. And postponed; for days. Finally I gave up, wrote
down the list of tabs, rebooted, and manually restarted all my kitty tabs.

![A kitty window with ten named tabs. The current tab is split in two columns, and the right column is split again.](/img/files/saving-kitty-workspace-every-two-minutes/kitty-tabs-and-splits.png)

## Doing it by hand

It was tedious, and I didn't really like doing it. And I certainly didn't want to have to do it twice.
I wanted a keybinding to do it for me. Something that would save the whole
layout, and bring it back.

Since Kitty 0.43, the `save_as_session` action dumps tabs, tab names, splits, layout geometry, and working directories to a file. And `kitty --session <file>` starts from that file.

I updated my Kitty to the right version and created a `kitty-save` script that dumps the session to a file, and bound it to `Alt-F5`. I also made it flash the screen green when I save (so I have some visual feedback something actually happened).

```conf
# kitty.conf
allow_remote_control socket-only
listen_on unix:/tmp/kitty-socket

map alt+f5 launch --type=background kitty-save
```

```zsh
#!/usr/bin/env zsh
# kitty-save
sessionFile="$HOME/.local/state/kitty/session.kitty-session"

# Talk to kitty through its socket
kitty-remote() { kitty @ --to unix:/tmp/kitty-socket "$@" }

# Flash all windows green
kitty-remote set-colors --all background='#1a3a1a'

# Dump the session to a file
kitty-remote action save_as_session --save-only "$sessionFile"

# Back to the normal colors
kitty-remote set-colors --all --reset
```


I also created a `kitty-restore` script that checks for the existence of the session file, and appends `--session` with it if the file exists. I call that script now instead of opening Kitty directly.

```zsh
#!/usr/bin/env zsh
# kitty-restore
sessionFile="$HOME/.local/state/kitty/session.kitty-session"

sessionArgs=()
[[ -f "$sessionFile" ]] && sessionArgs+=(--session "$sessionFile")

kitty "${sessionArgs[@]}"
```

I was happy. On the next reboot, I could just `Alt+F5` to save everything,
reboot, and come back where I left off.

## The crash

But the next time my computer rebooted, it was because it crashed. Totally unrelated, but the computer froze and I had to manually reboot it, without being able to press `Alt-F5` first.

When I restarted Kitty, it came back with the layout from my last manual save, which was days old. My tabs were not the ones I had been working on.

So, manual saving was a good start, but wasn't enough. I needed something more
automated.

## Every two minutes

I thought about running `kitty-save` automatically every two minutes. But in my mind it meant writing cron files, with their weird syntax made of `*` and `/` and that seemed too complex to me at that time.

Then I remembered we live in an age of agents and I wouldn't be the one writing
those commands anyway, so why not ask the agent? Actually the agent told me that
cron was outdated and systemd was apparently the new way of doing it.

A systemd user timer is made of two small files: a service to say what to run, and a timer to say when.

```ini
# kitty-save.service
[Service]
Type=oneshot
ExecStart=/path/to/kitty-save
```

```ini
# kitty-save.timer
[Timer]
OnStartupSec=2min
OnUnitActiveSec=2min

[Install]
WantedBy=timers.target
```

`OnStartupSec` tells it to start its first tick 2mn after login. `OnUnitActiveSec` tells it to run again after that every 2mn.

I had to slightly update `kitty-save` to work both when called manually and through the timer. I made the window green flash optional behind a `--flash` flag, and added some guards to return early if kitty wasn't even running.

## Peace of mind

I now have this automated save running in the background every 2mn. It takes
about 90ms to run, but as it runs asynchronously in the background, I don't even
perceive it. And now a crash would cost me 2mn of Kitty layout at most.
