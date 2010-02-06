require 'rubygems'
require 'disqus'
require 'disqus/api'
require 'disqus/forum'
require 'disqus/thread'
require 'disqus/post'
require 'disqus/author'
require "sequel"
require "jekyll"

require 'settings'
# 
# Settings should look something like this:
# 
#  Disqus::defaults[:account] = "your disqus account name"
#  Disqus::defaults[:api_key] = "your api key"
#  SEQUEL_CONNECT_STRING = "mysql://root:@localhost/old_blog"
#  BLOG_TITLE = "liveandlearn :: "

class Disqus::Api
  class << self
    
    # override this method since the uri was moved from thread_by_identifier to thread_by_identifier/
    def thread_by_identifier(opts = {})
      JSON.parse(post('thread_by_identifier/', :forum_api_key => opts[:forum_api_key],
                                              :identifier => opts[:identifier],
                                              :title => opts[:title] ))
    end
  end
end

class Comment
  attr_accessor :author_name, :author_email, :author_url, :content, :created_at, :ip_address, :post_id
  def initialize(author_name, author_email, author_url, content, created_at, ip_address, post_id)
    @author_name = author_name
    @author_email = author_email
    @author_url = author_url
    @content = content
    @created_at = created_at.strftime("%Y-%m-%dT%H:%M") 
    @ip_address = ip_address
    @post_id = post_id
  end
  
  def to_s
    "#{author_name} >> #{content}"
  end
end

class Jekyll::Post
  def comments
    @comments ||= []
  end
  
  def full_url
    "#{site.config['url']}#{url}"
  end
  
  def full_title
    "#{BLOG_TITLE} #{title}"
  end
end

class WordpressDisqusImporter
  attr_reader :posts, :connection_string
  
  def initialize(connection_string)
    @connection_string = connection_string
    read_jekyll_posts
    read_wordpress_comments
    filter_posts
    # print_post_summary
    # print_post_comment_summary
    # print_forums
    create_comments
  end
  
  def print_post_summary
    posts.each do |post|
      puts "#{post.full_title} #{post.full_url}"
    end
  end
  
  def print_forums
    Disqus::Forum.list.each do |forum|
      forum.forum_threads.each do |thread|
        puts "identifier: <#{thread.identifier}> title: <#{thread.title}> url: <#{thread.url}>"
      end
    end
  end
  
  def create_thread(message)
    Disqus::Thread.new(
      message["id"],
      forum,
      message["slug"],
      message["title"],
      message["created_at"],
      message["allow_comments"],
      message["url"],
      message["identifier"]
    )
  end
  
  def find_thread(post)
    thread = nil

    if message = Disqus::Api::get_thread_by_url(
      :url => post.full_url, 
      :forum_api_key => forum.key)["message"]

      thread = create_thread(message)
    end

    if thread.nil?
      if message = Disqus::Api::thread_by_identifier(
        :forum_api_key => forum.key, 
        :identifier => post.full_url, 
        :title => post.full_title)["message"]

        thread = create_thread(message["thread"])
      end
    end
    
    thread
  end
  
  def forum
    @forum ||= Disqus::Forum.list.first
  end
  
  def create_comments
    posts.each do |post|
      thread = find_thread(post)

      post.comments.each do |comment|
        p Disqus::Api::create_post (
          :forum_api_key => forum.key, 
          :thread_id => thread.id, 
          :message => comment.content, 
          :author_name => comment.author_name, 
          :author_email => comment.author_email,
          :author_url => comment.author_url,
          :created_at => comment.created_at,
          :ip_address => comment.ip_address
        )
      end
      
    end
  end
  
  # updates each post with any comments from the wordpress database
  def read_wordpress_comments
    Sequel.connect(connection_string) do |db|
      approved_comments = db[:wp_comments].where(:comment_approved => "1").map do |comment|
        Comment.new(
          comment[:comment_author], 
          comment[:comment_author_email], 
          comment[:comment_author_url], 
          comment[:comment_content], 
          comment[:comment_date], 
          comment[:comment_author_IP], 
          comment[:comment_post_ID])
      end

      approved_comments.each do |comment|
        matching_jekyll_post = posts.detect do |post| 
          post_id = post.data['wordpress_id']
          !post_id.nil? && post_id == comment.post_id
        end

        matching_jekyll_post.comments << comment if (matching_jekyll_post)
      end
    end
  end
  
  def filter_posts
    @posts = posts.find_all{ |post| post.comments.size > 0 }
  end
  
  def read_jekyll_posts
    site = Jekyll::Site.new(Jekyll.configuration({}))
    site.read_posts('')
    @posts = site.posts
  end
  
  def print_post_comment_summary
    posts.each do |post|
      puts post.url
      post.comments.each do |comment| 
        puts "\t#{comment}"
      end
      puts ""
    end
  end

end

WordpressDisqusImporter.new(SEQUEL_CONNECT_STRING)