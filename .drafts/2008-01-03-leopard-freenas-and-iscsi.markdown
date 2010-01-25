--- 
wordpress_id: 24
title: Leopard, FreeNAS and ISCSI
wordpress_url: http://michaelahale.com/?p=24
layout: post
---
I installed Leopard a few days ago, and in preparation I created a bootable backup of my system using the excellent <a href="http://www.bombich.com/software/ccc.html">Carbon Copy Cloner</a>.  While fairly simple to do, the downside is that I have to have a physical drive present with enough space.  What would be really handy/cool is if I had a storage server that I could allocate and export a new drive from over the network.  Then the storage server can worry about making those bytes available and redundant.

Well there is some good news and some bad news (for now).  The good news is that this is exactly what ISCSI does and it is really simple to setup with <a href="http://www.freenas.org/">FreeNAS</a>.  The bad news is that I couldn't get everything working on Leopard, even though I could with windows.

A quick definition of <a href="http://en.wikipedia.org/wiki/ISCSI">ISCSI from wikipedia</a>:

<strong><em>iSCSI is a protocol that allows clients (called initiators) to send SCSI commands (CDBs) to SCSI storage devices (targets) on remote servers. It is a popular Storage Area Network (SAN) protocol, allowing organizations to consolidate storage into data center storage arrays while providing hosts (such as database and web servers) with the illusion of locally-attached disks. Unlike Fibre Channel, which requires special-purpose cabling, iSCSI can be run over long distances using existing network infrastructure.</em></strong>

As you can see there are two pieces to ISCSI, the targets or storage devices and the initiators or clients.  Using the FreeNAS live cd I was able to quickly setup a storage server and export an ISCSI target.  I was then able to use the <a href="http://www.microsoft.com/downloads/details.aspx?familyid=12cb3c1a-15d6-4585-b385-befd1319f825&displaylang=en#Requirements">microsoft ISCSI initiator</a> to connect to the target and format the disk. Pretty cool!  I now have access to raw disk space that is managed completely by FreeNAS and available anywhere I have a network connection.

Now onto the sad part. I tried to connect to the same ISCSI target from my Mac using the only freely available ISCSI initiator from Apple <a href="http://www.apple.com/downloads/macosx/system_disk_utilities/globalsaniscsiinitiator.html">globalSAN</a>.  The initial connection worked fine, but when I opened DiskUtility and attempted to format the drive, DiskUtility became unresponsive and never finished formatting the drive.  I don't know if this is a limitation of globalSAN or of DiskUtility, but I hope that there will be a working solution for free ISCSI on the Mac in the near future.
