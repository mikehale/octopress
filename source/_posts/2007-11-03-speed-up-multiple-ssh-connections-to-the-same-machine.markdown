--- 
title: Speed up multiple SSH connections to the same machine
categories: [ssh]
---
Add the following to your ~/.ssh/config
{% highlight bash %}
ControlMaster auto
ControlPath ~/.ssh/master-%r@%h:%p
{% endhighlight %}

[Thanks for the tip!](http://www.revsys.com/writings/quicktips/ssh-faster-connections.html)
