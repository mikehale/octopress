--- 
wordpress_id: 35
title: Sake task for mod_rails (aka phusion passenger)
wordpress_url: http://michaelahale.com/?p=35
layout: post
---
So <a href="http://www.modrails.com/">phusion passenger</a> for <a href="http://nubyonrails.com/articles/ask-your-doctor-about-mod_rails">local development is the bomb</a>! <a href="http://errtheblog.com/posts/60-sake-bomb">Sake bomb</a> is also fairly cool in it's own right. I got tired of manually updating httpd.conf and /etc/hosts to add new phusion passenger virtual hosts so I wrote a little <a href="http://pastie.org/216294">sake script</a> to do the work for me. Want it? 
<pre><code>sudo gem install sake && \\
sake -i http://pastie.caboo.se/216294.txt</code></pre>

Update: I am now using the <a href="http://www.fngtps.com/2008/06/putting-the-pane-back-into-deployment">passenger preference pane</a> instead of my sake script.
