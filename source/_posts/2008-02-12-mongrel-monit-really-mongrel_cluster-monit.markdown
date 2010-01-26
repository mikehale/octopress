--- 
title: Mongrel + monit (really mongrel_cluster + monit)
categories: [mongrel, monit, rails]
---
According to [Ezra](http://rubyforge.org/pipermail/mongrel-users/2007-April/003445.html) the best way to train your mongrels with monit is through mongrel_cluster.  Mongrel_cluster is a more reliable way to start and stop your mongrels than issuing straight mongrel_rails commands.

What if you have a bunch of mongrels? It would be a pain to have to write out the monit configuration for each one, and what happens when you need to change your mongrel config? You would have to remember to  hand update all your monit entries too. Enter [mongrel_monit](http://gist.github.com/286460) a script to generate a monit file based on your mongrel config.

