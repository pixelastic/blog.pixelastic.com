---
layout: post
title: "A small note about video encoding and formats"
custom_v2_id: 339
---

Following my previous note on audio files, I made some research on video
files. I have a huge amount of video on my hard drive, so much that I actually
needed to do a bit of cleaning.

That's when I discovered that I had a plethora of different file formats
(`avi`, `mp4`, `mkv`) and in various resolution, quality and filesize. Also,
filesize was not always dependent on quality. I had some really heavy files
that were not better looking that smaller one.

So I started some research on the Wikipedia and Google to understand more
about all those fileformats, and here are my results.

## Containers

First of all, the `avi`, `mp4` or `mkv` file extension denote a container
format. This container is just a box that contain video and audio stream. Not
all boxes are created equal, though.

`avi` is a Microsoft container but gained (in)famous popularity in the first
days of p2p filesharing. This is a very simple container, able to hold one
video and one audio stream. Then, was created the `mp4` container. This one is
an ISO box, so already much better than the Microsoft one. This actually is a
good container, allowing the use of several audio and videos streams as well
as subtitles.

Then, came the `mkv` container. It is as good as `mp4`, and even allow more
customization, but the important point is that it is patent free. The only
downside to `mkv` is that it is not as widely supported as the other two
format, but the specs being public and open, this is slowly changing.

I also had some other extensions, like `wmv`, `mov` or `divx`. `divx` is only
an `avi` in disguise, because of legal reasons. `wmv` is another Microsoft
container, this one being an improved `avi` with DRM. `mov` is an Apple
container, aimed to media creation. A `mov` is actually quite a powerful
container, that could be used for much more than simply media playback but
also media creation.

If I had to choose, I'll pick mkv.

## Video codecs

Now, what do we put in those boxes ? First, a video stream. We could put an
uncompressed video stream in it, but this will result in huge filesize, so we
actually never do that.

Instead, we use codec (short for _coder/decoder_) to compress this stream in
something with a more manageable size. The most famous is DivX. DivX started
as an encoder hacked from Microsoft first avi files and was heavily used to
encode movies before sharing them online. Because of legal dispute with
Microsoft, the guys that created DivX had to recode it from scratch. In the
meantime, an opensource fork of DivX, named Xvid was created and after a few
version became even better than the original Divx.

MPEG, MPEG2 and MPEG4 are succesive iteration of another codec that compress a
video stream by looking at its pixels and checking if they changed from one
frame to another, to avoid redrawing them. With each succesive versions it
then started to track movement, color and lightning of these pixels. In the
end, it gave birth to the h264 codec which is used on Blueray (while MPEG2 was
used on DVD). h264 is the de facto standard of HD video of today. It requires
more processing power than its MPEG counterparts but deliver a much better
quality for an equal filesize. Recent hardware is today optimized to handle
h264 natively.

As for mkv and mp4, there also is the same difference between H264 and Theora.
Theora got equivalent quality than H264, but is patentfree. On the other end,
H264 is very widely supported while Theora is not (as can be seen in HTML5).

Microsoft also created a closed source wmv codec to go with its wmv container.
It is supposed to be based on MPEG4, but there is little known to it, so it of
absolutly no use to me.

So, as you can see, there is almost no relation between a codec and its
container. You can have a divx encoded file in an mkv, or a Theora in an avi.
But, in the real world, some codec are most often found with some container,
like divx in avi or h264 in mp4.

Here, I'll pick h264 because of the hardware support.

## Audio codec

As for the video stream, the audio stream is also compressed using an audio
codec. The most common audio codec is the mp3. This is a lossy codec, meaning
it discards information to get the filesize lower. It is based on a method
that will discard sounds that the human hear will not be able to hear anyway.

mp3 has its drawbacks, like being bloated from succesive mpeg versions and
still being patented.

A new codec, the AAC succeed to mp3. It will also discard sounds the human
hear cannot get, but will also encode redundancy in a better way. Even if mp3
was the de facto standard for a long time, AAC is gaining a huge popularity
because it is backed up by all the big companies.

Then, the story gĹs on and on. There is an open source, patent free
equivalent to AAC, being ogg. Once again, its as good as its opponent (even
better on low bitrates), but there isn't as many devices able to read ogg as
they're are able to read AAC. But once, again, things are slowly changing.

Here, I'll choose ogg over the alternatives.

## Conclusion

I have a bunch of files, in different containers, encoded with different
encoders and I'm going to try to clean a bit all this. First, I'll get rid of
all the "bad" containers (`mov` and `wmv`) and use `mkv` instead.

For files that are too big, I'll try to convert them to a better format. h264
video with an ogg audio stream in an mkv container.

Well, there also is the matter of the video resolution, data rate, fps and
audio frequency but this might be the subject of another post.

