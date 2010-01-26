--- 
title: How to ban evil robots
---
I saw a tip on how to automate banning of evil robots posted by ironclad [here](http://www.evolt.org/article/Using_Apache_to_stop_bad_robots/18/15126/).

It got me thinking about how to automate detecting and banning of robots for rails. It seems like all that is required is a combination of a DISALLOW /email_addresses/ line in robots.txt and something to send all requests for /email_addresses to the bit bucket.

This should be easy enough to do in apache with a rewrite rule:
{% highlight apache %}
RewriteRule ^/email_addresses - [F,L]
{% endhighlight %}

And I imagine nginx can do something very similar.

However this only takes care of robots that expressly do what they should not. In order to ban abusive robots by user agent or ip address you could use something like the following:

{% highlight apache %}
RewriteCond %{REMOTE_ADDR} ^63\.148\.99\.2(2[4-9]|[3-4][0-9]|5[0-5])$ [OR] # Cyveillance spybot
RewriteCond %{HTTP_USER_AGENT} EmailSiphon [NC] 
RewriteRule .* - [F,L]
{% endhighlight %}
