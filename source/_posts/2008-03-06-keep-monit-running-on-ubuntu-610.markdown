--- 
wordpress_id: 26
title: Keep monit running on ubuntu > 6.10
wordpress_url: http://michaelahale.com/?p=26
layout: post
---
Who is monitoring monit? Well normally init is (or could be), but newer versions of ubuntu (read feisty) don't really use init, they use <a href="http://upstart.ubuntu.com/">upstart</a>. If you want to keep monit running with upstart try my <a href="http://pastie.caboo.se/162162">monit upstart job</a>.
