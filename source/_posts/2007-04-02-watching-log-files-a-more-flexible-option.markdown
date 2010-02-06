--- 
title: "Watching Log Files&#8230; A More Flexible Option"
wordpress_id: 8
---
So everyone who knows about log files is familiar with tail -f, the wonderful -f option to tail that updates your screen as the log file grows.  But did you know about using less and shift+f?  The less command is nice because it allows you to scroll up and down, and search for things in a file using standard vi commands.  If the file you are "lessing" happens to be a log file that is being updated shift+f comes in pretty handy.  All you have to do is open the file with less and then type shift+f and less will start to behave very much like tail -f.  To turn of following updates simply type ctrl+c.

