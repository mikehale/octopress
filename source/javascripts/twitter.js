//
// The Octopress Twitter Feed is based on the following work:
// Valerio's javascript framework Mootools: Mootools.net
// David Walsh's Twitter Gitter plugin: http://davidwalsh.name/mootools-twitter-plugin
// Aaron Newton’s JSONP plugin: http://clientcide.com/js
// PrettyDate by John Resig at http://ejohn.org/files/pretty.js
//

/*
	Plugin:   	Octopress Twitter Feed
	Author:   	Brandon Mathis
	Website:    http://brandonmathis.com
	Date:     	11/07/2009
*/

var tweet_container = 'li';
var twitter_container = 'twitter_status';
var key = '-!-!-';
var show_source = false;

window.addEvent('domready',function() {
	getTwitterStatus(twitter_user);
});

function showTweets(the_tweets, from_cookie){
  if(from_cookie){
    the_tweets = the_tweets.split('^!^!^');
  }
  $(twitter_container).set('html', '');
  the_tweets.each(function(tweet){
    tweet = parseTweetMeta(tweet)
    tweet = '<p>' + tweet.replace(/\n\n/gi,'</p><p>') + '</p>';
    new Element(tweet_container,{
  		html: tweet
  	}).inject(twitter_container);
  });
}

function parseTweetMeta(tweet_data){
  var tweet_data = tweet_data.split(key);
  var tweet = tweet_data[0];
  var date = tweet_data[1];
  var tweet_id = tweet_data[2];
  var source = tweet_data[3];
  
  date = prettyDate(new Date().parse(date));
  return tweet + '<span class="meta"><a href="http://twitter.com/'+twitter_user+'/'+tweet_id+'">' + date + '</a>' + (show_source ? ' from '+source : '') + '</span>';
}

function prettyDate(time){
	var date = time;
	var diff = (((new Date()).getTime() - date.getTime()) / 1000)
	var day_diff = Math.floor(diff / 86400);
			
	if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
		return;
			
	return day_diff == 0 && (
			diff < 60 && "just now" ||
			diff < 120 && "1 minute ago" ||
			diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
			diff < 7200 && "1 hour ago" ||
			diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
		day_diff == 1 && "1 day ago" ||
		day_diff < 7 && day_diff + " days ago" ||
		day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}

function getTwitterStatus(twitter_name){
  var container = $(twitter_container);
  if(!container) return;
  var tweet_cookie = 'tweets_by_' + twitter_name + tweet_count;
  container.set('html', 'Fetching tweets...');
  if(!Cookie.read(tweet_cookie)) {
  	var myTwitterGitter = new TwitterGitter(twitter_name,{
  	  count: ((show_replies) ? tweet_count : 15 + tweet_count),
  		onComplete: function(tweets,user) {
        the_tweets = Array();
  			tweets.each(function(tweet,i) {
  			  if((tweet.in_reply_to_status_id && show_replies) || !tweet.in_reply_to_status_id){
  			    if(the_tweets.length == tweet_count) return;
    			  the_tweets.push(tweet.text + key + tweet.created_at + key + tweet.id + key + tweet.source);
  				}
  			});
  			Cookie.write(tweet_cookie,the_tweets.join('^!^!^'), { duration: 0.02 });
  			showTweets(the_tweets);
  		}
  	}).retrieve();
	} else {
	  showTweets(Cookie.read(tweet_cookie),true);
	}
}

/*
	Plugin:   	TwitterGitter
	Author:   	David Walsh
	Website:    http://davidwalsh.name
	Date:     	2/21/2009
*/

var TwitterGitter = new Class({

	//implements
	Implements: [Options,Events],

	//options
	options: {
		count: 2,
		sinceID: 1,
		link: true,
		onRequest: $empty,
		onComplete: $empty
	},
	
	//initialization
	initialize: function(username,options) {
		//set options
		this.setOptions(options);
		this.info = {};
		this.username = username;
	},
	
	//get it!
	retrieve: function() {
		new JsonP('http://twitter.com/statuses/user_timeline/' + this.username + '.json',{
			data: {
				count: this.options.count,
				since_id: this.options.sinceID
			},
			onRequest: this.fireEvent('request'),
			onComplete: function(data) {
				//linkify?
				if(this.options.link) {
					data.each(function(tweet) { tweet.text = this.linkify(tweet.text); },this);
				}
				//complete!
				this.fireEvent('complete',[data,data[0].user]);
			}.bind(this)
		}).request();
		return this;
	},
	
	//format
	linkify: function(text) {
		//courtesy of Jeremy Parrish (rrish.org)
		return text.replace(/(https?:\/\/[\w\-:;?&=+.%#\/]+)/gi,'<a href="$1">$1</a>').replace(/(^|\s)@(\w+)/g,'$1<a class="user" href="http://twitter.com/$2">@$2</a>').replace(/(^|\s)#(\w+)/g,'$1<a class="topic" href="http://search.twitter.com/search?q=%23$2">#$2</a>');
	}
});
