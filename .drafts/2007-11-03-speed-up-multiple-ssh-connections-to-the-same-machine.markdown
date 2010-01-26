--- 
wordpress_id: 23
title: Speed up multiple SSH connections to the same machine
wordpress_url: http://michaelahale.com/?p=23
layout: post
---
Add the following to your ~/.ssh/config
ControlMaster auto
ControlPath ~/.ssh/master-%r@%h:%p

<a href="http://www.revsys.com/writings/quicktips/ssh-faster-connections.html">Thanks for the tip!</a>
