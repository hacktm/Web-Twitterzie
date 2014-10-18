Twit = require('twit');
preetyTweet = require('./parse_tweets.js').preetyTweet;
redis = require('../redis/RedisPush.js');
gEngine = require('../genetic engine/G_Engine.js');

var T = new Twit({
    consumer_key:         'tTbrrQhSo32qm8A0ErsFge9xL'
  , consumer_secret:      'oYb5q5li414MyY3b0H9hmQQo86XaNbcXlQq8BsEHN7qBCZepRy'
  , access_token:         '2836469279-JzdtzTvuZhpBNiG5YoGWxHfKS1bvEkSwWnWWrZM'
  , access_token_secret:  'BifIasnWiFbQC6oQNtld47uMW3Q0W0BcUDhxz71cGqIxN'
});

var tags = ['pe', 'sa', 'de', 'a', 'in', 'dar', 'iar', 'la'];
var streams = [];
var language = 'ro';

//Create streams
for(i in tags){
	var stream = T.stream('statuses/filter',
			{
				track: tags[i],
				language: language
			});
	
	stream.on('tweet', function (tweet) {
		  var tweet = preetyTweet(tweet.text);
		  console.log(tweet);
		  if(tweet){
//			  console.log(tweet);
//			  redis.addVerse(tweet);
//			  redis.save();
			  gEngine.evolution(tweet);
		  }
//		  update in memory instance
// 		  sparately write to a file poem
	});
	
	streams.push(stream);	
}

stream.emit('tweet', { text : 'Ana are mere'});