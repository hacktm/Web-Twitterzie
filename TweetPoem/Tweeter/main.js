tweets = require('./tweet.js').tweets();

tweets.then(function(tweets){
	for(var i=0; i<tweets.length; i++){
		console.log(tweets[i].text);
	}
});

