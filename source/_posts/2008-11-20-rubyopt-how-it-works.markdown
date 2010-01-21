--- 
wordpress_id: 37
title: RUBYOPT - How it works
wordpress_url: http://michaelahale.com/?p=37
layout: post
---
The RUBYOPT environment variable is a handy way to  specify the options that will be pased to ruby without having to type them in all the time. 

According to the <a href="http://www.opensource.apple.com/darwinsource/Current/ruby-67.4/ruby/ruby.c">ruby source code</a> you can customize your ruby interpreter by specifying any of the following arguments in RUBYOPT: 'I', 'd', 'v', 'w', 'W', 'r', or 'K'.

For example to always require rubygems when you run ruby simply put <code>export RUBYOPT="-r rubygems"</code> into your .profile or .bashrc. But wait there's more. According to the <a href="http://www.rubygems.org/read/chapter/3">rubygems documentation</a> you can simply set RUBYOPT="rubygems", how does that work? Well this trick depends on a couple of things. First RUBYOPT does not actually require you to put a dash in front of your arguments. This kind of makes sense when you think about it since you have already declared the value of RUBYOPT to be options to the ruby interpreter by virtue of the fact that they are in a special environment variable. However, on the command line dashes are required to distinguish between arguments and files to run. So what does not requiring dashes leave us? Well you could expand RUBYOPT="rubygems" to RUBYOPT="-r ubygems". This brings us to the second part of the trick. Rubygems ships with a file named ubygems.rb that has this line <code>require 'rubygems'</code>. All of this adds up to some "command line syntactic sugar" allowing you to simply specify RUBYOPT="rubygems". 

Yesterday I encountered a strange error that caused me to dig into how RUBYOPT is used; here it is for the benefit of those googling: <code>no such file to load -- ubygem (LoadError)</code>. The problem is that RUBYOPT was set to "rubygem" when it should have been set to "rubygems", or "-r rubygems", or, "rrubygems", or "-r ubygems"... you get the idea.
