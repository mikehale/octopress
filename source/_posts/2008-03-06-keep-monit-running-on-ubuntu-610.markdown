--- 
title: Keep monit running on ubuntu > 6.10
categories: [ubuntu, monit, upstart]
---
Who is monitoring monit? Well normally init is (or could be), but newer versions of ubuntu (read feisty) don't really use init, they use [upstart](http://upstart.ubuntu.com/). If you want to keep monit running with upstart try my [monit upstart job](http://pastie.caboo.se/162162).
