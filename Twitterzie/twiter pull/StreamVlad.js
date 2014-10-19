Twit = require('twit');
parser = require('./parse_tweets.js');
redis = require('../redis/RedisPush.js');
gEngine = require('../genetic engine/G_Engine.js');
var q = require('q');

var T = new Twit({
	consumer_key : 'tTbrrQhSo32qm8A0ErsFge9xL',
	consumer_secret : 'oYb5q5li414MyY3b0H9hmQQo86XaNbcXlQq8BsEHN7qBCZepRy',
	access_token : '2836469279-JzdtzTvuZhpBNiG5YoGWxHfKS1bvEkSwWnWWrZM',
	access_token_secret : 'BifIasnWiFbQC6oQNtld47uMW3Q0W0BcUDhxz71cGqIxN'
});

var tags = [ 'pe', 'sa', 'de', 'a', 'in', 'dar', 'iar', 'la' ];
var streams = [];
var language = 'ro';

// Create streams
for (i in tags) {
	var stream = T.stream('statuses/filter', {
		track : tags[i],
		language : language
	});

	stream.on('tweet', function(tweet) {
		var tweets = parser.split(tweet.text);
		for ( var i in tweets) {
			var tweet = parser.preetyTweet(tweets[i]);
			if (tweet) {
				redis.addVerse(tweet);
				var kept = gEngine.evolution(tweet);
				if(!kept){
					redis.addOut(tweet);
				}
			}
		}
		
		redis.allOut(function(err, results){
			for(var i in results){
				var kept = gEngine.evolution(results[i]);
				if(kept){
					redis.remOut(results[i]);
				}
			}
		});
	});

	streams.push(stream);
}
// DECOMENTEAZA
//redis.allVerse(function(err, data){
//	if(err) console.error(err);
//	for(var x in data){
//		var kept = gEngine.evolution(data[x]);
//		if(!kept){
//			redis.addOut(data[x]);
//		}
//	}
//});		
//DECOMENTEAZA
//setInterval(function(){
//	gEngine.evolution();
//}, 100);

//stream.emit('tweet', {
//	text : 'Ana are mere. Veta are pere. pui'
//});