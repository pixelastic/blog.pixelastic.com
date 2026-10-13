---
layout: post
title: "(Not)Hibernating Ubuntu 16.04 with full disk encryption"
tags: ubuntu
---

To maximize the usage of my new laptop battery, I wanted to have it hibernate
when I close the lid. I could see I had an "Hibernate" option in the settings,
but it always stayed always greyed out and I could not select it.

One morning I sat at the table decided to fix this issue. First thing I tried
was running `sudo pm-hibernate` to see if I could actually hibernate. The
command did nothing except returning and error code 1.

After some Googling, I understood it had to do with my BIOS configuration.
I have Secure Boot enabled in my BIOS, which seems to prevent hibernating. 

One reboot later, after having disabled this option from the BIOS, I ran `sudo
pm-hibernate` again, and this time I had much better results. My screen turned
off for 2 seconds, then back again for 2 more seconds, then the laptop went to
sleep.

Great! I'm making progress. So I'm pressing the switch button to turn it back
on, but instead of coming back to my session, it initiated a whole reboot, going
through the Lenovo splash screen and Ubuntu cryptsetup prompt.

More Googling told me that I need to configure GRUB to define what swap
partition it should attempt to resume from. When you hibernate, the whole RAM
memory is flushed to swap. GRUB needs to know the UUID of the swap disk holding
that info.

To get the UUID, I typed `sudo blkid | grep swap` to get a list of all swap
devices. In my case, I had two of them:

```
/dev/mapper/ubuntu--vg-swap_1: UUID="b0d3688c-e44a-4972-b18a-43e79ca3777c" TYPE="swap"
/dev/mapper/cryptswap1: UUID="78df939a-d7a9-46dc-9082-d46415cd6e0a" TYPE="swap"
```

Ok, so which one is it? Because I'm using Ubuntu full disk encryption, one of
those two disks is actually the encrypted swap disk and the other is the "live"
decrypted swap. But which is which?

`swapon -s` told me the name of the active swap: `/dev/dm-3`. Ok, that's a good
start. `sudo dmsetup info /dev/dm-3` yield the final answer: it's `cryptswap1`.

So `cryptswap1` is the active swap; it means it's the decrypted swap, so
`ubuntu--vg-swap_1` is the actual encrypted swap. It actually makes sense, as
the `vg` in the name stands for "Volume Group", a term used in LVM terminology.

My issue with that setup is that I cannot tell GRUB to resume on the decrypted
swap, because the UUID of this swap will be randomly assigned at each boot and
more importantly it won't be decrypted yet when resuming. 

But I cannot tell GRUB to boot on the encrypted swap disk either as it will be
random garbage from its point of view.

I was stuck. Other solutions online suggest that I could flush my RAM to
a disk that was not encrypted so I could resume from it, but that defeats the
purpose of encrypting my disks if I dump everything that is in RAM to a readable
disk.

After hours and hours of Googling and trying, I was about to give up. That's
when I decided to ask one of my coworker that I know has a similar setup: Linux
on a Lenovo laptop, using encrypted disks.

His answer was all I needed:

> over the years I just made my mind over the fact that hibernate was broken and
> I never even try to see if it's fixed, I just consider it as broken forever

Ok.

That's not just me then. Hibernating and having an encrypted drive are mutually
exclusive. Too bad, I'd rather keep the encrypted drive. 
