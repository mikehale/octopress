--- 
wordpress_id: 25
title: Mongrel + monit (really mongrel_cluster + monit)
wordpress_url: http://michaelahale.com/?p=25
layout: post
---
According to <a href="http://rubyforge.org/pipermail/mongrel-users/2007-April/003445.html">Ezra</a> the best way to train your mongrels with monit is through mongrel_cluster.  Mongrel_cluster is a more reliable way to start and stop your mongrels than issuing straight mongrel_rails commands.

What if you have a bunch of mongrels? It would be a pain to have to write out the monit configuration for each one, and what happens when you need to change your mongrel config? You would have to remember to  hand update all your monit entries too. Enter <a href="http://dpaste.com/hold/34861/">mongrel_monit</a>  a script to generate a monit file based on your mongrel config.

