window.addEvent('domready',function() {
  ShowStackOverflowBadge(stack_overflow_user);
});


var stackoverflow_container = 'stackoverflow'

function ShowStackOverflowBadge(userId){
  var container = $(stackoverflow_container);
  if(!container) return;

  var gravatar = $(container).getElement('.gravatar');
  var userInfo = $(container).getElement('.userInfo');
  var username = $(container).getElement('.userInfo span.username');
  var profileLink = $(container).getElement('.userInfo span.username a');
  var reputationScore = $(container).getElement('.userInfo span.reputation-score');
  
  new StackOverflow.Flair(userId, {
    onComplete: function(data) {
      gravatar.set('html', data.gravatarHtml);
      profileLink.setProperty("href", data.profileUrl);
      profileLink.appendText(data.displayName);
      reputationScore.set('text', data.reputation);
      userInfo.set('html', userInfo.get('html') + data.badgeHtml);
    }
  }).request();
}

var StackOverflow = {};
StackOverflow.Flair = new Class({
    Extends: Request.JSONP,
    initialize: function(user, options) {
        $extend(options, { url: "http://stackoverflow.com/users/flair/" + user + ".json" });
        this.parent(options);
    },
    getScript: function(options) {
      var index = Request.JSONP.counter;
      var script = this.parent(options);
      // Create a global variable without the dots since stackoverflow strips them out.
      eval("RequestJSONPrequest_maprequest_" + index + " = Request.JSONP.request_map['request_' + index];");
      return script;
    }
});
