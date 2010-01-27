--- 
title: How to Create an Image of Your Entire Hard Drive
---
Aren't there a lot of imaging utilities out there already?  There are, but they all seem to require something special that is hard or unneccesary to setup.  For instance G4U requries either an ftp server or a dedicated partition.  I want to use ssh which is much more readily available than ftp.

Boot your computer using your favorite livecd distro.  My new favorite as of today is [Trinity Rescue Kit](http://trinityhome.org/Home/index.php?wpid=1&front_id=12), it seems to be geared towards windows system recovery tasks. Start ssh on the livecd system, we'll call it "needs-fixin" from now on. Logon to needs-fixin and run something like this

{% highlight bash %}
dd if=/dev/hda | ssh root@backup-server "gzip -c > /mnt/bigDrive/hda.img.gz"
{% endhighlight %}

Let's break this command down piece by piece

{% highlight bash %}
dd if=/dev/hda
{% endhighlight %}

Reads each byte from the primary hard drive (/dev/hda) and copies it to STDOUT (it does this because there is no of= parameter see man dd for more info).

{% highlight bash %}
|
{% endhighlight %}

(pipe) connects the STDOUT of dd to the STDIN of ssh.

{% highlight bash %}
ssh root@backup-server
{% endhighlight %}

Establishes an ssh connection to backup-server.

{% highlight bash %}
"gzip -c > /mnt/bigDrive/hda.img.gz"
{% endhighlight %}

Since we passed this command string to ssh it runs this command after logging on to the backup-server. That's right it is actually running this command on backup-server not needs-fixin. 

{% highlight bash %}
gzip -c
{% endhighlight %}

Reads the compressed data coming across the ssh connection off STDIN, while 

{% highlight bash %}
> /mnt/bigDrive/hda.img.gz
{% endhighlight %}

redirects the output of gzip to a file of your choice.

After your command finishes you will have a byte for byte compressed disk image on your remote server.

For hints on how to reduce your image size read [this](http://www.feyrer.de/g4u/#shrinkimg).
