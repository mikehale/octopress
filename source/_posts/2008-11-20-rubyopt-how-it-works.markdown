---
title: RUBYOPT - How it works
---

The RUBYOPT environment variable is a handy way to specify the options that will be pased to ruby without having to type them in all the time.

According to the [ruby source code](http://opensource.apple.com/source/ruby/ruby-18/ruby/ruby.c) you can customize your ruby interpreter by specifying any of the following arguments in RUBYOPT: `I, d, v, w, W, r, or K`

For example to always require rubygems when you run ruby simply add the following to your .profile or .bashrc.

{% highlight bash %}
export RUBYOPT="-r rubygems" 
{% endhighlight %}

But wait there's more! According to the [rubygems documentation](http://www.rubygems.org/read/chapter/3) you can simply say

{% highlight bash %}
RUBYOPT='rubygems' 
{% endhighlight %}

How does that work? 

Well this trick depends on a couple of things. First RUBYOPT does not actually require you to put a dash in front of your arguments. This kind of makes sense when you think about it since you have already declared the value of RUBYOPT to be options to the ruby interpreter by virtue of the fact that they are in a special environment variable. However, on the command line dashes are required to distinguish between arguments and files to run. So what does not requiring dashes leave us? Well you could expand 

{% highlight bash %}
RUBYOPT='rubygems' 
{% endhighlight %}

into

{% highlight bash %}
RUBYOPT='-r ubygems' 
{% endhighlight %}

This brings us to the second part of the trick. Rubygems ships with a file named ubygems.rb that has this line `require 'rubygems'`.

All of this adds up to some 'command line syntactic sugar' allowing you to simply specify `RUBYOPT='rubygems'` to require rubygems by default in all ruby programs.

---
**This post was inspired by an error I received yesterday; here it is for the benefit of those googling:**

{% highlight bash %}
no such file to load -- ubygem (LoadError). 
{% endhighlight %}

The problem is that RUBYOPT was set to 'rubygem' when it should have been set to 'rubygems', or '-r rubygems', or, 'rrubygems', or '-r ubygems'... you get the idea.

