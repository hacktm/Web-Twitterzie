/**
 * New node file
 */
var tweets = require('../genetic engine/testInput.js');

trim = function (s){
	return s.replace(/^\s+|\s+$/g, '');
}

filterLinkTweet = function(tweet){ 
	if( tweet.indexOf('http://') != -1 || tweet.indexOf('https://') != -1){
		return true;
	} 
	return false;
}

preetyTweet = function(tweet){
	//remove some stuff 
	
	tweet = trim(tweet);
	
	//tweet = tweet.replace(new RegExp('https?://[^\s]*'), '');
	tweet = tweet.replace(new RegExp('[^0-9a-z]+$'), '');
	
	if(filterLinkTweet(tweet)){
		return false;
	}
	return tweet;
}

preetyTweets = function(tweets){
	var result = [];
	for(id in tweets){
		var niceTweet = preetyTweet(tweets[id]);
		if(niceTweet){
			result.push(preetyTweet(tweets[id]));
		}		
	}
	return result;
}

tweets = preetyTweets(tweets);
console.log(tweets);
