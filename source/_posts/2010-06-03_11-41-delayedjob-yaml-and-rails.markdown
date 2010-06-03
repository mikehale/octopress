---
title: "DelayedJob, YAML, and Rails"
---

While working with the excellent delayed_job I ran across an issue where I was seeing this error:

{% highlight ruby %}
undefined method `say_hello' for #<YAML::Object:0x10ab87300 @class="Jobs::HelloWorld", @ivars={}>
delayed_job-2.0.3/lib/delayed/performable_method.rb:35:in `send'
{% endhighlight %}

At first I just saw the undefined method part and couldn't understand why my method was not there. After all the code was really simple:

{% highlight ruby %}
# RAILS_ROOT/app/models/jobs/hello_world.rb
module Jobs
  class HelloWorld
    def say_hello
      puts 'hello'
    end
  
    def raise_error
      raise 'HelloWorld error'
    end
  end
end
{% endhighlight %}

Eventually I realized that the problem was that I was getting back a YAML::Object instead of a Jobs::HelloWorld. I decided to look at the yaml source code.

{% highlight ruby %}
# .../lib/ruby/1.8/yaml/types.rb

#
# Unresolved objects
#
class Object
    def self.tag_subclasses?; false; end
    def to_yaml( opts = {} )
        YAML::quick_emit( self, opts ) do |out|
            out.map( "tag:ruby.yaml.org,2002:object:#{ @class }", to_yaml_style ) do |map|
                @ivars.each do |k,v|
                    map.add( k, v )
                end
            end
        end
    end
end
{% endhighlight %}

Seeing the comment 'Unresolved objects' made me wonder if the problem was that somehow Jobs::HelloWorld had not been required yet, and I wondered how that could be. Aren't all my models required when rails starts? Apparently they are not. I decided to run a quick test in script/console to verify my assumptions:

{% highlight ruby %}
>> defined?(Jobs::HelloWorld)
=> nil
>> Jobs::HelloWorld
=> Jobs::HelloWorld
>> defined?(Jobs::HelloWorld)
=> "constant"
{% endhighlight %}

In fact it looks like this has been a feature of rails for [quite some time](http://lists.rubyonrails.org/pipermail/rails/2004-December/001206.html) (welcome to the club mike ;-).

So now I understand why I got the error, but I still need to figure out a good way to have objects loaded so that I don't end up with an unexpected Object::YAML instance.

As it turns out the latest version of delayed_job (2.1.0.pre) has fixed this problem by cleaning up and beefing up the YAML dumping/loading. Check out the [code](http://github.com/collectiveidea/delayed_job/blob/master/lib/delayed/yaml_ext.rb)!