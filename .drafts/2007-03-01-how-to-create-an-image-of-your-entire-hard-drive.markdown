--- 
wordpress_id: 5
title: How to create an image of your entire hard drive
wordpress_url: http://michaelahale.com/?p=5
layout: post
---
Aren't there a lot of imaging utilities out there already?  There are, but they all seem to require something special that is hard or unneccesary to setup.  For instance G4U requries either an ftp server or a dedicated partition.  I want to use ssh which is much more readily available than ftp.

Boot your computer using your favorite livecd distro.  My new favorite as of today is <a href="http://trinityhome.org/Home/index.php?wpid=1&front_id=12">Trinity Rescue Kit</a>, it seems to be geared towards windows system recovery tasks.  Start ssh on the livecd system, we'll call it "needs-fixin" from now on.  Logon to needs-fixin and run something like this

<pre><code>
dd if=/dev/hda | ssh root@backup-server \
"gzip -c > /mnt/bigDrive/hda.img.gz"
</code></pre>

Let's break this command down piece by pieceâ€¦
# "dd if=/dev/hda" reads each byte from the primary hard drive (/dev/hda) and copies it to STDOUT (it does this because there is no of= parameter see man dd for more info).
# "| (pipe) connects the STDOUT of dd to the STDIN of ssh"
# "ssh root@backup-server" establishes an ssh connection to backup-server
# "gzip -c > /mnt/bigDrive/hda.img.gz" since we passed this command string to ssh it runs this command after logging on to the backup-server.  That's right it is actually running this command on backup-server not needs-fixin. gzip -c reads the data coming across the ssh connection off STDIN, while "> /mnt/bigDrive/hda.img.gz" redirects the output of gzip to a file of your choice.

After your command finishes you will have a byte for byte compressed disk image on your remote server.

For hints on how to reduce your image size read <a href="http://www.feyrer.de/g4u/#shrinkimg">this</a>
