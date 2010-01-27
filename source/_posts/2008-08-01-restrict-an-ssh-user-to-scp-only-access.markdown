--- 
title: Restrict an ssh user to scp only access
---
Today I did a bit of research on how to restrict an ssh user to only have scp access. Basically all you have to do is add `command="/usr/lib/openssh/sftp-server"` to the beginning of the user's key in `~/.ssh/authorized_keys` like so:

{% highlight bash %}
command="/usr/lib/openssh/sftp-server" ssh-rsa thekeygoeshere== user@user.local
{% endhighlight %}


For more information on how to customize your authorized_keys file check out [this helpful site](http://www.eng.cam.ac.uk/help/jpmg/ssh/authorized_keys_howto.html).