/**
 * New node file
 */
var tweets = require('../genetic engine/testInput.js');

trim = function (s){
	return s.replace(/^\s+|\s+$/g, '');
}

var replaces = [
               		{find:'\s0\s', replace:" zero "},
               		{find:'\s1\s', replace:" unu "},
               		{find:'\s2\s', replace:" doi "},
               		{find:'\s3\s', replace:" trei "},
               		{find:'\s4\s', replace:" patru "},
               		{find:'\s5\s', replace:" cinci "},
               		{find:'\s6\s', replace:" sase "},
               		{find:'\s7\s', replace:" sapte "},
               		{find:'\s8\s', replace:" opt "},
               		{find:'\s9\s', replace:" noua "},
               		{find:'\s10\s', replace:" zece "},
               		//{find:'https?://[^\s]*', replace:""}, //remove
               		{find:'[^0-9a-z]+$', replace:""} //remove           		
               		
              ];

var filters = [
               		{find:"https?://"}
              ];

filterTweet = function(tweet){ 
	for(key in filters){
		if( tweet.search(new RegExp(filters[key].find)) != -1 ){
			return true;
		}
	}
	
	return false;
}

preetyTweet = function(tweet){
	tweet = trim(tweet);
	
	for(key in replaces){
		tweet = tweet.replace(new RegExp(replaces[key].find), replaces[key].replace);
	}	
	
	if(filterTweet(tweet)){
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
