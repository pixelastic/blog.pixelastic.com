---
layout: "post"
title: "Compression strategy for heavy Whisper files"
tags: automation, whisper
---

![](/img/files/2025-02-21-compression-strategy-whisper/header.png)

I'm often taking audio notes with my phone recorder app. I then have a [make.com](http://make.com) workflow in place where I push the audio file through Whisper to get a transcript of it, and start other workflows based on the content of the transcript. 

Sometimes it's just a simple note to remind me to do something, which gets added to my TODO list. Sometimes it's an idea about a blogpost I'd like to write, which gets added to my list of blogposts drafts. Sometimes it's the recap of the latest TTRPG game we played, which gets added to our campaign document.

Most of those recordings are only a few minutes long, but the last kind (the TTRPG session recap) can get lengthy, and I've already ended up with files of up to 50MB. Whisper has a limit of 25MB, so I had to come up with a way to decrease the filesize before sending it to Whisper.

![](/img/files/2025-02-21-compression-strategy-whisper/01-0b854e244d.png)

I now have two paths in my make.com scenario. The bottom one is the happy path, when the filesize is below 25MB. The top one is only triggered when the file is too heavy. 

In that case, I push the file through [CloudConvert](https://cloudconvert.com/), to get a lighter version, and then I go to the second branch with that compressed file instead of the default one.

### Compression settings

Whisper doesn't need very high audio quality to create a transcript, so I can compress pretty aggressively and still get a good transcript. What I found to be impactful is to:

- **Format:** Convert from `mp3` to `m4a` with the `AAC` codec. Slightly lower filesize for equal quality.
- **Channels: **I set the channels to 1, actually making it a mono rather than stereo file.
- **Audio bitrate:** I halved it down from `128 kbps` to `64 kbps`.
- **Sample rate: **I also halved it from `44.1 kHz` to `22.05 kHz`

In [CloudConvert](https://cloudconvert.com/) parlance, this means setting conversion and engine specific options as:

- `audio_codec` set to `aac`
- `channels `set to `1`
- `audio_bitrate` set to `64`
- `sample_bitrate` set to `22050`

I'm not doing this conversion on every file, only on those that are too heavy. CloudConvert free plan allows for up to 10 conversions per day, which is enough for my needs. The conversion takes a few minutes to run, and again, that's fine for my current needs. 

The final quality of the audio is clearly inferior to the original, but this doesn't seem to bother Whisper at all, which can still create a good transcript out of it.

Hope that help other people get over the 25MB limit of Whisper.
