--- 
wordpress_id: 27
title: How to ban evil robots
wordpress_url: http://michaelahale.com/?p=27
layout: post
---
I saw a tip on how to automate banning of evil robots posted by ironclad <a href="http://www.evolt.org/article/Using_Apache_to_stop_bad_robots/18/15126/">here</a>.

It got me thinking about how to automate detecting and banning of robots for rails. It seems like all that is required is a combination of a DISALLOW /email_addresses/ line in robots.txt and something to send all requests for /email_addresses to the bit bucket.

This should be easy enough to do in apache with a rewrite rule:
<pre><code>RewriteRule ^/email_addresses - [F,L]</code></pre>

And I imagine nginx can do something very similar.

However this only takes care of robots that expressly do what they should not. In order to ban abusive robots by user agent or ip address you could use something like the following:

<pre><code>RewriteCond %{REMOTE_ADDR} â€œ^63\.148\.99\.2(2[4-9]|[3-4][0-9]|5[0-5])$â€ [OR] # Cyveillance spybot
RewriteCond %{HTTP_USER_AGENT} EmailSiphon [NC] 
RewriteRule .* - [F,L]</code></pre>
