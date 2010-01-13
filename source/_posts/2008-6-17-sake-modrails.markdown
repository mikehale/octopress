So [phusion passenger](http://www.modrails.com/) for [local development is the bomb](http://nubyonrails.com/articles/ask-your-doctor-about-mod_rails)! [Sake bomb](http://errtheblog.com/posts/60-sake-bomb) is also fairly cool in it's own right. I got tired of manually updating httpd.conf and /etc/hosts to add new phusion passenger virtual hosts so I wrote a [little sake](http://pastie.org/216294) script to do the work for me. Want it?

{% highlight bash %}
sudo gem install sake && \
sake -i http://pastie.caboo.se/216294.txt
{% endhighlight %}

Update: I am now using the [passenger preference pane](http://www.fngtps.com/2008/06/putting-the-pane-back-into-deployment) instead of my sake script.