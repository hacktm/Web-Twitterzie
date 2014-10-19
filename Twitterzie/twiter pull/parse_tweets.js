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
               		{find:'[^0-9a-z]+$', replace:""}, //remove strange chars from end   
                 	{find:'@[^\s]+', replace:""},
                 	{find:'#[^\s]+', replace:""},
                 	{find:'&[^\s]+', replace:""},
                 	{find:'^RT ', replace:""}
                 	
              ];

var filters = [
               		{find:"https?://"}
              ];

filterTweet = function(tweet){ 
	
	var words = tweet.split(' ');
	var size = words.length;
	
	if(size < 3 || size > 7){
		return true;
	}
	
	for(key in filters){
		if( tweet.search(new RegExp(filters[key].find)) != -1 ){
			return true;
		}
	}
	
	return false;
}

module.exports.preetyTweet = function(tweet){
	tweet = trim(tweet);
	
	for(key in replaces){
		tweet = tweet.replace(new RegExp(replaces[key].find), replaces[key].replace);
	}	
	
	if(filterTweet(tweet)){
		return false;
	}
	return tweet;
}

module.exports.split = function(tweet){
//	tweets = tweet.split(RegExp('(?:(?:\.+|\!+|\?+)(?:\s+|\s?$))', 'gm'));
	tweets = tweet.split(/(?:(?:\.+|\!+|\?+)(?:\s+|\s?$))/gm);
	result = [];
	for(i in tweets){
		if(trim(tweets[i]) != ""){
			result.push(trim(tweets[i]));
		}
	}
	return result;
}

module.exports.preetyTweets = function(tweets){
	var result = [];
	for(id in tweets){
		var niceTweet = preetyTweet(tweets[id]);
		if(niceTweet){
			result.push(preetyTweet(tweets[id]));
		}		
	}
	return result;
}

//tweets = module.exports.preetyTweets(tweets);
//console.log(tweets);
