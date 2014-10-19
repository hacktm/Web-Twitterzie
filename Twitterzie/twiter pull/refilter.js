var redis = require('../redis/RedisPush.js');
var parser = require('./parse_tweets.js');
var initial = require('../genetic engine/testInput.js');


addFlitered = function(tweets){
	for(i in tweets){
		var parts = parser.split(tweets[i]);
		for(i in parts){
			part = parser.preetyTweet(parts[i]);
			//Check if is valid
			if(part){
				//Add in a second collection
				redis.addFinal(part);
			}
		}		
	}
}

addFlitered(initial);

redis.allVerse(function(err, results){
	addFlitered(results);
});